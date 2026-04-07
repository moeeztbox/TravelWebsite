import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Lock, Mail, LogIn, Eye, EyeOff } from "lucide-react";
import {
  adminLogin,
  getStoredAdminToken,
  setAdminSession,
} from "../services/adminService";
import { formatAxiosError } from "../Services/authService";

/** Masjid al-Haram / Kaaba area — dark overlay keeps text readable */
const HERO_IMAGE =
  "https://images.unsplash.com/photo-1591604129939-f1efa4c7e54c?q=80&w=2070&auto=format&fit=crop";

export default function AdminLogin() {
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState("admin@gmail.com");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (getStoredAdminToken()) {
      navigate("/admin/packages", { replace: true });
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const data = await adminLogin({
        email: email.trim(),
        password,
      });
      setAdminSession(data.token, data.admin);
      const to = location.state?.from || "/admin/packages";
      navigate(to, { replace: true });
    } catch (err) {
      setError(formatAxiosError(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* Left: hero + branding */}
      <div
        className="relative lg:w-[46%] min-h-[38vh] lg:min-h-screen flex flex-col justify-center px-8 py-12 lg:px-14 xl:px-20 bg-zinc-900 bg-cover bg-center"
        style={{ backgroundImage: `url(${HERO_IMAGE})` }}
      >
        <div className="absolute inset-0 bg-black/65" aria-hidden />
        <div className="relative z-10 max-w-lg">
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-400/20 border border-amber-400/40 text-amber-300 mb-6">
            <LogIn className="h-6 w-6" strokeWidth={2} />
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-[2.5rem] font-bold leading-tight tracking-tight text-white">
            Welcome{" "}
            <span className="text-amber-400">Back</span>
          </h1>
          <p className="mt-4 text-base text-white/90 leading-relaxed">
            Sign in to the admin console to manage travel packages, update
            listings, and keep your site in sync with your database — all in
            one place.
          </p>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center px-4 py-10 lg:py-16 bg-[#f4f5f7] lg:bg-white">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-zinc-200/80 p-8 sm:p-10">
          <div className="text-center mb-8">
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-[#FF2D55] text-white font-bold text-lg mb-3 shadow-sm">
              T
            </div>
            <h2 className="text-xl font-semibold text-zinc-900">
              Admin sign in
            </h2>
            <p className="text-sm text-zinc-500 mt-1">
              Manage packages for your travel site
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {error ? (
              <p
                className="text-sm text-red-700 bg-red-50 border border-red-200 rounded-xl px-3 py-2.5"
                role="alert"
              >
                {error}
              </p>
            ) : null}

            <div>
              <label className="flex items-center gap-2 text-xs font-medium text-amber-700/90 mb-2">
                <Mail className="h-3.5 w-3.5 text-amber-600" />
                Email
              </label>
              <input
                type="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200/90 text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-amber-400/40 focus:border-amber-400 transition-shadow"
                placeholder="you@example.com"
                required
              />
            </div>

            <div>
              <label className="flex items-center gap-2 text-xs font-medium text-amber-700/90 mb-2">
                <Lock className="h-3.5 w-3.5 text-amber-600" />
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-4 pr-12 py-3 rounded-xl bg-slate-50 border border-slate-200/90 text-sm text-zinc-900 focus:outline-none focus:ring-2 focus:ring-amber-400/40 focus:border-amber-400 transition-shadow"
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((s) => !s)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 rounded-lg text-zinc-400 hover:text-zinc-600 hover:bg-zinc-100"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>

            <p className="text-center text-sm text-zinc-600">
              <Link
                to="/"
                className="text-amber-600 font-medium hover:text-amber-700 hover:underline"
              >
                Back to website
              </Link>
            </p>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 text-white text-sm font-semibold shadow-md hover:from-amber-600 hover:to-amber-700 disabled:opacity-60 transition-all"
            >
              {loading ? "Signing in…" : "Login"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
