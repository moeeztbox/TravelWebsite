import React, { useEffect, useMemo, useState } from "react";
import {
  Facebook,
  Instagram,
  Linkedin,
  Twitter,
  MapPin,
  Phone,
  Mail,
  ArrowUpRight,
  Send,
} from "lucide-react";
import { Link as RouterLink } from "react-router-dom";
import {
  newsletterStatus,
  subscribeNewsletter,
  unsubscribeNewsletter,
} from "../../Services/newsletterService";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [checking, setChecking] = useState(false);
  const [busy, setBusy] = useState(false);
  const [note, setNote] = useState("");

  const normalizedEmail = useMemo(() => String(email || "").trim(), [email]);

  useEffect(() => {
    let alive = true;
    const run = async () => {
      setNote("");
      if (!normalizedEmail) {
        setSubscribed(false);
        return;
      }
      // lightweight validation; backend does strict validation
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail)) {
        setSubscribed(false);
        return;
      }
      setChecking(true);
      try {
        const s = await newsletterStatus(normalizedEmail);
        if (!alive) return;
        setSubscribed(Boolean(s?.subscribed));
      } catch {
        if (!alive) return;
        setSubscribed(false);
      } finally {
        if (alive) setChecking(false);
      }
    };
    const t = window.setTimeout(run, 350);
    return () => {
      alive = false;
      window.clearTimeout(t);
    };
  }, [normalizedEmail]);

  const handleSubscribe = async (e) => {
    e?.preventDefault?.();
    setNote("");
    if (!normalizedEmail) return;
    setBusy(true);
    try {
      const r = await subscribeNewsletter(normalizedEmail);
      setSubscribed(true);
      setNote(
        r?.alreadySubscribed
          ? "You are already subscribed."
          : "Subscribed! Check your inbox for updates."
      );
    } catch (err) {
      setNote(err?.response?.data?.message || "Could not subscribe");
    } finally {
      setBusy(false);
    }
  };

  const handleUnsubscribe = async (e) => {
    e?.preventDefault?.();
    setNote("");
    if (!normalizedEmail) return;
    setBusy(true);
    try {
      await unsubscribeNewsletter(normalizedEmail);
      setSubscribed(false);
      setNote("Unsubscribed.");
    } catch (err) {
      setNote(err?.response?.data?.message || "Could not unsubscribe");
    } finally {
      setBusy(false);
    }
  };

  const socialLinks = [
    { icon: Facebook, href: "#", label: "Facebook" },
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: Linkedin, href: "#", label: "LinkedIn" },
    { icon: Twitter, href: "#", label: "Twitter" },
  ];

  const quickLinks = [
    { to: "/", label: "Home" },
    { to: "/about-us", label: "About Us" },
    { to: "/contact-us", label: "Contact" },
    { to: "/packages", label: "Packages" },
    { to: "/faq", label: "FAQ's" },
  ];

  const services = [
    { to: "/packages", label: "Umrah Packages" },
    { to: { pathname: "/booking", search: "?tab=transport" }, label: "Transportation" },
    { to: { pathname: "/booking", search: "?tab=visa" }, label: "Visa Processing" },
    { to: { pathname: "/booking", search: "?tab=hotels" }, label: "International Tours" },
    { to: { pathname: "/booking", search: "?tab=flights" }, label: "Air Ticketing" },
  ];

  return (
    <footer className="bg-gradient-to-b from-gray-900 via-gray-800 to-black text-gray-300 relative overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255,255,255,0.1) 1px, transparent 0)`,
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />

      {/* Gentle sparkles */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute top-[15%] left-[10%] w-1 h-1 bg-blue-300 rounded-full animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute top-[35%] left-[80%] w-1 h-1 bg-yellow-300 rounded-full animate-pulse"
          style={{ animationDelay: "3s" }}
        ></div>
        <div
          className="absolute top-[60%] left-[20%] w-1 h-1 bg-blue-300 rounded-full animate-pulse"
          style={{ animationDelay: "5s" }}
        ></div>
        <div
          className="absolute bottom-[25%] right-[15%] w-1 h-1 bg-yellow-300 rounded-full animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>
        <div
          className="absolute top-[25%] right-[70%] w-1 h-1 bg-blue-300 rounded-full animate-pulse"
          style={{ animationDelay: "4s" }}
        ></div>
      </div>

      {/* Newsletter Section */}
      <div className="relative border-b border-gray-700/50">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            {/* Left side - Stay Connected */}
            <div className="flex-1">
              <h3 className="text-white font-semibold text-xl mb-4">Stay Connected to Pilgrim</h3>
              <p className="text-gray-400 text-sm">Get the latest updates on packages, offers, and travel tips.</p>

              {/* Social Icons */}
              <div className="flex gap-3 mt-6">
                {socialLinks.map(({ icon: Icon, href, label }, index) => (
                  <a
                    key={label}
                    href={href}
                    className="w-10 h-10 bg-gray-700/50 backdrop-blur-sm border border-gray-600/30 rounded-full flex items-center justify-center hover:bg-gradient-to-br hover:from-blue-600/20 hover:to-yellow-500/20 hover:border-blue-400/40 transition-all duration-300 hover:scale-110"
                    aria-label={label}
                  >
                    <Icon size={16} className="text-gray-300 hover:text-white transition-colors duration-300" />
                  </a>
                ))}
              </div>
            </div>

            {/* Right side - Newsletter Subscribe */}
            <div className="flex-1 w-full md:max-w-xl">
              <h3 className="text-white font-semibold text-xl mb-4">Subscribe to Our Newsletter</h3>
              <div className="relative">
                <div className="relative group">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="w-full px-6 py-3.5 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full text-white placeholder-gray-500 focus:outline-none focus:bg-white/10 focus:border-blue-400/50 transition-all duration-300 pr-36"
                  />
                  <button
                    onClick={handleSubscribe}
                    disabled={busy || checking || !normalizedEmail}
                    className="absolute right-1.5 top-1/2 -translate-y-1/2 px-5 py-2 bg-blue-500 hover:bg-blue-600 text-white text-sm rounded-full font-medium transition-colors duration-200 flex items-center gap-2"
                  >
                    <span>
                      {busy ? "Please wait…" : subscribed ? "Subscribed" : "Subscribe"}
                    </span>
                    {!subscribed ? <Send size={14} /> : null}
                  </button>
                </div>
              </div>
              <div className="mt-3 px-1 flex items-center justify-between gap-3">
                <p className="text-gray-500 text-xs">
                We respect your privacy. Unsubscribe at any time.
                </p>
                {subscribed ? (
                  <button
                    type="button"
                    onClick={handleUnsubscribe}
                    disabled={busy}
                    className="text-xs font-semibold text-gray-200 hover:text-white underline underline-offset-4"
                  >
                    Unsubscribe
                  </button>
                ) : null}
              </div>
              {note ? (
                <p className="text-xs mt-2 px-1 text-gray-300">{note}</p>
              ) : null}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto pt-16 px-6 pb-8 relative">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Company Info + Payment */}
          <div className="lg:col-span-1">
            <div className="mb-6">
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center p-2 hover:scale-105 transition-transform duration-300">
                  <img
                    src="https://placehold.co/48x48/FCD34D/000000?text=AB"
                    alt="Al Buraq International Logo"
                    className="w-full h-full object-contain scale-125 drop-shadow-sm rounded-full"
                  />
                </div>
                <span className="font-semibold text-white">
                  <span className="text-yellow-400 text-md">Pilgrim</span>
                </span>
              </div>
            </div>

            <p className="text-sm text-gray-400 mb-6 leading-relaxed">
              Your trusted partner for Hajj, Umrah, and Global Travel Services. Experience a journey rich with comfort, care, and excellence.
            </p>

            {/* Payment Methods */}
            <div className="flex flex-wrap gap-2 items-center">
              {[
                { key: "jazzcash", label: "JazzCash" },
                { key: "mastercard", label: "Mastercard" },
                { key: "visa", label: "Visa" },
              ].map((method) => (
                <div
                  key={method.key}
                  className="px-3 py-1 bg-gray-700/30 border border-gray-600/30 rounded text-xs text-gray-200 flex items-center justify-center"
                  style={{ width: 92, height: 34 }}
                >
                  {method.key === "jazzcash" && (
                    <img
                      src="https://iconlogovector.com/uploads/images/2025/11/lg-691c164eec616-JazzCash.webp"
                      alt="JazzCash"
                      style={{ width: 78, height: 22, objectFit: "contain" }}
                      loading="lazy"
                    />
                  )}
                  {method.key === "mastercard" && (
                    <img
                      src="https://www.pngmart.com/files/22/Mastercard-Logo-PNG-HD.png"
                      alt="Mastercard"
                      style={{ width: 78, height: 22, objectFit: "contain" }}
                      loading="lazy"
                    />
                  )}
                  {method.key === "visa" && (
                    <img
                      src="https://images.icon-icons.com/1259/PNG/512/1495815252-jd14_84583.png"
                      alt="Visa"
                      style={{ width: 78, height: 22, objectFit: "contain" }}
                      loading="lazy"
                    />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-6 text-lg">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map(({ to, label }) => (
                <li
                  key={label}
                  className="hover:translate-x-1 transition-transform duration-200"
                >
                  <RouterLink
                    to={to}
                    className="text-sm text-gray-400 hover:text-white transition-colors duration-300 flex items-center gap-2 group"
                  >
                    {label}
                    <ArrowUpRight
                      size={14}
                      className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    />
                  </RouterLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-white font-semibold mb-6 text-lg">Our Services</h3>
            <ul className="space-y-3">
              {services.map(({ to, label }) => (
                <li
                  key={label}
                  className="hover:translate-x-1 transition-transform duration-200"
                >
                  <RouterLink
                    to={to}
                    className="text-sm text-gray-400 hover:text-white transition-colors duration-300 flex items-center gap-2 group"
                  >
                    {label}
                    <ArrowUpRight
                      size={14}
                      className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    />
                  </RouterLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white font-semibold mb-6 text-lg">Contact Us</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3 text-sm text-gray-400 hover:translate-x-0.5 transition-transform duration-200">
                <MapPin size={16} className="text-blue-400 mt-0.5 flex-shrink-0" />
                <span>Pilgrim Travel & Tours pvt ltd.<br />Lahore, Pakistan</span>
              </div>

              <div className="flex items-center gap-3 text-sm text-gray-400 hover:translate-x-0.5 transition-transform duration-200">
                <Phone size={16} className="text-yellow-400 flex-shrink-0" />
                <span>+92 327 3276060</span>
              </div>

              <div className="flex items-center gap-3 text-sm text-gray-400 hover:translate-x-0.5 transition-transform duration-200">
                <Mail size={16} className="text-blue-400 flex-shrink-0" />
                <span>info@alburaqtours.com</span>
              </div>
            </div>
          </div>

          {/* Map */}
          <div>
            <h3 className="text-white font-semibold mb-6 text-lg">Our Location</h3>
            <div className="w-full h-32 md:h-40 lg:h-44 overflow-hidden rounded-lg border border-gray-700/30 backdrop-blur-sm hover:scale-105 transition-transform duration-300">
              <iframe
                title="Company Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3398.672664687032!2d74.41268219999999!3d31.5880231!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39190fe1a1fea88d%3A0x5eaa9ea9c6d3fb17!2sEhsan%20Traders!5e0!3m2!1sen!2s!4v1759326513829!5m2!1sen!2s"
                width="100%"
                height="100%"
                allowFullScreen=""
                loading="lazy"
                className="rounded-lg border-none filter contrast-90 brightness-90"
              />
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-700/50 mt-16 pt-8 text-center">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-400">
              © 2026 Pilgrim. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm text-gray-400">
              <RouterLink
                to="/policies#privacy"
                className="hover:text-white transition-colors duration-300"
              >
                Privacy Policy
              </RouterLink>
              <RouterLink
                to="/policies#refund"
                className="hover:text-white transition-colors duration-300"
              >
                Refund Policy
              </RouterLink>
              <RouterLink
                to="/policies#terms"
                className="hover:text-white transition-colors duration-300"
              >
                Terms & Conditions
              </RouterLink>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
