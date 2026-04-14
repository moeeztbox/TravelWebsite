import React, {
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  captureScrollPosition,
  forceReleaseScrollLock,
  getScrollLockState,
  useScrollLock,
} from "../../Hooks/useScrollLock";
import {
  Calendar,
  ArrowRight,
  Bus,
  ShieldCheck,
  Ticket,
  Hotel,
  MapPin,
  X,
} from "lucide-react";
import { usePackageBooking } from "../../Hooks/usePackageBooking";
import { fetchPackages } from "../../Services/packageService";
import { iconForHighlightKey } from "../../constants/packageHighlightIcons";
import { Link } from "react-router-dom";
import Portal from "../Common/Portal";

function getHighlights(pkg) {
  const raw = Array.isArray(pkg?.highlights) ? pkg.highlights : [];
  return raw
    .filter((h) => h && h.text)
    .map((h) => ({
      icon: iconForHighlightKey(h.iconKey),
      text: h.text,
    }));
}

function serviceBadges(services) {
  const s = services || {};
  return [
    { key: "transport", label: "Transport", Icon: Bus, on: Boolean(s.transport) },
    { key: "visa", label: "Visa", Icon: ShieldCheck, on: Boolean(s.visa) },
    { key: "ticket", label: "Ticket", Icon: Ticket, on: Boolean(s.ticket) },
    { key: "hotel", label: "Hotel", Icon: Hotel, on: Boolean(s.hotel) },
    { key: "ziyarat", label: "Ziyarat", Icon: MapPin, on: Boolean(s.ziyarat) },
  ].filter((x) => x.on);
}

function PackageDialog({ pkg, isOpen, onClose, onBookPackage, booking }) {
  const dialogRef = useRef(null);
  const contentRef = useRef(null);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const highlights = getHighlights(pkg);
  const services = useMemo(() => serviceBadges(pkg.services), [pkg.services]);
  useScrollLock(Boolean(isOpen || confirmOpen));

  useEffect(() => {
    if (!isOpen) setConfirmOpen(false);
  }, [isOpen]);

  // Safety net: if scroll-lock remains stuck after closing, force release it.
  useEffect(() => {
    if (isOpen || confirmOpen || booking) return undefined;
    const t = window.setTimeout(() => {
      if (document.body.getAttribute("data-scroll-locked") !== "true") return;
      const st = getScrollLockState();
      // If the ref-count says "no locks" but body is still locked, force unlock.
      // (Sometimes a component unmount or strict-mode timing can leave it stuck.)
      if (st.lockCount === 0) {
        forceReleaseScrollLock();
      }
    }, 50);
    return () => window.clearTimeout(t);
  }, [isOpen, confirmOpen, booking]);

  useEffect(() => {
    if (!isOpen) return;
    const id = requestAnimationFrame(() => {
      const el = contentRef.current;
      if (!el) return;
      /* No scrollTo(0) — a new dialog mount already starts at top; forcing it caused a visible jump. */
      el.focus({ preventScroll: true });
    });
    return () => cancelAnimationFrame(id);
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") {
        if (confirmOpen) setConfirmOpen(false);
        else onClose();
      }
    };

    if (isOpen) {
      window.addEventListener("keydown", handleEscape);
    }
    
    return () => {
      window.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, onClose, confirmOpen]);

  /* React's onWheel is passive — preventDefault does nothing, so wheel won't scroll
     a nested overflow div while body is scroll-locked. Native listener + passive:false fixes it. */
  useLayoutEffect(() => {
    if (!isOpen) return undefined;
    const dialog = dialogRef.current;
    if (!dialog) return undefined;

    const onWheel = (e) => {
      const content = contentRef.current;
      if (!content) return;
      if (content.scrollHeight <= content.clientHeight + 1) return;
      content.scrollTop += e.deltaY;
      e.preventDefault();
    };

    dialog.addEventListener("wheel", onWheel, { passive: false, capture: true });
    return () =>
      dialog.removeEventListener("wheel", onWheel, { capture: true });
  }, [isOpen]);

  if (!isOpen) return null;

  const overlayStyle = {
    position: "fixed",
    inset: 0,
    zIndex: 99999,
    backgroundColor: "rgba(0,0,0,0.55)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "1rem",
    overflow: "hidden",
  };

  const dialogShellStyle = {
    position: "relative",
    width: "100%",
    maxWidth: "672px",
    maxHeight: "85vh",
    margin: "auto",
    display: "flex",
    flexDirection: "column",
    borderRadius: "16px",
    overflow: "hidden",
    background: "#fff",
    boxShadow: "0 25px 50px rgba(0,0,0,0.25)",
    border: "1px solid #e7e5e4",
  };

  const scrollBodyStyle = {
    flex: 1,
    minHeight: 0,
    maxHeight: "100%",
    overflowY: "auto",
    overscrollBehavior: "contain",
    WebkitOverflowScrolling: "touch",
    padding: "1.5rem",
    outline: "none",
  };

  return (
    <Portal>
      <>
      {/* Renders under document.body via Portal — avoids parent overflow / stacking clipping */}
      <div style={overlayStyle} onClick={onClose} role="presentation">
        <div
          ref={dialogRef}
          style={dialogShellStyle}
          onClick={(e) => e.stopPropagation()}
          role="dialog"
          aria-modal="true"
          aria-labelledby="package-dialog-title"
        >
          <div
            style={{
              padding: "1rem 1.5rem",
              borderBottom: "1px solid #f5f5f4",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexShrink: 0,
              background: "#fff",
            }}
          >
            <div style={{ minWidth: 0, paddingRight: "0.5rem" }}>
              <h3
                id="package-dialog-title"
                style={{
                  fontSize: "15px",
                  fontWeight: 600,
                  color: "#1c1917",
                  margin: 0,
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                {pkg.title}
              </h3>
              <p style={{ fontSize: "12px", color: "#78716c", margin: "2px 0 0" }}>
                {pkg.subtitle || "Package details"}
              </p>
            </div>
            <button
              type="button"
              onClick={onClose}
              style={{
                padding: "6px",
                borderRadius: "8px",
                border: "none",
                background: "transparent",
                cursor: "pointer",
                color: "#78716c",
                flexShrink: 0,
              }}
              aria-label="Close"
              title="Close"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div
            ref={contentRef}
            tabIndex={0}
            role="region"
            aria-label="Package details (use arrow keys or Page Up/Down to scroll)"
            className="outline-none focus-visible:ring-2 focus-visible:ring-amber-400/50 focus-visible:ring-inset rounded-sm"
            style={scrollBodyStyle}
          >
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="w-full sm:w-48 h-36 sm:h-40 rounded-2xl overflow-hidden bg-stone-100 border border-stone-200 shrink-0">
                <img
                  src={
                    pkg.image ||
                    "https://images.unsplash.com/photo-1591604466107-ec97de577aff?w=800"
                  }
                  alt=""
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              <div className="flex-1 min-w-0 space-y-3">
                <div className="rounded-2xl border border-stone-200 bg-stone-50 px-4 py-3">
                  <p className="text-xs font-medium text-stone-600">Price</p>
                  <p className="text-lg font-semibold text-amber-800 mt-1">
                    {pkg.price || "—"}
                  </p>
                </div>
                <div className="rounded-2xl border border-stone-200 bg-white px-4 py-3">
                  <p className="text-xs font-medium text-stone-600">Duration</p>
                  <p className="text-sm font-semibold text-stone-900 mt-2 flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-amber-600 shrink-0" />
                    {pkg.duration || "—"}
                  </p>
                </div>
              </div>
            </div>

            {pkg.badge ? (
              <p className="mt-4 text-[11px] text-stone-500">
                <span className="font-medium text-stone-700">{pkg.badge}</span>
              </p>
            ) : null}

            <div className="mt-4 rounded-2xl border border-stone-200 bg-white px-5 py-4">
              <p className="text-xs font-medium text-stone-600">About this package</p>
              <p className="text-sm text-stone-700 leading-relaxed mt-2">
                Curated Umrah experience with the services shown below. Our team handles
                coordination so you can focus on your journey.
              </p>
            </div>

            {services.length ? (
              <div className="mt-4 rounded-2xl border border-stone-200 bg-stone-50 px-5 py-4">
                <p className="text-xs font-medium text-stone-600">Services</p>
                <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {services.map((h, idx) => {
                    const Icon = h.Icon;
                    return (
                      <div
                        key={`${h.key}-${idx}`}
                        className="flex items-center gap-2 rounded-xl border border-stone-200 bg-white px-3 py-2 text-sm text-stone-800"
                      >
                        <Icon className="w-4 h-4 text-amber-600 shrink-0" />
                        <span className="truncate">{h.label}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            ) : null}

            {highlights.length ? (
              <div className="mt-4 rounded-2xl border border-stone-200 bg-white px-5 py-4">
                <p className="text-xs font-medium text-stone-600">Highlights</p>
                <div className="mt-3 space-y-2">
                  {highlights.map((highlight, idx) => {
                    const Icon = highlight.icon;
                    return (
                      <div key={idx} className="flex items-start gap-3">
                        <Icon className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                        <span className="text-sm text-stone-700">{highlight.text}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            ) : null}
          </div>

          <div
            style={{
              padding: "1rem 1.5rem",
              borderTop: "1px solid #f5f5f4",
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              gap: "8px",
              flexShrink: 0,
              background: "#fff",
            }}
          >
            <button
              type="button"
              onClick={onClose}
              style={{
                padding: "8px 16px",
                borderRadius: "10px",
                border: "1px solid #e7e5e4",
                background: "#fff",
                fontSize: "14px",
                fontWeight: 600,
                color: "#44403c",
                cursor: "pointer",
              }}
            >
              Close
            </button>
            <button
              type="button"
              disabled={booking}
              onClick={() => setConfirmOpen(true)}
              style={{
                padding: "8px 16px",
                borderRadius: "10px",
                border: "none",
                background: booking ? "#9ca3af" : "#d97706",
                fontSize: "14px",
                fontWeight: 600,
                color: "#fff",
                cursor: booking ? "not-allowed" : "pointer",
              }}
            >
              {booking ? "Adding…" : "Book now"}
            </button>
          </div>
        </div>
      </div>

      {confirmOpen ? (
        <div
          style={{ ...overlayStyle, zIndex: 100001 }}
          onClick={() => (booking ? null : setConfirmOpen(false))}
          role="presentation"
        >
          <div
            style={{
              ...dialogShellStyle,
              maxWidth: "448px",
              maxHeight: "85vh",
            }}
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="package-confirm-title"
          >
            <div
              style={{
                padding: "1rem 1.5rem",
                borderBottom: "1px solid #f5f5f4",
                flexShrink: 0,
                background: "#fff",
              }}
            >
              <h4
                id="package-confirm-title"
                style={{
                  fontSize: "15px",
                  fontWeight: 600,
                  color: "#1c1917",
                  margin: 0,
                }}
              >
                Confirm booking
              </h4>
              <p style={{ fontSize: "14px", color: "#78716c", margin: "8px 0 0" }}>
                Are you sure you want to book{" "}
                <span style={{ fontWeight: 600, color: "#1c1917" }}>{pkg.title}</span>?
              </p>
            </div>
            <div
              style={{
                padding: "1rem 1.5rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-end",
                gap: "8px",
                borderTop: "1px solid #f5f5f4",
                background: "#fff",
              }}
            >
              <button
                type="button"
                disabled={booking}
                onClick={() => setConfirmOpen(false)}
                style={{
                  padding: "8px 16px",
                  borderRadius: "10px",
                  border: "1px solid #e7e5e4",
                  background: "#fff",
                  fontSize: "14px",
                  fontWeight: 600,
                  color: "#44403c",
                  cursor: booking ? "not-allowed" : "pointer",
                  opacity: booking ? 0.6 : 1,
                }}
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={booking}
                onClick={async () => {
                  setConfirmOpen(false);
                  await onBookPackage?.();
                }}
                style={{
                  padding: "8px 16px",
                  borderRadius: "10px",
                  border: "none",
                  background: booking ? "#9ca3af" : "#d97706",
                  fontSize: "14px",
                  fontWeight: 600,
                  color: "#fff",
                  cursor: booking ? "not-allowed" : "pointer",
                }}
              >
                {booking ? "Adding…" : "Yes, book it"}
              </button>
            </div>
          </div>
        </div>
      ) : null}
      </>
    </Portal>
  );
}

function PackageCard({ pkg }) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [booking, setBooking] = useState(false);
  useScrollLock(Boolean(booking));
  const { bookPackage } = usePackageBooking();
  const highlights = getHighlights(pkg).slice(0, 2);
  const services = useMemo(() => serviceBadges(pkg.services), [pkg.services]);

  const handleBook = async () => {
    if (booking) return;
    setBooking(true);
    try {
      await bookPackage(pkg, { redirectToDashboard: false });
      setIsDialogOpen(false);
    } finally {
      // keep overlay slightly longer to avoid flicker on fast navigation
      window.setTimeout(() => setBooking(false), 250);
    }
  };

  return (
    <>
      {booking ? (
        <div className="fixed inset-0 z-[100000] bg-black/35 backdrop-blur-md flex items-center justify-center">
          <div className="bg-white/90 backdrop-blur-md border border-white/40 rounded-2xl px-6 py-5 shadow-xl">
            <div className="flex items-center gap-3">
              <div className="h-9 w-9 rounded-full border-4 border-[#C9A227]/30 border-t-[#C9A227] animate-spin" />
              <div className="text-sm font-semibold text-gray-800">
                Adding to dashboard…
              </div>
            </div>
          </div>
        </div>
      ) : null}
      <div 
        className="group relative h-full cursor-pointer"
        onClick={() => {
          captureScrollPosition();
          setIsDialogOpen(true);
        }}
      >
  <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl border border-gray-100 hover:border-[#C9A227]/30 transition-all duration-500 hover:scale-101 h-full">
          
          <div className="relative h-48 overflow-hidden">
            <img
              src={
                pkg.image ||
                "https://images.unsplash.com/photo-1591604466107-ec97de577aff?w=600"
              }
              alt={pkg.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
            />
            <div className="absolute top-3 left-3">
              <span className="bg-gradient-to-r from-[#C9A227] to-[#DAB83D] text-white px-2.5 py-0.5 rounded-full text-xs font-semibold shadow-lg">
                {pkg.badge || pkg.duration || "Package"}
              </span>
            </div>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                captureScrollPosition();
                setIsDialogOpen(true);
              }}
              className="absolute bottom-2 right-2 p-2 bg-white hover:bg-gray-50 rounded-lg shadow-md transition-colors"
              aria-label="View package details"
              title="View details"
            >
              <span className="text-xl">+</span>
            </button>
          </div>

          <div className="p-5 bg-gradient-to-b from-white to-[#C9A227]/5 flex flex-col h-[calc(100%-12rem)]">
            
            <div className="mb-3">
              <h3 className="text-lg font-bold text-gray-900 mb-0.5">
                {pkg.title}
              </h3>
              <p className="text-xs font-medium text-gray-600">
                {pkg.subtitle || "Complete Umrah Package"}
              </p>
            </div>

            <div className="mb-3 flex items-center justify-between">
              <span className="text-xl font-bold bg-gradient-to-r from-[#C9A227] to-[#DAB83D] bg-clip-text text-transparent">
                {pkg.price}
              </span>
              <div className="flex items-center gap-1 text-gray-600 text-xs">
                <Calendar className="w-3 h-3 text-[#C9A227]" />
                <span>{pkg.duration}</span>
              </div>
            </div>

            {/* Services row (shows selected services; Transport + Visa prominently) */}
            {services.length ? (
              <div className="flex flex-wrap gap-2 mb-3">
                {services.map(({ key, label, Icon }) => (
                  <span
                    key={key}
                    className="inline-flex items-center gap-1.5 text-[11px] font-semibold px-2.5 py-1 rounded-full bg-[#C9A227]/10 text-[#8A6A12] border border-[#C9A227]/20"
                    title={label}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    {label}
                  </span>
                ))}
              </div>
            ) : null}

            <div className="grid grid-cols-1 gap-1.5 mb-4 text-sm flex-grow">
              {highlights.map((highlight, idx) => {
                const Icon = highlight.icon;
                return (
                  <div key={idx} className="flex items-center gap-2 text-gray-600">
                    <Icon className="w-4 h-4 text-[#C9A227] flex-shrink-0" />
                    <span className="break-words">{highlight.text}</span>
                  </div>
                );
              })}
            </div>

            <button
              type="button"
              className="w-full bg-gradient-to-r from-[#C9A227] to-[#DAB83D] text-white font-semibold py-3 px-5 rounded-lg text-sm md:text-base transition-all duration-300 flex items-center justify-center gap-2 shadow-md hover:shadow-lg mt-auto"
              onClick={(e) => {
                e.stopPropagation();
                captureScrollPosition();
                setIsDialogOpen(true);
              }}
            >
              <span>View details</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      <PackageDialog
        pkg={pkg}
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onBookPackage={handleBook}
        booking={booking}
      />
      <style jsx global>{`
        .navbar-z { z-index: 40 !important; }
      `}</style>
    </>
  );
}

const PackagesData = [
  {
    packageId: "umrah-silver",
    title: "Umrah Silver Package",
    subtitle: "Perfect for Budget-Conscious Pilgrims",
    hotel: "5 Star Hotel",
    transport: "AC Bus",
    ziyarat: "Included",
    visa: "Included",
    makkah: "7 Nights",
    madinah: "8 Nights",
    price: "PKR 120,000",
    days: "15 Days",
    badge: "Budget Friendly",
    image: "https://images.unsplash.com/photo-1591604466107-ec97de577aff?w=800"
  },
  {
    packageId: "umrah-gold",
    title: "Umrah Gold Package",
    subtitle: "Luxury Experience for Sacred Journey",
    hotel: "Luxury Hotel",
    transport: "Private Car",
    ziyarat: "Included",
    visa: "Included",
    makkah: "5 Nights",
    madinah: "5 Nights",
    price: "PKR 200,000",
    days: "10 Days",
    badge: "Most Popular",
    image: "https://images.unsplash.com/photo-1564769610725-4f5d15d6a94e?w=800"
  },
  {
    packageId: "umrah-economy",
    title: "Umrah Economy Package",
    subtitle: "Extended Stay for Complete Experience",
    hotel: "3 Star Hotel",
    transport: "AC Bus",
    ziyarat: "Optional",
    visa: "Not Included",
    makkah: "10 Nights",
    madinah: "10 Nights",
    price: "PKR 90,000",
    days: "20 Days",
    badge: "Extended Stay",
    image: "https://images.unsplash.com/photo-1542816417-0983c9c9ad53?w=800"
  },
];

export default function PackagesGrid({
  limit,
  showViewAll = false,
}) {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [expanded, setExpanded] = useState(false);
  const [expanding, setExpanding] = useState(false);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      setLoading(true);
      setError("");
      try {
        const raw = await fetchPackages();
        if (!cancelled) setPackages(raw || []);
      } catch (e) {
        if (!cancelled) setError(e?.message || "Could not load packages");
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const hasLimit = Number(limit) > 0;
  const limited = hasLimit ? packages.slice(0, Number(limit)) : packages;
  const visible = expanded ? packages : limited;

  return (
    <section id="packages-grid" className="relative bg-white overflow-hidden">
    
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, rgba(201,162,39,0.12) 1px, transparent 0)`,
          backgroundSize: "60px 60px"
        }}
      />

      <div className="absolute inset-0 bg-gradient-to-b from-white via-transparent to-white opacity-50" />

      <div className="py-12 md:py-16 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {error ? (
            <p className="text-center text-red-600 text-sm mb-6">{error}</p>
          ) : null}

          {loading ? (
            <div className="py-16 text-center text-gray-500">Loading packages…</div>
          ) : packages.length === 0 ? (
            <div className="py-16 text-center text-gray-500">
              No packages available.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {visible.map((p) => (
                <PackageCard key={p.packageId || p._id} pkg={p} />
              ))}
            </div>
          )}

          {showViewAll && !loading && packages.length > visible.length ? (
            <div className="text-center mt-10">
              <button
                type="button"
                onClick={() => {
                  if (expanded || expanding) return;
                  setExpanding(true);
                  // UX loader before expanding the list
                  window.setTimeout(() => {
                    setExpanded(true);
                    setExpanding(false);
                  }, 450);
                }}
                disabled={expanding}
                className="inline-flex items-center justify-center bg-gradient-to-r from-white to-[#C9A227]/10 border-2 border-[#C9A227] text-[#C9A227] hover:bg-gradient-to-r hover:from-[#C9A227] hover:to-[#DAB83D] hover:text-white hover:border-[#DAB83D] px-8 py-3 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-60"
              >
                {expanding ? "Loading…" : "View all packages"}
              </button>
            </div>
          ) : null}

          {expanding ? (
            <div className="mt-8 flex items-center justify-center">
              <div className="h-10 w-10 rounded-full border-4 border-[#C9A227]/30 border-t-[#C9A227] animate-spin" />
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}