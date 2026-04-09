import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  Calendar,
  ArrowRight,
  Bus,
  ShieldCheck,
  Ticket,
  Hotel,
  MapPin,
} from "lucide-react";
import { usePackageBooking } from "../../Hooks/usePackageBooking";
import { fetchPackages } from "../../Services/packageService";
import { iconForHighlightKey } from "../../constants/packageHighlightIcons";
import { Link } from "react-router-dom";

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
  const pageScrollYRef = useRef(0);

  useEffect(() => {
    if (isOpen) {
      pageScrollYRef.current = window.scrollY || 0;
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.body.style.overflow = "";
      window.scrollTo({
        top: pageScrollYRef.current || 0,
        left: 0,
        behavior: "auto",
      });
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    
    window.setTimeout(() => {
      contentRef.current?.scrollTo?.({ top: 0, behavior: "smooth" });
    }, 0);
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

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[99999] bg-black/50 backdrop-blur-lg overflow-y-auto animate-overlay-in"
      onClick={onClose}
    >
    
      <div className="min-h-full flex items-center justify-center px-4 pt-24 pb-10 sm:pt-28 sm:pb-14">
        <div
        ref={dialogRef}
        className="relative flex flex-col bg-white rounded-3xl border border-black/10 shadow-[0_18px_60px_rgba(0,0,0,0.22)] overflow-hidden w-full max-w-[920px] animate-modal-in"
        onClick={(e) => e.stopPropagation()}
        style={{ zIndex: 100000 }}
      >
   
        <div className="px-6 py-4 border-b border-gray-100 bg-white flex items-center justify-between">
          <div className="min-w-0">
            <h3 className="text-base sm:text-lg font-semibold text-gray-900 truncate">
              {pkg.title}
            </h3>
            <p className="text-xs sm:text-sm text-gray-500 truncate">
              {pkg.subtitle || "Package details"}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-black/5 hover:scale-105 transition text-gray-500"
            aria-label="Close"
            title="Close"
          >
            ✕
          </button>
        </div>

        <div 
          ref={contentRef}
          className="flex-1 overflow-y-auto scroll-smooth"
          style={{ 
            maxHeight: "min(560px, calc(100vh - 220px))",
          }}
        >
          <div className="p-6">
         
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="w-full sm:w-56 h-32 sm:h-36 rounded-xl overflow-hidden bg-gray-100 border border-gray-200 shrink-0">
                <img
                  src={
                    pkg.image ||
                    "https://images.unsplash.com/photo-1591604466107-ec97de577aff?w=800"
                  }
                  alt={pkg.title}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <div className="min-w-0">
                    <p className="text-xs text-gray-500">Package Price</p>
                    <p className="text-2xl font-bold text-[#B8891B]">
                      {pkg.price || "—"}
                    </p>
                  </div>
                  <span className="inline-flex px-3 py-1 rounded-full text-xs font-semibold bg-[#C9A227]/15 text-[#9A7416] border border-[#C9A227]/25">
                    {pkg.badge || pkg.duration || "Package"}
                  </span>
                </div>

                <div className="mt-3 flex items-center gap-2 text-sm text-gray-700">
                  <Calendar className="w-4 h-4 text-[#C9A227]" />
                  <span className="font-semibold">Duration:</span>
                  <span>{pkg.duration || "—"}</span>
                </div>

                {services.length ? (
                  <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {services.slice(0, 4).map((h, idx) => {
                      const Icon = h.Icon;
                      return (
                        <div
                          key={idx}
                          className="flex items-center gap-2 rounded-xl border border-gray-200 bg-gray-50 px-3 py-2"
                        >
                          <Icon className="w-4 h-4 text-[#C9A227] shrink-0" />
                          <span className="text-sm text-gray-700 truncate">
                            {h.label}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                ) : null}
              </div>
            </div>

            <div className="mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Package Details</h3>
              <p className="text-gray-600 leading-relaxed mb-6">
                Experience the journey of a lifetime with our carefully curated package. 
                This comprehensive Umrah package includes everything you need for a spiritual 
                and comfortable pilgrimage to the holy cities of Makkah and Madinah.
              </p>
            </div>

            <div className="mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">What's Included</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[...services.map((s) => ({ icon: s.Icon, text: s.label })), ...highlights].map(
                  (highlight, idx) => {
                    const Icon = highlight.icon;
                  return (
                  <div
                    key={idx}
                    className="flex items-center gap-3 bg-gradient-to-r from-[#C9A227]/5 to-[#DAB83D]/5 p-4 rounded-xl border border-[#C9A227]/20"
                  >
                    <Icon className="w-5 h-5 text-[#C9A227] flex-shrink-0" />
                    <span className="text-gray-700 font-medium">{highlight.text}</span>
                  </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Footer (like dashboard modal) */}
        <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-end gap-2 bg-white">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-sm font-semibold text-gray-700 hover:bg-black/5 hover:scale-105 transition"
          >
            Close
          </button>
          <button
            type="button"
            disabled={booking}
            onClick={() => setConfirmOpen(true)}
            className="px-5 py-2 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-[#C9A227] to-[#DAB83D] hover:opacity-95 disabled:opacity-60"
          >
            {booking ? "Adding…" : "Book now"}
          </button>
        </div>
        </div>

      {confirmOpen ? (
        <div
          className="fixed inset-0 z-[100001] bg-black/50 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => (booking ? null : setConfirmOpen(false))}
        >
          <div
            className="w-full max-w-md rounded-2xl bg-white border border-gray-200 shadow-[0_18px_60px_rgba(0,0,0,0.22)] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="px-5 py-4 border-b border-gray-100">
              <h4 className="text-base font-semibold text-gray-900">
                Confirm booking
              </h4>
              <p className="text-sm text-gray-600 mt-1">
                Are you sure you want to book{" "}
                <span className="font-semibold text-gray-900">{pkg.title}</span>?
              </p>
            </div>
            <div className="px-5 py-4 flex items-center justify-end gap-2 bg-white">
              <button
                type="button"
                disabled={booking}
                onClick={() => setConfirmOpen(false)}
                className="px-4 py-2 rounded-xl text-sm font-semibold text-gray-700 hover:bg-black/5 disabled:opacity-60"
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
                className="px-5 py-2 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-[#C9A227] to-[#DAB83D] hover:opacity-95 disabled:opacity-60"
              >
                {booking ? "Adding…" : "Yes, book it"}
              </button>
            </div>
          </div>
        </div>
      ) : null}

      <style jsx global>{`
        @keyframes overlay-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-overlay-in {
          animation: overlay-in 0.18s ease-out;
        }

        @keyframes modal-in {
          from {
            opacity: 0;
            transform: translateY(14px) scale(0.97);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        .animate-modal-in {
          animation: modal-in 0.22s ease-out;
        }
      `}</style>
      </div>
    </div>
  );
}

function PackageCard({ pkg }) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [booking, setBooking] = useState(false);
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
        onClick={() => setIsDialogOpen(true)}
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
  const keepScrollYRef = useRef(null);

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

  useEffect(() => {
    if (!expanded) return;
    const y = keepScrollYRef.current;
    if (typeof y !== "number") return;
    keepScrollYRef.current = null;
    // Prevent the browser from "jumping" when the grid expands.
    requestAnimationFrame(() => {
      window.scrollTo({ top: y, left: 0, behavior: "auto" });
    });
  }, [expanded]);

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
                  keepScrollYRef.current = window.scrollY;
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