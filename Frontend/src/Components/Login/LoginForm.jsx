import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import { motion } from "framer-motion";
import { login } from "../../Services/authService";
import { useAuth } from "../../Context/AuthContext";

function getErrorMessage(error) {
  const data = error.response?.data;
  if (data?.message) return data.message;
  if (Array.isArray(data?.errors) && data.errors[0]?.msg) {
    return data.errors[0].msg;
  }
  return "Something went wrong. Please try again.";
}

function LoginForm() {
  const navigate = useNavigate();
  const location = useLocation();
  const { signIn, isAuthenticated, ready, user } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [focused, setFocused] = useState({});
  const [email, setEmail] = useState(() => location.state?.email ?? "");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (location.state?.email) setEmail(location.state.email);
  }, [location.state?.email]);

  useEffect(() => {
    if (!ready || !isAuthenticated) return;
    const from = location.state?.from;
    const target =
      from && typeof from === "object" && from.pathname
        ? from.pathname
        : "/";
    navigate(target, { replace: true });
  }, [ready, isAuthenticated, navigate, location.state?.from]);

  const handleFocus = (field) => setFocused({ ...focused, [field]: true });
  const handleBlur = (field) => setFocused({ ...focused, [field]: false });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const data = await login({ email: email.trim(), password });
      signIn(data.token, data.user);
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center w-full">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="bg-white rounded-2xl shadow-2xl p-6 sm:p-8 md:p-10 w-full max-w-md sm:max-w-lg md:max-w-xl mt-10 md:mt-24"
      >
        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
          {location.state?.registered ? (
            <p className="text-sm text-green-700 bg-green-50 border border-green-200 rounded-lg px-3 py-2">
              Account created. Sign in with your email and password.
            </p>
          ) : null}
          {error ? (
            <p
              className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2"
              role="alert"
            >
              {error}
            </p>
          ) : null}

          <div>
            <label className="flex items-center gap-2 text-gray-700 font-semibold mb-2 text-sm sm:text-base">
              <Mail className="w-4 h-4 text-yellow-600" /> Email
            </label>
            <input
              type="email"
              name="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              onFocus={() => handleFocus("email")}
              onBlur={() => handleBlur("email")}
              className={`w-full rounded-lg border-2 ${
                focused.email ? "border-yellow-600" : "border-gray-300"
              } px-3 sm:px-4 py-2 text-sm sm:text-base focus:outline-none focus:ring-yellow-600 transition-all duration-300`}
            />
          </div>

          <div>
            <label className="flex items-center gap-2 text-gray-700 font-semibold mb-2 text-sm sm:text-base">
              <Lock className="w-4 h-4 text-yellow-600" /> Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                onFocus={() => handleFocus("password")}
                onBlur={() => handleBlur("password")}
                className={`w-full rounded-lg border-2 ${
                  focused.password ? "border-yellow-600" : "border-gray-300"
                } px-3 sm:px-4 py-2 pr-10 text-sm sm:text-base focus:outline-none focus:ring-yellow-600 transition-all duration-300`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-yellow-600"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            <div className="text-right mt-2">
              <Link
                to="/forgot-password"
                className="text-sm text-yellow-600 font-medium hover:underline"
              >
                Forgot password?
              </Link>
            </div>
          </div>

          <div className="text-center pt-2 sm:pt-4">
            <p className="text-gray-600 mb-3 sm:mb-4 text-sm sm:text-base">
              Don’t have an account?{" "}
              <Link
                to="/register"
                state={location.state}
                className="text-yellow-600 font-semibold hover:underline"
              >
                Register
              </Link>
            </p>

            <button
              type="submit"
              disabled={loading}
              className="bg-yellow-600 hover:bg-yellow-500 disabled:opacity-60 disabled:cursor-not-allowed text-white font-bold py-2 sm:py-3 px-8 sm:px-10 rounded-full shadow-lg text-sm sm:text-base transition duration-300"
            >
              {loading ? "Signing in…" : "Login"}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}

export default LoginForm;
