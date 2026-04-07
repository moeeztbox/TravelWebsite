import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { usePackageBooking } from "../../hooks/usePackageBooking";
import { fetchPackages } from "../../services/packageService";
import { iconForHighlightKey } from "../../constants/packageHighlightIcons";
import {
  Calendar,
  ArrowRight,
} from "lucide-react";

function mapApiToCardPackage(p) {
  return {
    ...p,
    highlights: (p.highlights || []).map((h) => ({
      icon: iconForHighlightKey(h.iconKey),
      text: h.text,
    })),
  };
}

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const SectionHeader = () => (
  <motion.div
    className="text-center mb-16"
    variants={fadeInUp}
    initial="hidden"
    whileInView="visible"
    transition={{ duration: 0.6 }}
    viewport={{ once: true }}
  >
    <h2 className="text-3xl md:text-5xl font-bold leading-tight mb-4 text-gray-900">
      Featured <span className="text-[#C9A227]">Packages</span>
    </h2>

    <div className="flex items-center justify-center gap-4 mb-6">
      <div className="h-px bg-gradient-to-r from-transparent via-[#C9A227] to-transparent w-24" />
      <div className="w-1.5 h-1.5 bg-[#C9A227] rounded-full" />
      <div className="h-px bg-gradient-to-r from-transparent via-[#C9A227] to-transparent w-24" />
    </div>

    <p className="text-gray-600 text-lg max-w-2xl mx-auto">
      Elite Umrah Packages for every pilgrim&apos;s sacred journey
    </p>
  </motion.div>
);

const PackageCard = ({ pkg, onBook }) => {
  return (
    <motion.div
      className="group relative h-full"
      variants={fadeInUp}
      transition={{ duration: 0.5 }}
    >
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl border border-gray-100 hover:border-[#C9A227]/30 transition-all duration-500 hover:scale-101 h-full">
        <div className="relative h-48 overflow-hidden">
          <img
            src={pkg.image}
            alt={pkg.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
          <div className="absolute top-3 left-3">
            <span className="bg-gradient-to-r from-[#C9A227] to-[#DAB83D] text-white px-2.5 py-0.5 rounded-full text-xs font-semibold shadow-lg">
              {pkg.badge}
            </span>
          </div>
        </div>

        <div className="p-5 bg-gradient-to-b from-white to-[#C9A227]/5 flex flex-col h-[calc(100%-12rem)]">
          <div className="mb-3">
            <h3 className="text-lg font-bold text-gray-900 mb-0.5">
              {pkg.title}
            </h3>
            <p className="text-xs font-medium">{pkg.subtitle}</p>
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

          <div className="grid grid-cols-1 gap-1.5 mb-4 text-sm flex-grow">
            {pkg.highlights.slice(0, 2).map((highlight, idx) => {
              const Icon = highlight.icon;
              return (
                <div
                  key={idx}
                  className="flex items-center gap-2 text-gray-600"
                >
                  <Icon className="w-4 h-4 text-[#C9A227] flex-shrink-0" />
                  <span>{highlight.text}</span>
                </div>
              );
            })}
          </div>

          <motion.button
            type="button"
            className="w-full bg-gradient-to-r from-[#C9A227] to-[#DAB83D] text-white font-semibold py-3 px-5 rounded-lg text-sm md:text-base transition-all duration-300 flex items-center justify-center gap-2 shadow-md hover:shadow-lg mt-auto"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            onClick={(e) => {
              e.stopPropagation();
              onBook?.(pkg);
            }}
          >
            <span>Book Now</span>
            <ArrowRight className="w-4 h-4" />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

const CustomPackageCTA = () => (
  <motion.div
    className="text-center mt-10"
    variants={fadeInUp}
    initial="hidden"
    whileInView="visible"
    transition={{ duration: 0.6 }}
    viewport={{ once: true }}
  >
    <p className="text-gray-600 mb-6 text-lg">
      Need a Customize Package? We&apos;re here to help create your Perfect
      Journey.
    </p>
    <motion.button
      className="bg-gradient-to-r from-white to-[#C9A227]/10 border-2 border-[#C9A227] text-[#C9A227] hover:bg-gradient-to-r hover:from-[#C9A227] hover:to-[#DAB83D] hover:text-white hover:border-[#DAB83D] px-8 py-3 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      Request Customize Package
    </motion.button>
  </motion.div>
);

const FeaturedPackages = () => {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(null);
  const { bookPackage } = usePackageBooking();

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const raw = await fetchPackages();
        if (!cancelled) {
          setPackages((raw || []).map(mapApiToCardPackage));
          setLoadError(null);
        }
      } catch (e) {
        if (!cancelled) {
          setLoadError(e?.message || "Could not load packages");
          setPackages([]);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <section className="relative bg-white overflow-hidden">
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, rgba(201,162,39,0.12) 1px, transparent 0)`,
          backgroundSize: "60px 60px",
        }}
      />

      <div className="absolute inset-0 bg-gradient-to-b from-white via-transparent to-white opacity-50" />

      <div className="py-12 md:py-16 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader />

          {loadError ? (
            <p className="text-center text-red-600 text-sm mb-6">{loadError}</p>
          ) : null}

          {loading ? (
            <p className="text-center text-gray-500 py-12">Loading packages…</p>
          ) : (
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {packages.map((pkg) => (
                <PackageCard
                  key={pkg.packageId || pkg._id}
                  pkg={pkg}
                  onBook={bookPackage}
                />
              ))}
            </motion.div>
          )}

          <CustomPackageCTA />
        </div>
      </div>
    </section>
  );
};

export default FeaturedPackages;
