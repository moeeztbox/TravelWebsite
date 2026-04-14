import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import {
  Mail,
  Phone,
  MapPin,
  Save,
  FileText,
  Upload,
  ChevronDown,
  X,
  Check,
  Clock,
  Trash2,
} from "lucide-react";
import { useAuth } from "../Context/AuthContext";
import { Link } from "react-router-dom";
import { updateProfile, uploadCommonDocuments } from "../Services/authService";
import {
  listMyBookings,
  uploadBookingDocuments,
  attachCommonDocumentsToBooking,
  uploadPaymentReceipt,
  deleteMyBooking,
} from "../Services/bookingService";
import {
  listMyTransportationBookings,
  setTransportPaymentMethod,
  uploadTransportPaymentReceipt,
  dismissTransportationBooking,
} from "../Services/transportationService";
import {
  listMyVisaRequests,
  setVisaPaymentMethod,
  uploadVisaPaymentReceipt,
  dismissVisaRequest,
} from "../Services/visaRequestService";
import {
  listMyHotelBookings,
  setHotelPaymentMethod,
  uploadHotelPaymentReceipt,
  dismissHotelBooking,
} from "../Services/hotelBookingService";
import {
  acceptCustomPackageRequest,
  rejectCustomPackageOffer,
  deleteMyCustomPackageRequest,
  listMyCustomPackageRequests,
} from "../Services/customPackageService";
import { getBitmojiAvatarUrl, BITMOJI_COUNT } from "../constants/bitmoji";
import { getApiOrigin } from "../utils/apiOrigin";
import { useScrollLock } from "../Hooks/useScrollLock";
import BookingStripeCheckout from "../Services/PaymentIntegration/BookingStripeCheckout";
import MiscStripeCheckout from "../Services/PaymentIntegration/MiscStripeCheckout";

function StatusBadge({ status }) {
  const map = {
    pending: "bg-amber-100 text-amber-900 border-amber-200",
    approved: "bg-emerald-100 text-emerald-900 border-emerald-200",
    rejected: "bg-red-100 text-red-800 border-red-200",
  };
  return (
    <span
      className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-semibold border ${map[status] || map.pending}`}
    >
      {status === "pending"
        ? "Awaiting approval"
        : status
          ? status[0].toUpperCase() + status.slice(1)
          : "Pending"}
    </span>
  );
}

function PaymentBadge({ status }) {
  const s = status || "none";
  const map = {
    none: "bg-stone-100 text-stone-700 border-stone-200",
    verifying: "bg-amber-100 text-amber-900 border-amber-200",
    verified: "bg-emerald-100 text-emerald-900 border-emerald-200",
    rejected: "bg-red-100 text-red-800 border-red-200",
  };
  const label =
    s === "verifying"
      ? "Verifying payment"
      : s === "verified"
        ? "Payment verified"
        : s === "rejected"
          ? "Payment rejected"
          : "Payment not submitted";
  return (
    <span
      className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-semibold border ${map[s] || map.none}`}
    >
      {label}
    </span>
  );
}

function stageLabel(stage) {
  const map = {
    not_started: "Not started",
    scheduled: "Scheduled",
    flight_takeoff: "Flight takeoff",
    in_makkah: "In Makkah",
    in_madinah: "In Madinah",
    return_flight: "Return flight",
    completed: "Completed",
  };
  return map[stage] || stage || "Not started";
}

function JourneyStepper({ stage }) {
  const steps = [
    { id: "scheduled", label: "Scheduled" },
    { id: "flight_takeoff", label: "Flight takeoff" },
    { id: "in_makkah", label: "In Makkah" },
    { id: "in_madinah", label: "In Madinah" },
    { id: "return_flight", label: "Return flight" },
    { id: "completed", label: "Completed" },
  ];
  const current = stage || "scheduled";
  const idx = Math.max(
    0,
    steps.findIndex((s) => s.id === current)
  );

  return (
    <div className="w-full">
      <div className="flex items-center justify-between gap-2">
        {steps.map((s, i) => {
          const done = i < idx;
          const active = i === idx;
          return (
            <div key={s.id} className="flex-1 min-w-0">
              <div className="flex items-center">
                <div
                  className={`h-7 w-7 rounded-full flex items-center justify-center border text-xs font-bold ${
                    done
                      ? "bg-emerald-600 border-emerald-600 text-white"
                      : active
                        ? "bg-emerald-600 border-emerald-600 text-white"
                        : "bg-white border-stone-300 text-stone-400"
                  }`}
                >
                  {done || active ? <Check className="w-4 h-4" /> : i + 1}
                </div>
                {i !== steps.length - 1 ? (
                  <div
                    className={`h-[2px] flex-1 mx-2 ${
                      done ? "bg-emerald-600" : "bg-stone-200"
                    }`}
                  />
                ) : null}
              </div>
              <p
                className={`mt-2 text-[11px] font-medium truncate ${
                  active ? "text-stone-900" : "text-stone-500"
                }`}
                title={s.label}
              >
                {s.label}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function UserDashboard() {
  const { user, updateUser } = useAuth();
  const isAdmin = user?.role === "isAdmin";
  const [phone, setPhone] = useState(user?.phone || "");
  const [address, setAddress] = useState(user?.address || "");
  const [country, setCountry] = useState(user?.country || "");
  const [city, setCity] = useState(user?.city || "");
  const [bitmojiIndex, setBitmojiIndex] = useState(user?.bitmojiIndex ?? 0);
  const [saving, setSaving] = useState(false);
  const [overlay, setOverlay] = useState({ open: false, message: "" });
  const [bookings, setBookings] = useState([]);
  const [loadingList, setLoadingList] = useState(true);
  const [customRequests, setCustomRequests] = useState([]);
  const [loadingCustom, setLoadingCustom] = useState(true);
  const [transportBookings, setTransportBookings] = useState([]);
  const [loadingTransport, setLoadingTransport] = useState(true);
  const [hotelBookings, setHotelBookings] = useState([]);
  const [loadingHotels, setLoadingHotels] = useState(true);
  const [visaRequests, setVisaRequests] = useState([]);
  const [loadingVisa, setLoadingVisa] = useState(true);
  const [paymentMethodTransport, setPaymentMethodTransport] = useState({});
  const [paymentMethodHotel, setPaymentMethodHotel] = useState({});
  const [paymentMethodVisa, setPaymentMethodVisa] = useState({});
  const [uploadForId, setUploadForId] = useState(null);
  const [receiptForId, setReceiptForId] = useState(null);
  const [docsModalOpen, setDocsModalOpen] = useState(false);
  /** Local payment method choice per booking — saved when receipt is submitted */
  const [paymentMethodDraft, setPaymentMethodDraft] = useState({});
  const [trackFor, setTrackFor] = useState(null);
  const [avatarPickerOpen, setAvatarPickerOpen] = useState(false);
  const [avatarDraft, setAvatarDraft] = useState(user?.bitmojiIndex ?? 0);

  useScrollLock(
    Boolean(overlay.open || avatarPickerOpen || trackFor || docsModalOpen)
  );

  useEffect(() => {
    setPhone(user?.phone || "");
    setAddress(user?.address || "");
    setCountry(user?.country || "");
    setCity(user?.city || "");
    setBitmojiIndex(user?.bitmojiIndex ?? 0);
    setAvatarDraft(user?.bitmojiIndex ?? 0);
  }, [user]);

  const loadBookings = async (opts = {}) => {
    const silent = Boolean(opts.silent);
    if (!silent) setLoadingList(true);
    try {
      const { bookings: list } = await listMyBookings();
      setBookings(list || []);
    } catch {
      toast.error("Could not load bookings");
    } finally {
      if (!silent) setLoadingList(false);
    }
  };

  useEffect(() => {
    loadBookings();
  }, []);

  const loadCustom = async () => {
    setLoadingCustom(true);
    try {
      const rows = await listMyCustomPackageRequests();
      setCustomRequests(rows || []);
    } catch {
      // keep quiet; dashboard should still work without this section
    } finally {
      setLoadingCustom(false);
    }
  };

  useEffect(() => {
    loadCustom();
  }, []);

  const loadTransport = async (silent) => {
    if (!silent) setLoadingTransport(true);
    try {
      const list = await listMyTransportationBookings();
      setTransportBookings(list || []);
    } catch {
      /* optional section */
    } finally {
      if (!silent) setLoadingTransport(false);
    }
  };

  const loadVisa = async (silent) => {
    if (!silent) setLoadingVisa(true);
    try {
      const list = await listMyVisaRequests();
      setVisaRequests(list || []);
    } catch {
      /* optional */
    } finally {
      if (!silent) setLoadingVisa(false);
    }
  };

  const loadHotels = async (silent) => {
    if (!silent) setLoadingHotels(true);
    try {
      const list = await listMyHotelBookings();
      setHotelBookings(list || []);
    } catch {
      /* optional */
    } finally {
      if (!silent) setLoadingHotels(false);
    }
  };

  useEffect(() => {
    loadTransport();
    loadHotels();
    loadVisa();
  }, []);

  const isTransportServiceDone = (b) => {
    if (b.payment?.status !== "verified") return false;
    const t = b.endAt || b.pickupAt;
    if (!t) return false;
    return Date.now() > new Date(t).getTime();
  };

  const isVisaProcessingDone = (v) => {
    if (v.payment?.status !== "verified") return false;
    const t = v.serviceEndDate;
    if (!t) return false;
    return Date.now() > new Date(t).getTime();
  };

  const isHotelStayDone = (h) => {
    if (h.payment?.status !== "verified") return false;
    const t = h.stay?.checkOut;
    if (!t) return false;
    return Date.now() > new Date(t).getTime();
  };

  const submitTransportReceipt = async (id, e) => {
    e.preventDefault();
    const method =
      paymentMethodTransport[id] ||
      transportBookings.find((x) => x._id === id)?.payment?.method;
    if (!method) {
      toast.error("Select a payment method first.");
      return;
    }
    if (method === "stripe") {
      toast.error("Use the Stripe card form below—no receipt upload.");
      return;
    }
    await setTransportPaymentMethod(id, method);
    const fd = new FormData(e.target);
    setOverlay({ open: true, message: "Uploading receipt…" });
    try {
      await uploadTransportPaymentReceipt(id, fd);
      toast.success("Receipt submitted");
      await loadTransport(true);
    } catch (err) {
      toast.error(err.response?.data?.message || "Upload failed");
    } finally {
      setOverlay({ open: false, message: "" });
    }
  };

  const submitVisaReceipt = async (id, e) => {
    e.preventDefault();
    const method =
      paymentMethodVisa[id] ||
      visaRequests.find((x) => x._id === id)?.payment?.method;
    if (!method) {
      toast.error("Select a payment method first.");
      return;
    }
    if (method === "stripe") {
      toast.error("Use the Stripe card form below—no receipt upload.");
      return;
    }
    await setVisaPaymentMethod(id, method);
    const fd = new FormData(e.target);
    setOverlay({ open: true, message: "Uploading receipt…" });
    try {
      await uploadVisaPaymentReceipt(id, fd);
      toast.success("Receipt submitted");
      await loadVisa(true);
    } catch (err) {
      toast.error(err.response?.data?.message || "Upload failed");
    } finally {
      setOverlay({ open: false, message: "" });
    }
  };

  const submitHotelReceipt = async (id, e) => {
    e.preventDefault();
    const method =
      paymentMethodHotel[id] ||
      hotelBookings.find((x) => x._id === id)?.payment?.method;
    if (!method) {
      toast.error("Select a payment method first.");
      return;
    }
    if (method === "stripe") {
      toast.error("Use the Stripe card form below—no receipt upload.");
      return;
    }
    await setHotelPaymentMethod(id, method);
    const fd = new FormData(e.target);
    setOverlay({ open: true, message: "Uploading receipt…" });
    try {
      await uploadHotelPaymentReceipt(id, fd);
      toast.success("Receipt submitted");
      await loadHotels(true);
    } catch (err) {
      toast.error(err.response?.data?.message || "Upload failed");
    } finally {
      setOverlay({ open: false, message: "" });
    }
  };

  const removeTransport = async (id) => {
    setOverlay({ open: true, message: "Removing…" });
    try {
      await dismissTransportationBooking(id);
      toast.success("Removed");
      await loadTransport(true);
    } catch (err) {
      toast.error(err.response?.data?.message || "Could not remove");
    } finally {
      setOverlay({ open: false, message: "" });
    }
  };

  const removeHotel = async (id) => {
    setOverlay({ open: true, message: "Removing…" });
    try {
      await dismissHotelBooking(id);
      toast.success("Removed");
      await loadHotels(true);
    } catch (err) {
      toast.error(err.response?.data?.message || "Could not remove");
    } finally {
      setOverlay({ open: false, message: "" });
    }
  };

  const removeVisa = async (id) => {
    setOverlay({ open: true, message: "Removing…" });
    try {
      await dismissVisaRequest(id);
      toast.success("Removed");
      await loadVisa(true);
    } catch (err) {
      toast.error(err.response?.data?.message || "Could not remove");
    } finally {
      setOverlay({ open: false, message: "" });
    }
  };

  const handleSaveProfile = async (e) => {
    e.preventDefault();
    setSaving(true);
    setOverlay({ open: true, message: "Saving…" });
    try {
      const { user: u } = await updateProfile({
        phone,
        address,
        country,
        city,
        bitmojiIndex,
      });
      updateUser(u);
      toast.success("Profile updated");
    } catch (err) {
      toast.error(err.response?.data?.message || "Update failed");
    } finally {
      setSaving(false);
      setOverlay({ open: false, message: "" });
    }
  };

  const draftBookings = bookings.filter((b) => b.status === "pending");
  const approvedBookings = bookings.filter((b) => b.status === "approved");
  const rejectedBookings = bookings.filter((b) => b.status === "rejected");
  const origin = getApiOrigin();
  const miscReceiptUrl = (filename) =>
    filename
      ? `${origin}/uploads/misc-receipts/${encodeURIComponent(filename)}`
      : "";
  const commonDocs = user?.commonDocuments || { visaPdf: "", otherPdf: "" };
  const hasCommonDocs = Boolean(commonDocs?.visaPdf || commonDocs?.otherPdf);
  const pendingCustom = customRequests.filter((r) => r.status === "pending");
  const approvedCustom = customRequests.filter((r) => r.status === "approved");
  const rejectedCustom = customRequests.filter((r) => r.status === "rejected");
  // Approved by admin but user has not accepted the booking yet (excludes user-declined offers).
  const approvedCustomVisible = approvedCustom.filter(
    (r) => !r.bookingId && r.userProposalStatus !== "rejected"
  );
  const userDeclinedCustom = approvedCustom.filter(
    (r) => r.userProposalStatus === "rejected"
  );
  const visibleCustomCount =
    pendingCustom.length +
    approvedCustom.filter((r) => !r.bookingId).length +
    rejectedCustom.length;

  const formatPkr = (n) => `PKR ${(Number(n) || 0).toLocaleString()}`;
  const formatHotelMoney = (total) => {
    if (!total || total.amount == null) return null;
    const n = Number(total.amount);
    if (!Number.isFinite(n) || n <= 0) return null;
    const c = (total.currency || "USD").toUpperCase();
    if (c === "PKR") return formatPkr(n);
    if (c === "USD")
      return `USD ${n.toLocaleString("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })}`;
    return `${c} ${n.toLocaleString()}`;
  };
  const [acceptingCustomId, setAcceptingCustomId] = useState(null);
  const [rejectingCustomId, setRejectingCustomId] = useState(null);
  const [deletingCustomId, setDeletingCustomId] = useState(null);

  const acceptOffer = async (reqId) => {
    setAcceptingCustomId(reqId);
    setOverlay({ open: true, message: "Accepting offer…" });
    try {
      await acceptCustomPackageRequest(reqId);
      toast.success("Offer accepted. You can upload documents now.");
      await loadCustom();
      await loadBookings();
    } catch (err) {
      toast.error(err.response?.data?.message || "Could not accept offer");
    } finally {
      setAcceptingCustomId(null);
      setOverlay({ open: false, message: "" });
    }
  };

  const rejectOffer = async (reqId) => {
    setRejectingCustomId(reqId);
    setOverlay({ open: true, message: "Declining offer…" });
    try {
      await rejectCustomPackageOffer(reqId);
      toast.success("Offer declined.");
      await loadCustom();
    } catch (err) {
      toast.error(err.response?.data?.message || "Could not decline offer");
    } finally {
      setRejectingCustomId(null);
      setOverlay({ open: false, message: "" });
    }
  };

  const deleteCustomRequest = async (reqId) => {
    setDeletingCustomId(reqId);
    setOverlay({ open: true, message: "Removing…" });
    try {
      await deleteMyCustomPackageRequest(reqId);
      toast.success("Removed");
      await loadCustom();
    } catch (err) {
      toast.error(err.response?.data?.message || "Could not remove");
    } finally {
      setDeletingCustomId(null);
      setOverlay({ open: false, message: "" });
    }
  };

  const handleUpload = async (bookingId, e) => {
    e.preventDefault();
    const fd = new FormData(e.target);
    setOverlay({ open: true, message: "Uploading documents…" });
    try {
      await uploadBookingDocuments(bookingId, fd);
      toast.success("Documents uploaded");
      setUploadForId(null);
      await loadBookings({ silent: true });
    } catch (err) {
      toast.error(err.response?.data?.message || "Upload failed");
    } finally {
      setOverlay({ open: false, message: "" });
    }
  };

  const handleDocsModalUpload = async (e) => {
    e.preventDefault();
    const fd = new FormData(e.target);
    const hasVisa = fd.get("visaPdf") instanceof File && fd.get("visaPdf")?.size;
    const hasOther =
      fd.get("otherPdf") instanceof File && fd.get("otherPdf")?.size;
    if (!hasVisa && !hasOther) {
      toast.error("Please choose at least one file.");
      return;
    }
    setOverlay({ open: true, message: "Uploading documents…" });
    try {
      const { user: u } = await uploadCommonDocuments(fd);
      updateUser(u);
      toast.success("Documents saved");
      setDocsModalOpen(false);
    } catch (err) {
      toast.error(err.response?.data?.message || "Upload failed");
    } finally {
      setOverlay({ open: false, message: "" });
    }
  };

  const attachCommonToBooking = async (bookingId) => {
    setOverlay({ open: true, message: "Attaching your uploaded documents…" });
    try {
      await attachCommonDocumentsToBooking(bookingId);
      toast.success("Documents attached to this booking");
      await loadBookings({ silent: true });
    } catch (err) {
      toast.error(err.response?.data?.message || "Could not attach documents");
    } finally {
      setOverlay({ open: false, message: "" });
    }
  };

  const handleReceiptUpload = async (bookingId, e) => {
    e.preventDefault();
    const fromDraft = paymentMethodDraft[bookingId];
    const fromServer = bookings.find((x) => x._id === bookingId)?.payment
      ?.method;
    let method = (fromDraft ?? fromServer ?? "").trim();
    if (method === "card") method = "bank_transfer";
    if (!method) {
      toast.error("Select a payment method before uploading the receipt.");
      return;
    }
    const fd = new FormData(e.target);
    fd.set("method", method);
    setOverlay({ open: true, message: "Submitting receipt…" });
    try {
      await uploadPaymentReceipt(bookingId, fd);
      toast.success("Receipt submitted. Payment is verifying.");
      setReceiptForId(null);
      await loadBookings({ silent: true });
    } catch (err) {
      toast.error(err.response?.data?.message || "Upload failed");
    } finally {
      setOverlay({ open: false, message: "" });
    }
  };

  const PAYMENT_METHODS = [
    { id: "", label: "Select payment method…" },
    { id: "jazzcash", label: "JazzCash" },
    { id: "easypaisa", label: "Easypaisa" },
    { id: "bank_transfer", label: "Bank transfer" },
    { id: "stripe", label: "Card (Stripe)" },
  ];

  const PAYMENT_DETAILS = {
    jazzcash: {
      title: "JazzCash",
      lines: ["Account number: 03258816338", "Account title: Ali Ahmad"],
    },
    easypaisa: {
      title: "Easypaisa",
      lines: ["Account number: 03144313206", "Account title: Ali Ahmad"],
    },
    bank_transfer: {
      title: "Bank transfer",
      lines: [
        "Bank: Askari Bank",
        "Account title: Ali Ahmad",
        "Account number: 11310112434110",
        "IBAN: —",
      ],
    },
    stripe: {
      title: "Card payment (Stripe)",
      lines: [
        "Pay securely with your debit or credit card.",
        "No receipt upload is needed—your payment is confirmed with Stripe.",
      ],
    },
  };

  const handleDeleteRejected = async (id) => {
    setOverlay({ open: true, message: "Removing…" });
    try {
      await deleteMyBooking(id);
      toast.success("Removed");
      await loadBookings();
    } catch (err) {
      toast.error(err.response?.data?.message || "Remove failed");
    } finally {
      setOverlay({ open: false, message: "" });
    }
  };

  const avatarSrc = getBitmojiAvatarUrl(bitmojiIndex, user?._id || user?.email);
  const avatarSeed = user?._id || user?.email;
  const avatarOptions = useMemo(
    () =>
      Array.from({ length: BITMOJI_COUNT }, (_, i) => ({
        idx: i,
        url: getBitmojiAvatarUrl(i, avatarSeed),
      })),
    [avatarSeed]
  );

  return (
    <div className="min-h-screen bg-stone-100 pt-28 pb-16 px-4">
      {overlay.open ? (
        <div className="fixed inset-0 z-[200] bg-black/35 backdrop-blur-md flex items-center justify-center">
          <div className="bg-white/80 backdrop-blur-md border border-white/40 rounded-2xl px-6 py-5 shadow-xl">
            <div className="flex items-center gap-3">
              <div className="h-9 w-9 rounded-full border-4 border-amber-400/30 border-t-amber-500 animate-spin" />
              <div className="text-sm font-semibold text-stone-800">
                {overlay.message || "Loading…"}
              </div>
            </div>
          </div>
        </div>
      ) : null}
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <section className="bg-white rounded-2xl shadow border border-stone-200 p-6 md:p-8">
            <div className="flex flex-col sm:flex-row gap-6 items-start">
              <div className="relative shrink-0">
                <button
                  type="button"
                  onClick={() => {
                    setAvatarDraft(bitmojiIndex);
                    setAvatarPickerOpen(true);
                  }}
                  className="group relative"
                  aria-label="Change profile avatar"
                >
                  <img
                    src={avatarSrc}
                    alt=""
                    className="w-28 h-28 rounded-full border-4 border-amber-100 bg-amber-50 shadow-sm group-hover:shadow-md transition-shadow"
                  />
                  <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 text-[10px] bg-amber-500 text-white px-2 py-0.5 rounded-full whitespace-nowrap inline-flex items-center gap-1">
                    Profile avatar <ChevronDown className="w-3 h-3" />
                  </span>
                </button>
              </div>
              <div className="flex-1 min-w-0">
                <h1 className="text-2xl md:text-3xl font-bold text-stone-900">
                  {[user?.firstName, user?.lastName].filter(Boolean).join(" ") ||
                    "Traveler"}
                </h1>
                <div className="mt-2 space-y-1 text-stone-600 text-sm">
                  <p className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-amber-600 shrink-0" />
                    {user?.email}
                  </p>
                  {user?.phone ? (
                    <p className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-amber-600 shrink-0" />
                      {user.phone}
                    </p>
                  ) : null}
                  {(user?.city || user?.country) && (
                    <p className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-amber-600 shrink-0" />
                      {[user.address, user.city, user.country]
                        .filter(Boolean)
                        .join(", ")}
                    </p>
                  )}
                </div>
              </div>
            </div>

            <form onSubmit={handleSaveProfile} className="mt-8 space-y-6 border-t border-stone-100 pt-6">
              <h2 className="text-lg font-semibold text-stone-800">
                Edit profile
              </h2>
              
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-1">
                  Phone
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full max-w-md rounded-xl border border-stone-200 px-4 py-2.5 text-stone-900 focus:ring-2 focus:ring-amber-400 focus:border-amber-400"
                  placeholder="+92 300 1234567"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-stone-700 mb-1">
                    Address
                  </label>
                  <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full rounded-xl border border-stone-200 px-4 py-2.5 text-stone-900 focus:ring-2 focus:ring-amber-400 focus:border-amber-400"
                    placeholder="Street / area"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-1">
                    Country
                  </label>
                  <input
                    type="text"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    className="w-full rounded-xl border border-stone-200 px-4 py-2.5 text-stone-900 focus:ring-2 focus:ring-amber-400 focus:border-amber-400"
                    placeholder="Country"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-1">
                    City
                  </label>
                  <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full rounded-xl border border-stone-200 px-4 py-2.5 text-stone-900 focus:ring-2 focus:ring-amber-400 focus:border-amber-400"
                    placeholder="City"
                  />
                </div>
              </div>
              <button
                type="submit"
                disabled={saving}
                className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500 to-amber-400 text-white font-semibold px-6 py-2.5 rounded-xl hover:opacity-95 disabled:opacity-60"
              >
                <Save className="w-4 h-4" />
                {saving ? "Saving…" : "Save changes"}
              </button>
            </form>
          </section>

          {!loadingTransport && transportBookings.length > 0 ? (
            <section className="bg-white rounded-2xl shadow border border-stone-200 p-6 md:p-8">
              <h2 className="text-xl font-bold text-stone-900 mb-2">
                Your transportation bookings
              </h2>
              <p className="text-sm text-stone-500 mb-6">
                Track approval, pay with receipt only, and remove the card after
                your ride date has passed.
              </p>
              <ul className="space-y-4">
                {transportBookings.map((tb) => (
                  <li
                    key={tb._id}
                    className="rounded-xl border border-stone-200 bg-stone-50/60 px-4 py-3 space-y-2"
                  >
                    <div className="flex flex-wrap justify-between gap-2">
                      <div>
                        <p className="font-semibold text-stone-900">
                          {tb.selectedOption?.title}
                        </p>
                        <p className="text-xs text-stone-500">
                          {tb.form?.pickup} → {tb.form?.dropoff}
                        </p>
                      </div>
                      <span
                        className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-semibold border ${
                          tb.status === "approved"
                            ? "bg-emerald-100 text-emerald-900 border-emerald-200"
                            : tb.status === "rejected"
                              ? "bg-red-100 text-red-800 border-red-200"
                              : "bg-amber-100 text-amber-900 border-amber-200"
                        }`}
                      >
                        {tb.status === "pending"
                          ? "Awaiting approval"
                          : tb.status}
                      </span>
                    </div>

                    {tb.status === "rejected" ? (
                      <p className="text-sm text-red-700">
                        Request was rejected. You can remove this card.
                      </p>
                    ) : null}

                    {tb.status === "approved" &&
                    tb.payment?.status !== "verified" ? (
                      (() => {
                        const rawMethod =
                          paymentMethodTransport[tb._id] ??
                          tb.payment?.method ??
                          "";
                        const method =
                          rawMethod === "card" ? "bank_transfer" : rawMethod;
                        const isStripe = method === "stripe";
                        const details = method ? PAYMENT_DETAILS[method] : null;
                        const receiptSubmitted = Boolean(tb.payment?.receiptPdf);
                        const methodSelectLocked =
                          tb.payment?.status === "verifying" ||
                          receiptSubmitted;
                        const payStatus = tb.payment?.status ?? "none";
                        const showReceiptForm =
                          payStatus !== "verified" &&
                          !tb.payment?.receiptPdf &&
                          !isStripe &&
                          method;
                        const showStripeCheckout =
                          payStatus === "none" && isStripe;
                        return (
                      <div className="space-y-3 border-t border-stone-200 pt-2">
                        <p className="text-xs font-medium text-stone-700">
                          Payment ({tb.selectedOption?.priceLabel || "—"})
                        </p>
                        <p className="text-[11px] text-stone-500">
                          {methodSelectLocked
                            ? "Payment method is locked after you submit payment."
                            : isStripe
                              ? "Choose Card (Stripe), then complete payment below."
                              : "Your choice is saved when you upload the receipt—no separate save."}
                        </p>
                        <select
                          className="w-full max-w-xs rounded-lg border border-stone-200 px-2 py-1.5 text-sm disabled:opacity-60"
                          disabled={methodSelectLocked}
                          value={method}
                          onChange={(e) =>
                            setPaymentMethodTransport((m) => ({
                              ...m,
                              [tb._id]: e.target.value,
                            }))
                          }
                        >
                          {PAYMENT_METHODS.map((m) => (
                            <option
                              key={m.id === "" ? "pm-empty" : m.id}
                              value={m.id}
                            >
                              {m.label}
                            </option>
                          ))}
                        </select>
                        {details ? (
                          <div className="rounded-xl border border-stone-200 bg-white/70 px-3 py-2 text-sm text-stone-700">
                            <p className="font-semibold text-stone-900">
                              {details.title}
                            </p>
                            <ul className="mt-1 space-y-0.5 text-xs">
                              {details.lines.map((line) => (
                                <li key={line}>{line}</li>
                              ))}
                            </ul>
                          </div>
                        ) : null}
                        {showStripeCheckout ? (
                          <MiscStripeCheckout
                            kind="transport"
                            recordId={tb._id}
                            onPaid={async () => {
                              toast.success(
                                "Payment received. Awaiting admin verification."
                              );
                              await loadTransport(true);
                            }}
                            onError={(msg) => toast.error(msg)}
                          />
                        ) : null}
                        {showReceiptForm ? (
                        <form
                          className="flex flex-col sm:flex-row gap-2 items-start"
                          onSubmit={(e) => submitTransportReceipt(tb._id, e)}
                        >
                          <input
                            name="receiptPdf"
                            type="file"
                            accept="application/pdf"
                            className="text-sm"
                            required
                          />
                          <button
                            type="submit"
                            className="px-3 py-1.5 rounded-lg bg-emerald-700 text-white text-xs font-semibold"
                          >
                            Submit receipt
                          </button>
                        </form>
                        ) : null}
                        {tb.payment?.status === "verifying" ? (
                          <div className="text-xs text-amber-800 space-y-0.5">
                            <p>Awaiting admin verification</p>
                            {isStripe ? (
                              <p className="text-stone-500 font-normal">
                                Paid with Stripe — no PDF receipt to download here.
                              </p>
                            ) : null}
                          </div>
                        ) : null}
                      </div>
                        );
                      })()
                    ) : null}

                    {tb.payment?.status === "verified" ? (
                      <div className="border-t border-stone-200 pt-2 space-y-1 text-sm text-stone-700">
                        <p className="font-medium text-emerald-800">
                          Payment verified
                        </p>
                        {tb.payment?.method === "stripe" ? (
                          <p className="text-xs text-stone-500">
                            Paid with Stripe — there is no uploaded PDF receipt
                            for this booking.
                          </p>
                        ) : tb.payment?.receiptPdf ? (
                          <a
                            href={miscReceiptUrl(tb.payment.receiptPdf)}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-1.5 text-sm text-amber-700 hover:underline"
                          >
                            <FileText className="w-4 h-4" /> View payment
                            receipt
                          </a>
                        ) : null}
                        <p>
                          Pickup:{" "}
                          {tb.pickupAt
                            ? new Date(tb.pickupAt).toLocaleString()
                            : `${tb.form?.pickupDate} ${tb.form?.pickupTime || ""}`}
                        </p>
                        <p>
                          End:{" "}
                          {tb.endAt
                            ? new Date(tb.endAt).toLocaleString()
                            : "—"}
                        </p>
                        <p>Passengers: {tb.form?.passengers}</p>
                        {isTransportServiceDone(tb) ? (
                          <div className="flex flex-wrap items-center gap-2 pt-2">
                            <p className="text-xs font-medium text-emerald-800">
                              Service completed successfully. You can remove this
                              reminder.
                            </p>
                            <button
                              type="button"
                              onClick={() => removeTransport(tb._id)}
                              className="inline-flex items-center gap-1 text-xs text-red-700 font-semibold"
                            >
                              <Trash2 className="w-4 h-4" />
                              Remove
                            </button>
                          </div>
                        ) : null}
                      </div>
                    ) : null}

                    {tb.status === "rejected" ? (
                      <button
                        type="button"
                        onClick={() => removeTransport(tb._id)}
                        className="inline-flex items-center gap-1 text-xs text-red-700 font-semibold"
                      >
                        <Trash2 className="w-4 h-4" />
                        Remove
                      </button>
                    ) : null}
                  </li>
                ))}
              </ul>
            </section>
          ) : null}

          {!loadingHotels && hotelBookings.length > 0 ? (
            <section className="bg-white rounded-2xl shadow border border-stone-200 p-6 md:p-8 mt-6">
              <h2 className="text-xl font-bold text-stone-900 mb-2">
                Your hotel bookings
              </h2>
              <p className="text-sm text-stone-500 mb-6">
                Track approval, submit payment receipt after approval, and remove
                the card after your stay ends.
              </p>
              <ul className="space-y-4">
                {hotelBookings.map((hb) => (
                  <li
                    key={hb._id}
                    className="rounded-xl border border-stone-200 bg-stone-50/60 px-4 py-3 space-y-2"
                  >
                    <div className="flex flex-wrap justify-between gap-2">
                      <div className="min-w-0">
                        <p className="font-semibold text-stone-900 truncate">
                          {hb.hotel?.name}
                        </p>
                        <p className="text-xs text-stone-500 truncate">
                          {hb.hotel?.city} {hb.hotel?.country}
                        </p>
                        <p className="text-xs text-stone-500">
                          Stay:{" "}
                          {hb.stay?.checkIn
                            ? new Date(hb.stay.checkIn).toLocaleDateString()
                            : "—"}{" "}
                          →{" "}
                          {hb.stay?.checkOut
                            ? new Date(hb.stay.checkOut).toLocaleDateString()
                            : "—"}
                        </p>
                        <p className="text-xs text-stone-700 mt-1">
                          {formatHotelMoney(hb.adminTotal) ? (
                            <>
                              <span className="font-semibold text-stone-900">
                                Final amount:{" "}
                              </span>
                              {formatHotelMoney(hb.adminTotal)}
                              {hb.adminTotal?.label
                                ? ` (${hb.adminTotal.label})`
                                : ""}
                            </>
                          ) : formatHotelMoney(hb.quoteTotal) ? (
                            <>
                              <span className="font-semibold text-stone-900">
                                {hb.quoteTotal?.label || "Quoted"}:{" "}
                              </span>
                              {formatHotelMoney(hb.quoteTotal)}
                            </>
                          ) : (
                            <span className="text-stone-500">
                              Payment amount will show after admin sets the total
                              or from your search quote.
                            </span>
                          )}
                        </p>
                      </div>
                      <StatusBadge status={hb.status} />
                    </div>

                    {hb.status === "rejected" ? (
                      <p className="text-sm text-red-700">
                        Booking was rejected. You can remove this card.
                      </p>
                    ) : null}

                    {hb.status === "approved" &&
                    hb.payment?.status !== "verified" ? (
                      (() => {
                        const rawMethod =
                          paymentMethodHotel[hb._id] ??
                          hb.payment?.method ??
                          "";
                        const method =
                          rawMethod === "card" ? "bank_transfer" : rawMethod;
                        const isStripe = method === "stripe";
                        const details = method ? PAYMENT_DETAILS[method] : null;
                        const receiptSubmitted = Boolean(hb.payment?.receiptPdf);
                        const methodSelectLocked =
                          hb.payment?.status === "verifying" || receiptSubmitted;
                        const payStatus = hb.payment?.status ?? "none";
                        const showReceiptForm =
                          payStatus !== "verified" &&
                          !hb.payment?.receiptPdf &&
                          !isStripe &&
                          method;
                        const showStripeCheckout =
                          payStatus === "none" && isStripe;

                        return (
                          <div className="space-y-3 border-t border-stone-200 pt-2">
                            <p className="text-xs font-medium text-stone-700">
                              Payment
                              {formatHotelMoney(hb.adminTotal) ||
                              formatHotelMoney(hb.quoteTotal)
                                ? ` · ${formatHotelMoney(hb.adminTotal) || formatHotelMoney(hb.quoteTotal)}`
                                : ""}
                              {hb.adminTotal?.label
                                ? ` (${hb.adminTotal.label})`
                                : ""}
                            </p>
                            <p className="text-[11px] text-stone-500">
                              {methodSelectLocked
                                ? "Payment method is locked after you submit payment."
                                : "Your choice is saved when you upload the receipt—no separate save."}
                            </p>
                            <select
                              className="w-full max-w-xs rounded-lg border border-stone-200 px-2 py-1.5 text-sm disabled:opacity-60"
                              disabled={methodSelectLocked}
                              value={method}
                              onChange={(e) =>
                                setPaymentMethodHotel((m) => ({
                                  ...m,
                                  [hb._id]: e.target.value,
                                }))
                              }
                            >
                              {PAYMENT_METHODS.map((m) => (
                                <option
                                  key={m.id === "" ? "pm-empty-hotel" : m.id}
                                  value={m.id}
                                >
                                  {m.label}
                                </option>
                              ))}
                            </select>
                            {details ? (
                              <div className="rounded-xl border border-stone-200 bg-white/70 px-3 py-2 text-sm text-stone-700">
                                <p className="font-semibold text-stone-900">
                                  {details.title}
                                </p>
                                <ul className="mt-1 space-y-0.5 text-xs">
                                  {details.lines.map((line) => (
                                    <li key={line}>{line}</li>
                                  ))}
                                </ul>
                              </div>
                            ) : null}
                            {showStripeCheckout ? (
                              <MiscStripeCheckout
                                kind="hotel"
                                recordId={hb._id}
                                onPaid={async () => {
                                  toast.success(
                                    "Payment received. Awaiting admin verification."
                                  );
                                  await loadHotels(true);
                                }}
                                onError={(msg) => toast.error(msg)}
                              />
                            ) : null}
                            {showReceiptForm ? (
                              <form
                                className="flex flex-col sm:flex-row gap-2 items-start"
                                onSubmit={(e) =>
                                  submitHotelReceipt(hb._id, e)
                                }
                              >
                                <input
                                  name="receiptPdf"
                                  type="file"
                                  accept="application/pdf"
                                  className="text-sm"
                                  required
                                />
                                <button
                                  type="submit"
                                  className="px-3 py-1.5 rounded-lg bg-emerald-700 text-white text-xs font-semibold"
                                >
                                  Submit receipt
                                </button>
                              </form>
                            ) : null}
                            {hb.payment?.status === "verifying" ? (
                              <div className="text-xs text-amber-800 space-y-0.5">
                                <p>Awaiting admin verification</p>
                                {isStripe ? (
                                  <p className="text-stone-500 font-normal">
                                    Paid with Stripe — no PDF receipt to download
                                    here.
                                  </p>
                                ) : null}
                              </div>
                            ) : null}
                          </div>
                        );
                      })()
                    ) : null}

                    {hb.payment?.status === "verified" ? (
                      <div className="border-t border-stone-200 pt-2 space-y-1 text-sm text-stone-700">
                        <p className="font-medium text-emerald-800">
                          Payment verified
                        </p>
                        {formatHotelMoney(hb.adminTotal) ||
                        formatHotelMoney(hb.quoteTotal) ? (
                          <p className="text-xs text-stone-600">
                            Amount:{" "}
                            {formatHotelMoney(hb.adminTotal) ||
                              formatHotelMoney(hb.quoteTotal)}
                          </p>
                        ) : null}
                        {hb.payment?.method === "stripe" ? (
                          <p className="text-xs text-stone-500">
                            Paid with Stripe — there is no uploaded PDF receipt
                            for this booking.
                          </p>
                        ) : hb.payment?.receiptPdf ? (
                          <a
                            href={miscReceiptUrl(hb.payment.receiptPdf)}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-1.5 text-sm text-amber-700 hover:underline"
                          >
                            <FileText className="w-4 h-4" /> View payment
                            receipt
                          </a>
                        ) : null}
                        {isHotelStayDone(hb) ? (
                          <div className="flex flex-wrap items-center gap-2 pt-2">
                            <p className="text-xs font-medium text-emerald-800">
                              Stay completed. You can remove this reminder.
                            </p>
                            <button
                              type="button"
                              onClick={() => removeHotel(hb._id)}
                              className="inline-flex items-center gap-1 text-xs text-red-700 font-semibold"
                            >
                              <Trash2 className="w-4 h-4" />
                              Remove
                            </button>
                          </div>
                        ) : null}
                      </div>
                    ) : null}

                    {hb.status === "rejected" ? (
                      <button
                        type="button"
                        onClick={() => removeHotel(hb._id)}
                        className="inline-flex items-center gap-1 text-xs text-red-700 font-semibold"
                      >
                        <Trash2 className="w-4 h-4" />
                        Remove
                      </button>
                    ) : null}
                  </li>
                ))}
              </ul>
            </section>
          ) : null}

          {!loadingVisa && visaRequests.length > 0 ? (
            <section className="bg-white rounded-2xl shadow border border-stone-200 p-6 md:p-8">
              <h2 className="text-xl font-bold text-stone-900 mb-2">
                Your visa requests
              </h2>
              <p className="text-sm text-stone-500 mb-6">
                Same flow as transportation: approval → payment receipt →
                verification.
              </p>
              <ul className="space-y-4">
                {visaRequests.map((vr) => (
                  <li
                    key={vr._id}
                    className="rounded-xl border border-stone-200 bg-stone-50/60 px-4 py-3 space-y-2"
                  >
                    <div className="flex flex-wrap justify-between gap-2">
                      <div>
                        <p className="font-semibold text-stone-900">
                          {vr.selectedOption?.title}
                        </p>
                        <p className="text-xs text-stone-500">
                          {vr.form?.nationality} · {vr.form?.duration} ·{" "}
                          {vr.membersCount} travellers
                        </p>
                      </div>
                      <span
                        className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-semibold border ${
                          vr.status === "approved"
                            ? "bg-emerald-100 text-emerald-900 border-emerald-200"
                            : vr.status === "rejected"
                              ? "bg-red-100 text-red-800 border-red-200"
                              : "bg-amber-100 text-amber-900 border-amber-200"
                        }`}
                      >
                        {vr.status === "pending"
                          ? "Awaiting approval"
                          : vr.status}
                      </span>
                    </div>

                    {vr.status === "rejected" ? (
                      <p className="text-sm text-red-700">
                        Request was rejected. You can remove this card.
                      </p>
                    ) : null}

                    {vr.status === "approved" &&
                    vr.payment?.status !== "verified" ? (
                      (() => {
                        const rawMethod =
                          paymentMethodVisa[vr._id] ??
                          vr.payment?.method ??
                          "";
                        const method =
                          rawMethod === "card" ? "bank_transfer" : rawMethod;
                        const isStripe = method === "stripe";
                        const details = method ? PAYMENT_DETAILS[method] : null;
                        const receiptSubmitted = Boolean(vr.payment?.receiptPdf);
                        const methodSelectLocked =
                          vr.payment?.status === "verifying" ||
                          receiptSubmitted;
                        const payStatus = vr.payment?.status ?? "none";
                        const showReceiptForm =
                          payStatus !== "verified" &&
                          !vr.payment?.receiptPdf &&
                          !isStripe &&
                          method;
                        const showStripeCheckout =
                          payStatus === "none" && isStripe;
                        return (
                      <div className="space-y-3 border-t border-stone-200 pt-2">
                        <p className="text-xs font-medium text-stone-700">
                          Payment ({vr.selectedOption?.priceLabel || "—"})
                        </p>
                        <select
                          className="w-full max-w-xs rounded-lg border border-stone-200 px-2 py-1.5 text-sm disabled:opacity-60"
                          disabled={methodSelectLocked}
                          value={method}
                          onChange={(e) =>
                            setPaymentMethodVisa((m) => ({
                              ...m,
                              [vr._id]: e.target.value,
                            }))
                          }
                        >
                          {PAYMENT_METHODS.map((m) => (
                            <option
                              key={m.id === "" ? "pm-empty" : m.id}
                              value={m.id}
                            >
                              {m.label}
                            </option>
                          ))}
                        </select>
                        {details ? (
                          <div className="rounded-xl border border-stone-200 bg-white/70 px-3 py-2 text-sm text-stone-700">
                            <p className="font-semibold text-stone-900">
                              {details.title}
                            </p>
                            <ul className="mt-1 space-y-0.5 text-xs">
                              {details.lines.map((line) => (
                                <li key={line}>{line}</li>
                              ))}
                            </ul>
                          </div>
                        ) : null}
                        {showStripeCheckout ? (
                          <MiscStripeCheckout
                            kind="visa"
                            recordId={vr._id}
                            onPaid={async () => {
                              toast.success(
                                "Payment received. Awaiting admin verification."
                              );
                              await loadVisa(true);
                            }}
                            onError={(msg) => toast.error(msg)}
                          />
                        ) : null}
                        {showReceiptForm ? (
                        <form
                          className="flex flex-col sm:flex-row gap-2 items-start"
                          onSubmit={(e) => submitVisaReceipt(vr._id, e)}
                        >
                          <input
                            name="receiptPdf"
                            type="file"
                            accept="application/pdf"
                            className="text-sm"
                            required
                          />
                          <button
                            type="submit"
                            className="px-3 py-1.5 rounded-lg bg-emerald-700 text-white text-xs font-semibold"
                          >
                            Submit receipt
                          </button>
                        </form>
                        ) : null}
                        {vr.payment?.status === "verifying" ? (
                          <div className="text-xs text-amber-800 space-y-0.5">
                            <p>Awaiting admin verification</p>
                            {isStripe ? (
                              <p className="text-stone-500 font-normal">
                                Paid with Stripe — no PDF receipt to download here.
                              </p>
                            ) : null}
                          </div>
                        ) : null}
                      </div>
                        );
                      })()
                    ) : null}

                    {vr.payment?.status === "verified" ? (
                      <div className="border-t border-stone-200 pt-2 space-y-1 text-sm text-stone-700">
                        <p className="font-medium text-emerald-800">
                          Payment verified
                        </p>
                        {vr.payment?.method === "stripe" ? (
                          <p className="text-xs text-stone-500">
                            Paid with Stripe — there is no uploaded PDF receipt
                            for this request.
                          </p>
                        ) : vr.payment?.receiptPdf ? (
                          <a
                            href={miscReceiptUrl(vr.payment.receiptPdf)}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-1.5 text-sm text-amber-700 hover:underline"
                          >
                            <FileText className="w-4 h-4" /> View payment
                            receipt
                          </a>
                        ) : null}
                        <p>
                          Processing window ends:{" "}
                          {vr.serviceEndDate
                            ? new Date(vr.serviceEndDate).toLocaleDateString()
                            : "—"}
                        </p>
                        <p>Travellers: {vr.membersCount}</p>
                        {isVisaProcessingDone(vr) ? (
                          <div className="flex flex-wrap items-center gap-2 pt-2">
                            <p className="text-xs font-medium text-emerald-800">
                              Processing complete. You can remove this card.
                            </p>
                            <button
                              type="button"
                              onClick={() => removeVisa(vr._id)}
                              className="inline-flex items-center gap-1 text-xs text-red-700 font-semibold"
                            >
                              <Trash2 className="w-4 h-4" />
                              Remove
                            </button>
                          </div>
                        ) : null}
                      </div>
                    ) : null}

                    {vr.status === "rejected" ? (
                      <button
                        type="button"
                        onClick={() => removeVisa(vr._id)}
                        className="inline-flex items-center gap-1 text-xs text-red-700 font-semibold"
                      >
                        <Trash2 className="w-4 h-4" />
                        Remove
                      </button>
                    ) : null}
                  </li>
                ))}
              </ul>
            </section>
          ) : null}

          {loadingList || draftBookings.length > 0 ? (
            <section className="bg-white rounded-2xl shadow border border-stone-200 p-6 md:p-8">
              <h2 className="text-xl font-bold text-stone-900 mb-2">
                Draft bookings
              </h2>
              <p className="text-sm text-stone-500 mb-6">
                Waiting for admin approval. You’ll be able to upload visa and
                documents after approval.
              </p>
              {loadingList ? (
                <p className="text-stone-500 text-sm">Loading…</p>
              ) : (
                <ul className="space-y-3">
                  {draftBookings.map((b) => (
                    <li
                      key={b._id}
                      className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-stone-100 bg-stone-50/80 px-4 py-3"
                    >
                      <div>
                        <p className="font-semibold text-stone-900">
                          {b.packageTitle}
                        </p>
                        <p className="text-xs text-stone-500">
                          {b.packagePrice} · {b.packageDuration}
                        </p>
                      </div>
                      <StatusBadge status={b.status} />
                    </li>
                  ))}
                </ul>
              )}
            </section>
          ) : null}

          {loadingCustom || visibleCustomCount > 0 ? (
            <section className="bg-white rounded-2xl shadow border border-stone-200 p-6 md:p-8">
              <h2 className="text-xl font-bold text-stone-900 mb-2">
                Your custom package
              </h2>
              <p className="text-sm text-stone-500 mb-6">
                Requests you submitted from the Customize Package form. Admin will
                approve/reject and may set a final amount.
              </p>

              {loadingCustom ? (
                <p className="text-stone-500 text-sm">Loading…</p>
              ) : (
                <div className="space-y-6">
                  {pendingCustom.length ? (
                  <div>
                    <h3 className="text-sm font-semibold text-stone-800 mb-2">
                      Pending
                    </h3>
                    <ul className="space-y-3">
                      {pendingCustom.map((r) => (
                        <li
                          key={r._id}
                          className="rounded-xl border border-stone-100 bg-stone-50/80 px-4 py-3 flex flex-wrap items-center justify-between gap-3"
                        >
                          <div>
                            <p className="font-semibold text-stone-900">
                              {r.hotelCategory}★ · {r.passengers} pax
                            </p>
                            <p className="text-xs text-stone-500 mt-0.5">
                              {r.startDate
                                ? new Date(r.startDate).toLocaleDateString()
                                : "—"}
                              {r.estimate?.total
                                ? ` · Estimate ${formatPkr(r.estimate.total)}`
                                : ""}
                            </p>
                          </div>
                          <StatusBadge status="pending" />
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : null}

                  {approvedCustomVisible.length ? (
                  <div>
                    <h3 className="text-sm font-semibold text-stone-800 mb-2">
                      Approved
                    </h3>
                    <ul className="space-y-3">
                      {approvedCustomVisible.map((r) => {
                        const linkedBooking = r.bookingId
                          ? bookings.find((b) => b._id === r.bookingId)
                          : null;
                        return (
                        <li
                          key={r._id}
                          className="rounded-xl border border-emerald-100 bg-emerald-50/40 px-4 py-3"
                        >
                          <div className="flex flex-wrap items-start justify-between gap-3">
                            <div>
                              <p className="font-semibold text-stone-900">
                                {r.hotelCategory}★ · {r.passengers} pax
                              </p>
                              <p className="text-xs text-stone-600 mt-0.5">
                                {r.startDate
                                  ? new Date(r.startDate).toLocaleDateString()
                                  : "—"}
                              </p>
                              {r.adminTotal?.amount ? (
                                <p className="text-sm font-semibold text-emerald-900 mt-2">
                                  Final amount: {formatPkr(r.adminTotal.amount)}
                                  {r.adminExtra?.amount ? (
                                    <span className="text-xs text-stone-600 font-medium">
                                      {" "}
                                      (Extra {formatPkr(r.adminExtra.amount)})
                                    </span>
                                  ) : null}
                                </p>
                              ) : (
                                <p className="text-xs text-stone-600 mt-2">
                                  Admin approved. Final amount will be updated soon.
                                </p>
                              )}
                              {r.adminNote ? (
                                <p className="text-xs text-stone-600 mt-2 whitespace-pre-wrap">
                                  {r.adminNote}
                                </p>
                              ) : null}
                            </div>
                            <div className="flex flex-col items-end gap-2">
                              <StatusBadge status="approved" />
                              {r.bookingId ? (
                                linkedBooking ? (
                                  <div className="flex flex-col items-end gap-2">
                                    <button
                                      type="button"
                                      onClick={() => {
                                        setUploadForId(linkedBooking._id);
                                      }}
                                      className="inline-flex items-center gap-2 text-sm font-semibold text-white bg-amber-600 px-4 py-2 rounded-xl hover:bg-amber-700"
                                    >
                                      Upload documents
                                    </button>
                                    <button
                                      type="button"
                                      onClick={() => {
                                        setReceiptForId(linkedBooking._id);
                                      }}
                                      className="inline-flex items-center gap-2 text-sm font-semibold text-white bg-emerald-700 px-4 py-2 rounded-xl hover:bg-emerald-800"
                                    >
                                      Submit receipt
                                    </button>
                                    <span className="text-[11px] text-stone-500">
                                      Added to bookings
                                    </span>
                                  </div>
                                ) : (
                                  <span className="text-[11px] text-stone-500">
                                    Added to bookings
                                  </span>
                                )
                              ) : (
                                <div className="flex flex-col items-end gap-2">
                                  <div className="flex flex-wrap items-center justify-end gap-2">
                                    <button
                                      type="button"
                                      disabled={
                                        acceptingCustomId === r._id ||
                                        !r.adminTotal?.amount
                                      }
                                      onClick={() => acceptOffer(r._id)}
                                      className="inline-flex items-center gap-2 text-sm font-semibold text-white bg-emerald-700 px-4 py-2 rounded-xl hover:bg-emerald-800 disabled:opacity-60"
                                    >
                                      {acceptingCustomId === r._id
                                        ? "Accepting…"
                                        : "Accept offer"}
                                    </button>
                                    <button
                                      type="button"
                                      disabled={rejectingCustomId === r._id}
                                      onClick={() => rejectOffer(r._id)}
                                      className="inline-flex items-center gap-2 text-sm font-semibold text-white bg-stone-600 px-4 py-2 rounded-xl hover:bg-stone-700 disabled:opacity-60"
                                    >
                                      {rejectingCustomId === r._id
                                        ? "Declining…"
                                        : "Decline offer"}
                                    </button>
                                  </div>
                                  <p className="text-[11px] text-stone-500 text-right max-w-[14rem]">
                                    After you accept, this package appears under Approved
                                    bookings below.
                                  </p>
                                </div>
                              )}
                            </div>
                          </div>
                        </li>
                      );
                      })}
                    </ul>
                  </div>
                ) : null}

                {userDeclinedCustom.length ? (
                  <div>
                    <h3 className="text-sm font-semibold text-stone-800 mb-2">
                      You declined this offer
                    </h3>
                    <ul className="space-y-3">
                      {userDeclinedCustom.map((r) => (
                        <li
                          key={r._id}
                          className="rounded-xl border border-amber-100 bg-amber-50/40 px-4 py-3 flex flex-wrap items-center justify-between gap-3"
                        >
                          <div>
                            <p className="font-semibold text-stone-900">
                              {r.hotelCategory}★ · {r.passengers} pax
                            </p>
                            <p className="text-xs text-stone-600 mt-0.5">
                              {r.startDate
                                ? new Date(r.startDate).toLocaleDateString()
                                : "—"}
                            </p>
                            {r.adminTotal?.amount ? (
                              <p className="text-xs text-stone-600 mt-2">
                                Was: {formatPkr(r.adminTotal.amount)}
                              </p>
                            ) : null}
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs px-2.5 py-0.5 rounded-full font-semibold border bg-amber-100 text-amber-900 border-amber-200">
                              Declined by you
                            </span>
                            <button
                              type="button"
                              disabled={deletingCustomId === r._id}
                              onClick={() => deleteCustomRequest(r._id)}
                              className="inline-flex items-center justify-center p-2 rounded-xl border border-stone-200 bg-white text-stone-600 hover:bg-red-50 hover:text-red-700 hover:border-red-200 disabled:opacity-60"
                              title="Remove from list"
                              aria-label="Remove from list"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : null}

                {rejectedCustom.length ? (
                  <div>
                    <h3 className="text-sm font-semibold text-stone-800 mb-2">
                      Rejected by admin
                    </h3>
                    <ul className="space-y-3">
                      {rejectedCustom.map((r) => (
                        <li
                          key={r._id}
                          className="rounded-xl border border-red-100 bg-red-50/40 px-4 py-3 flex flex-wrap items-center justify-between gap-3"
                        >
                          <div>
                            <p className="font-semibold text-stone-900">
                              {r.hotelCategory}★ · {r.passengers} pax
                            </p>
                            <p className="text-xs text-stone-600 mt-0.5">
                              {r.startDate
                                ? new Date(r.startDate).toLocaleDateString()
                                : "—"}
                            </p>
                            {r.adminNote ? (
                              <p className="text-xs text-red-700 mt-2 whitespace-pre-wrap">
                                {r.adminNote}
                              </p>
                            ) : null}
                          </div>
                          <div className="flex items-center gap-2">
                            <StatusBadge status="rejected" />
                            <button
                              type="button"
                              disabled={deletingCustomId === r._id}
                              onClick={() => deleteCustomRequest(r._id)}
                              className="inline-flex items-center justify-center p-2 rounded-xl border border-stone-200 bg-white text-stone-600 hover:bg-red-50 hover:text-red-700 hover:border-red-200 disabled:opacity-60"
                              title="Remove from list"
                              aria-label="Remove from list"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : null}
                </div>
              )}
            </section>
          ) : null}

          {loadingList || rejectedBookings.length > 0 ? (
            <section className="bg-white rounded-2xl shadow border border-stone-200 p-6 md:p-8">
              <h2 className="text-xl font-bold text-stone-900 mb-2">
                Rejected bookings
              </h2>
              <p className="text-sm text-stone-500 mb-6">
                Remove a rejected booking and try again.
              </p>
              {loadingList ? (
                <p className="text-stone-500 text-sm">Loading…</p>
              ) : (
                <ul className="space-y-3">
                  {rejectedBookings.map((b) => (
                    <li
                      key={b._id}
                      className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-red-100 bg-red-50/40 px-4 py-3"
                    >
                      <div>
                        <p className="font-semibold text-stone-900">
                          {b.packageTitle}
                        </p>
                        <p className="text-xs text-stone-600">
                          {b.packagePrice} · {b.packageDuration}
                        </p>
                        {b.statusReason ? (
                          <p className="text-xs text-red-700 mt-1">
                            {b.statusReason === "payment_failed"
                              ? "Rejected: payment verification failed"
                              : "Rejected by admin"}
                          </p>
                        ) : null}
                      </div>
                      <div className="flex items-center gap-2">
                        <StatusBadge status={b.status} />
                        <button
                          type="button"
                          onClick={() => handleDeleteRejected(b._id)}
                          className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-white border border-red-200 text-red-700 hover:bg-red-50"
                          aria-label="Remove rejected booking"
                          title="Remove"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </section>
          ) : null}

          {loadingList || approvedBookings.length > 0 ? (
            <section className="bg-white rounded-2xl shadow border border-stone-200 p-6 md:p-8">
              <h2 className="text-xl font-bold text-stone-900 mb-2">
                Approved bookings
              </h2>
              <p className="text-sm text-stone-500 mb-6">
                After admin approval, upload your visa PDF, another document PDF,
                and payment receipt.
              </p>
              {loadingList ? (
                <p className="text-stone-500 text-sm">Loading…</p>
              ) : (
                <ul className="space-y-4">
                  {approvedBookings.map((b) => {
                  const journeyLocked = Boolean(b.journey?.startAt);
                  const showDocsForm =
                    !journeyLocked &&
                    (!b.documents?.visaPdf || !b.documents?.otherPdf);
                  const missingDocs =
                    !b.documents?.visaPdf || !b.documents?.otherPdf;
                  const canAttachCommon = !journeyLocked && missingDocs && hasCommonDocs;
                  const canSetMethod =
                    !journeyLocked && b.payment?.status !== "verified";
                  const receiptSubmitted = Boolean(b.payment?.receiptPdf);
                  const rawMethod =
                    paymentMethodDraft[b._id] ?? b.payment?.method ?? "";
                  const method =
                    rawMethod === "card" ? "bank_transfer" : rawMethod;
                  const isStripe = method === "stripe";
                  const details = method ? PAYMENT_DETAILS[method] : null;
                  const methodSelectLocked =
                    b.payment?.status === "verifying" ||
                    b.payment?.status === "verified" ||
                    receiptSubmitted;
                  const showReceiptForm =
                    !journeyLocked &&
                    b.payment?.status !== "verified" &&
                    !b.payment?.receiptPdf &&
                    !isStripe;
                  const payStatus = b.payment?.status ?? "none";
                  const showStripeCheckout =
                    !journeyLocked && payStatus === "none" && isStripe;
                  return (
                    <li
                      id={`booking-${b._id}`}
                      key={b._id}
                      className="rounded-xl border border-emerald-100 bg-emerald-50/40 p-4"
                    >
                      <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                      <div>
                        <p className="font-semibold text-stone-900">
                          {b.packageTitle}
                        </p>
                        <p className="text-xs text-stone-600">
                          {b.packagePrice} · {b.packageDuration}
                        </p>
                      </div>
                      <StatusBadge status={b.status} />
                    </div>
                    <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
                      <PaymentBadge status={b.payment?.status} />
                      {b.payment?.receiptPdf ? (
                        <a
                          href={`${origin}${b.payment.receiptPdf}`}
                          target="_blank"
                          rel="noreferrer"
                          className="flex items-center gap-2 text-amber-700 hover:underline text-sm"
                        >
                          <FileText className="w-4 h-4" /> Payment receipt
                        </a>
                      ) : b.payment?.method === "stripe" &&
                        (b.payment?.status === "verifying" ||
                          b.payment?.status === "verified") ? (
                        <p className="text-xs text-stone-500 max-w-[18rem] text-right">
                          Paid with Stripe — no PDF receipt is uploaded or
                          required.
                        </p>
                      ) : null}
                    </div>

                    {b.payment?.status === "verified" && b.journey?.startAt ? (
                      <div className="rounded-xl border border-emerald-200 bg-white/70 px-4 py-3 mb-3 flex flex-wrap items-center justify-between gap-3">
                        <div className="text-sm text-stone-800">
                          <p className="font-semibold text-emerald-900">
                            Umrah starts on
                          </p>
                          <p className="text-sm text-stone-700 flex items-center gap-2 mt-1">
                            <Clock className="w-4 h-4 text-emerald-700" />
                            {new Date(b.journey.startAt).toLocaleString()}
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={() => setTrackFor(b)}
                          className="inline-flex items-center gap-2 text-sm font-semibold text-white bg-emerald-700 px-4 py-2 rounded-xl hover:bg-emerald-800"
                        >
                          Track your status
                        </button>
                      </div>
                    ) : null}
                    {b.documents?.visaPdf || b.documents?.otherPdf ? (
                      <div className="text-sm text-stone-600 space-y-1 mb-3">
                        {b.documents?.visaPdf ? (
                          <a
                            href={`${origin}${b.documents.visaPdf}`}
                            target="_blank"
                            rel="noreferrer"
                            className="flex items-center gap-2 text-amber-700 hover:underline"
                          >
                            <FileText className="w-4 h-4" /> Visa PDF
                          </a>
                        ) : null}
                        {b.documents?.otherPdf ? (
                          <a
                            href={`${origin}${b.documents.otherPdf}`}
                            target="_blank"
                            rel="noreferrer"
                            className="flex items-center gap-2 text-amber-700 hover:underline"
                          >
                            <FileText className="w-4 h-4" /> Other document
                          </a>
                        ) : null}
                      </div>
                    ) : null}
                    {canAttachCommon ? (
                      <div className="border-t border-emerald-100 pt-3 mt-2 space-y-2">
                        <p className="text-xs font-medium text-stone-700">
                          Uploaded documents
                        </p>
                        <p className="text-[11px] text-stone-500">
                          You already uploaded common documents in Profile tips. Use
                          them here to avoid uploading again.
                        </p>
                        <div className="flex flex-wrap items-center gap-2">
                          <button
                            type="button"
                            onClick={() => attachCommonToBooking(b._id)}
                            className="inline-flex items-center gap-2 bg-amber-600 text-white text-sm font-semibold px-4 py-2 rounded-lg hover:bg-amber-700"
                          >
                            <Upload className="w-4 h-4" />
                            Use uploaded documents
                          </button>
                          <button
                            type="button"
                            onClick={() => setDocsModalOpen(true)}
                            className="inline-flex items-center gap-2 text-sm font-semibold text-amber-700 hover:underline"
                          >
                            Update your documents
                          </button>
                        </div>
                      </div>
                    ) : showDocsForm ? (
                      <form
                        onSubmit={(e) => handleUpload(b._id, e)}
                        className="space-y-3 border-t border-emerald-100 pt-3 mt-2"
                      >
                        <p className="text-xs font-medium text-stone-700">
                          Upload required documents (PDF)
                        </p>
                        {!b.documents?.visaPdf ? (
                          <div>
                            <label className="block text-xs text-stone-600 mb-1">
                              Visa (PDF)
                            </label>
                            <input
                              name="visaPdf"
                              type="file"
                              accept="application/pdf"
                              className="w-full rounded-xl border border-stone-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 file:mr-3 file:rounded-lg file:border-0 file:bg-stone-100 file:px-3 file:py-2 file:text-sm file:font-medium file:text-stone-700 hover:file:bg-stone-200"
                              required
                            />
                          </div>
                        ) : null}
                        {!b.documents?.otherPdf ? (
                          <div>
                            <label className="block text-xs text-stone-600 mb-1">
                              Other document (PDF)
                            </label>
                            <input
                              name="otherPdf"
                              type="file"
                              accept="application/pdf"
                              className="w-full rounded-xl border border-stone-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 file:mr-3 file:rounded-lg file:border-0 file:bg-stone-100 file:px-3 file:py-2 file:text-sm file:font-medium file:text-stone-700 hover:file:bg-stone-200"
                              required
                            />
                          </div>
                        ) : null}
                        <button
                          type="submit"
                          className="inline-flex items-center gap-2 bg-amber-600 text-white text-sm font-medium px-4 py-2 rounded-lg"
                        >
                          <Upload className="w-4 h-4" />
                          Upload documents
                        </button>
                      </form>
                    ) : null}

                    {/* Payment method */}
                    <div className="mt-3">
                      {canSetMethod ? (
                        <div className="space-y-3 border-t border-emerald-100 pt-3">
                          <p className="text-xs font-medium text-stone-700">
                            Payment method
                          </p>
                          <p className="text-[11px] text-stone-500 -mt-1 mb-1">
                            {methodSelectLocked
                              ? "Payment method is locked after you submit payment."
                              : isStripe
                                ? "Choose Card (Stripe), then complete payment in the secure form below."
                                : "Your choice is stored when you upload the receipt below—no need to save separately."}
                          </p>
                          <select
                            value={method}
                            disabled={methodSelectLocked}
                            onChange={(e) => {
                              setPaymentMethodDraft((prev) => ({
                                ...prev,
                                [b._id]: e.target.value,
                              }));
                            }}
                            className="w-full rounded-xl border border-stone-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 disabled:opacity-60 disabled:cursor-not-allowed"
                          >
                            {PAYMENT_METHODS.map((m) => (
                              <option key={m.id} value={m.id}>
                                {m.label}
                              </option>
                            ))}
                          </select>
                          {details ? (
                            <div className="rounded-xl border border-stone-200 bg-white/70 px-4 py-3 text-sm text-stone-700">
                              <p className="font-semibold text-stone-900">
                                {details.title}
                              </p>
                              <ul className="mt-2 space-y-1 text-sm text-stone-700">
                                {details.lines.map((line) => (
                                  <li key={line}>{line}</li>
                                ))}
                              </ul>
                              <p className="text-[11px] text-stone-500 mt-2">
                                {isStripe
                                  ? "Use the Stripe form below—no PDF receipt is required."
                                  : "After payment, upload the receipt PDF below."}
                              </p>
                            </div>
                          ) : null}
                        </div>
                      ) : null}
                    </div>

                    {showStripeCheckout ? (
                      <div className="mt-3">
                        <BookingStripeCheckout
                          bookingId={b._id}
                          onPaid={async () => {
                            toast.success(
                              "Payment received. It will show as verifying until admin confirms."
                            );
                            await loadBookings({ silent: true });
                          }}
                          onError={(msg) => toast.error(msg)}
                        />
                      </div>
                    ) : null}

                    {/* Payment receipt */}
                    <div className="mt-3">
                      {showReceiptForm ? (
                        <form
                          onSubmit={(e) => handleReceiptUpload(b._id, e)}
                          className="space-y-3 border-t border-emerald-100 pt-3"
                        >
                          <p className="text-xs font-medium text-stone-700">
                            Upload payment receipt (PDF)
                          </p>
                          <input
                            name="receiptPdf"
                            type="file"
                            accept="application/pdf"
                            className="w-full rounded-xl border border-stone-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 file:mr-3 file:rounded-lg file:border-0 file:bg-stone-100 file:px-3 file:py-2 file:text-sm file:font-medium file:text-stone-700 hover:file:bg-stone-200"
                            required
                          />
                          <button
                            type="submit"
                            className="inline-flex items-center gap-2 bg-emerald-700 text-white text-sm font-medium px-4 py-2 rounded-lg"
                          >
                            <Upload className="w-4 h-4" />
                            Submit receipt
                          </button>
                        </form>
                      ) : null}
                    </div>
                    </li>
                  );
                  })}
                </ul>
              )}
            </section>
          ) : null}
        </div>

        <aside className="space-y-6">
          <div className="bg-white rounded-2xl shadow border border-stone-200 p-6">
            <h3 className="font-semibold text-stone-900 mb-2">Profile tips</h3>
            {isAdmin ? (
              <>
                <p className="text-sm text-stone-600">
                  As an administrator, you can use this dashboard to preview the
                  same member experience your travelers see—bookings, documents,
                  and custom packages. Walk through flows here to verify everything
                  works, then manage content and approvals from the admin panel
                  (face icon → Admin panel).
                </p>
                <div className="mt-4 rounded-xl bg-amber-50 border border-amber-200/80 px-3 py-2.5 text-xs text-amber-950">
                  <span className="font-semibold">Tip:</span> Use the main site
                  navigation to test public pages; use{" "}
                  <span className="font-medium">Admin panel</span> in the account
                  menu for back-office tasks.
                </div>
                <div className="mt-4 h-2 rounded-full bg-stone-100 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-amber-500 to-amber-400 rounded-full transition-all"
                    style={{
                      width: `${Math.min(
                        100,
                        25 +
                          (user?.phone ? 25 : 0) +
                          (bitmojiIndex != null ? 25 : 0) +
                          (user?.city ? 25 : 0)
                      )}%`,
                    }}
                  />
                </div>
                <p className="text-xs text-stone-500 mt-2">Profile completeness</p>
              </>
            ) : (
              <>
                <p className="text-sm text-stone-600">
                  Users can upload their documents here or upload them after the admin
                  approves their bookings.
                </p>
                {hasCommonDocs ? (
                  <div className="mt-4 text-sm text-stone-600 space-y-1">
                    {commonDocs?.visaPdf ? (
                      <a
                        href={`${origin}${commonDocs.visaPdf}`}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-2 text-amber-700 hover:underline"
                      >
                        <FileText className="w-4 h-4" /> Visa PDF
                      </a>
                    ) : null}
                    {commonDocs?.otherPdf ? (
                      <a
                        href={`${origin}${commonDocs.otherPdf}`}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-2 text-amber-700 hover:underline"
                      >
                        <FileText className="w-4 h-4" /> Other document
                      </a>
                    ) : null}
                  </div>
                ) : (
                  <div className="mt-4 rounded-xl bg-amber-50 border border-amber-200/80 px-3 py-2.5 text-xs text-amber-950">
                    <span className="font-semibold">Tip:</span> Upload your visa and
                    other PDF once here.
                  </div>
                )}
                <button
                  type="button"
                  onClick={() => {
                    setDocsModalOpen(true);
                  }}
                  className="mt-4 inline-flex items-center justify-center w-full px-4 py-2.5 rounded-xl bg-amber-600 text-white font-semibold hover:bg-amber-700"
                >
                  <Upload className="w-4 h-4 mr-2" />
                  {hasCommonDocs ? "Update your documents" : "Upload Documents"}
                </button>
                <div className="mt-4 h-2 rounded-full bg-stone-100 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-amber-500 to-amber-400 rounded-full transition-all"
                    style={{
                      width: `${Math.min(
                        100,
                        25 +
                          (user?.phone ? 25 : 0) +
                          (bitmojiIndex != null ? 25 : 0) +
                          (user?.city ? 25 : 0)
                      )}%`,
                    }}
                  />
                </div>
                <p className="text-xs text-stone-500 mt-2">Profile completeness</p>
              </>
            )}
          </div>

          <div className="bg-white rounded-2xl shadow border border-stone-200 p-6">
            <h3 className="font-semibold text-stone-900 mb-2">
              Share your journey
            </h3>
            <p className="text-sm text-stone-600">
              Share your Hajj/Umrah experience as a story (text or video). After
              admin approval, it will be published on the Stories page.
            </p>
            <Link
              to="/stories/submit"
              className="mt-4 inline-flex items-center justify-center w-full px-4 py-2.5 rounded-xl bg-emerald-700 text-white font-semibold hover:bg-emerald-800"
            >
              Submit a story
            </Link>
          </div>
        </aside>
      </div>

      {docsModalOpen ? (
        <div className="fixed inset-0 z-[105] bg-black/50 flex items-center justify-center p-4">
          <div className="w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-stone-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-stone-100 flex items-center justify-between">
              <div>
                <h3 className="text-base font-semibold text-stone-900">
                  Upload Documents
                </h3>
                <p className="text-xs text-stone-500 mt-0.5">
                  Upload visa and other document PDFs.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setDocsModalOpen(false)}
                className="p-2 rounded-lg hover:bg-stone-100 text-stone-500"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6">
              {hasCommonDocs ? (
                <div className="rounded-xl border border-stone-200 bg-stone-50/70 px-4 py-3 mb-4">
                  <p className="text-sm font-semibold text-stone-900">
                    Your common documents
                  </p>
                  <p className="text-xs text-stone-600 mt-0.5">
                    Upload once — reuse for future bookings.
                  </p>
                  <div className="mt-2 text-sm text-stone-600 space-y-1">
                    {commonDocs?.visaPdf ? (
                      <a
                        href={`${origin}${commonDocs.visaPdf}`}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-2 text-amber-700 hover:underline"
                      >
                        <FileText className="w-4 h-4" /> Visa PDF
                      </a>
                    ) : null}
                    {commonDocs?.otherPdf ? (
                      <a
                        href={`${origin}${commonDocs.otherPdf}`}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-2 text-amber-700 hover:underline"
                      >
                        <FileText className="w-4 h-4" /> Other document
                      </a>
                    ) : null}
                  </div>
                </div>
              ) : (
                <div className="rounded-xl bg-amber-50 border border-amber-200/80 px-4 py-3 text-sm text-amber-950 mb-4">
                  No common documents uploaded yet.
                </div>
              )}

              <form onSubmit={handleDocsModalUpload} className="space-y-3">
                <div>
                  <label className="block text-xs text-stone-600 mb-1">
                    Visa (PDF)
                  </label>
                  <input
                    name="visaPdf"
                    type="file"
                    accept="application/pdf"
                    className="w-full rounded-xl border border-stone-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 file:mr-3 file:rounded-lg file:border-0 file:bg-stone-100 file:px-3 file:py-2 file:text-sm file:font-medium file:text-stone-700 hover:file:bg-stone-200"
                  />
                </div>
                <div>
                  <label className="block text-xs text-stone-600 mb-1">
                    Other document (PDF)
                  </label>
                  <input
                    name="otherPdf"
                    type="file"
                    accept="application/pdf"
                    className="w-full rounded-xl border border-stone-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 file:mr-3 file:rounded-lg file:border-0 file:bg-stone-100 file:px-3 file:py-2 file:text-sm file:font-medium file:text-stone-700 hover:file:bg-stone-200"
                  />
                </div>
                <button
                  type="submit"
                  className="inline-flex items-center justify-center w-full gap-2 bg-amber-600 text-white text-sm font-semibold px-4 py-2.5 rounded-xl hover:bg-amber-700 disabled:opacity-60"
                >
                  <Upload className="w-4 h-4" />
                  {hasCommonDocs ? "Update your documents" : "Upload documents"}
                </button>
                <p className="text-[11px] text-stone-500">
                  Tip: You can upload now, or upload again after admin approves your
                  booking.
                </p>
              </form>
            </div>
          </div>
        </div>
      ) : null}

      {avatarPickerOpen ? (
        <div className="fixed inset-0 z-[100] bg-black/50 flex items-center justify-center p-4">
          <div className="w-full max-w-xl bg-white rounded-2xl shadow-2xl border border-stone-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-stone-100 flex items-center justify-between">
              <div>
                <h3 className="text-base font-semibold text-stone-900">
                  Choose profile avatar
                </h3>
                <p className="text-xs text-stone-500 mt-0.5">
                  Pick one. Click Save to apply.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setAvatarPickerOpen(false)}
                className="p-2 rounded-lg hover:bg-stone-100 text-stone-500"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6">
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-4">
                {avatarOptions.map((a) => (
                  <button
                    key={a.idx}
                    type="button"
                    onClick={() => setAvatarDraft(a.idx)}
                    className={`relative rounded-2xl border transition-all p-3 hover:shadow-md ${
                      avatarDraft === a.idx
                        ? "border-amber-400 ring-2 ring-amber-200 bg-amber-50/40"
                        : "border-stone-200 bg-white hover:border-amber-200"
                    }`}
                  >
                    <img
                      src={a.url}
                      alt=""
                      className="w-full aspect-square rounded-xl bg-stone-50"
                    />
                    {avatarDraft === a.idx ? (
                      <span className="absolute top-2 right-2 inline-flex items-center justify-center w-7 h-7 rounded-full bg-amber-500 text-white shadow">
                        <Check className="w-4 h-4" />
                      </span>
                    ) : null}
                  </button>
                ))}
              </div>
            </div>

            <div className="px-6 py-4 border-t border-stone-100 flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={() => setAvatarPickerOpen(false)}
                className="px-4 py-2 rounded-xl text-sm font-semibold text-stone-700 hover:bg-stone-100"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  setBitmojiIndex(avatarDraft);
                  setAvatarPickerOpen(false);
                }}
                className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500 to-amber-400 text-white font-semibold px-5 py-2.5 rounded-xl hover:opacity-95"
              >
                <Save className="w-4 h-4" />
                Save avatar
              </button>
            </div>
          </div>
        </div>
      ) : null}

      {trackFor ? (
        <div className="fixed inset-0 z-[110] bg-black/50 flex items-center justify-center p-4">
          <div className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-stone-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-stone-100 flex items-center justify-between">
              <div>
                <h3 className="text-base font-semibold text-stone-900">
                  Track your status
                </h3>
                <p className="text-xs text-stone-500 mt-0.5">
                  {trackFor.packageTitle}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setTrackFor(null)}
                className="p-2 rounded-lg hover:bg-stone-100 text-stone-500"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="rounded-2xl border border-stone-200 bg-stone-50 px-5 py-4">
                  <p className="text-xs font-medium text-stone-600">
                    Start date
                  </p>
                  <p className="text-sm font-semibold text-stone-900 mt-2">
                    {trackFor.journey?.startAt
                      ? new Date(trackFor.journey.startAt).toLocaleString()
                      : "Not scheduled yet"}
                  </p>
                  <p className="text-[11px] text-stone-500 mt-2">
                    This is set by the admin when your Umrah journey is scheduled.
                  </p>
                </div>

                <div className="rounded-2xl border border-stone-200 bg-white px-5 py-4">
                  <p className="text-xs font-medium text-stone-600">
                    Current status
                  </p>
                  <p className="text-sm font-semibold text-emerald-800 mt-2">
                    {stageLabel(trackFor.journey?.stage)}
                  </p>
                  {trackFor.journey?.updatedAt ? (
                    <p className="text-[11px] text-stone-500 mt-2">
                      Updated {new Date(trackFor.journey.updatedAt).toLocaleString()}
                    </p>
                  ) : (
                    <p className="text-[11px] text-stone-500 mt-2">
                      Waiting for admin updates.
                    </p>
                  )}
                </div>
              </div>

              <div className="mt-4 rounded-2xl border border-stone-200 bg-white px-5 py-4">
                <p className="text-xs font-medium text-stone-600">
                  Journey progress
                </p>
                <div className="mt-4">
                  <JourneyStepper stage={trackFor.journey?.stage} />
                </div>
                <p className="text-[11px] text-stone-500 mt-3">
                  The admin updates your status during your journey (flight, stay, etc.).
                </p>
              </div>
            </div>
            <div className="px-6 py-4 border-t border-stone-100 flex justify-end">
              <button
                type="button"
                onClick={() => setTrackFor(null)}
                className="px-4 py-2 rounded-xl text-sm font-semibold bg-emerald-700 text-white hover:bg-emerald-800"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
