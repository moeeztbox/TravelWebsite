import React, { useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Lock, Eye, EyeOff, ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import { resetPassword, formatAxiosError } from "../Services/authService";
import RegisterBg from "../Assets/Images/RegisterImage/register.png";

function getErrorMessage(error) {
  const data = error.response?.data;
  if (data?.message) return data.message;
  if (Array.isArray(data?.errors) && data.errors[0]?.msg) {
    return data.errors[0].msg;
  }
  return formatAxiosError(error);
}

export default function ResetPassword() {
  const [searchParams] = useSearchParams();
  const token = useMemo(() => searchParams.get("token") || "", [searchParams]);

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }
    setLoading(true);
    try {
      await resetPassword({ token, password, confirmPassword });
      setDone(true);
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  const missingToken = !token;

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `linear-gradient(135deg, 
            rgba(0, 0, 0, 0.85) 0%, 
            rgba(0, 0, 0, 0.75) 50%, 
            rgba(0, 0, 0, 0.9) 100%), 
            url(${RegisterBg})`,
        }}
      />

      <div className="relative z-10 w-full max-w-lg px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-2xl shadow-2xl p-6 sm:p-10"
        >
          <Link
            to="/login"
            className="inline-flex items-center gap-2 text-sm text-yellow-700 hover:text-yellow-600 mb-6 font-medium"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to login
          </Link>

          <h1 className="text-2xl font-bold text-gray-900 mb-2">Set new password</h1>
          <p className="text-sm text-gray-600 mb-6">
            Choose a new password for your account. The link from your email is valid for one hour.
          </p>

          {missingToken ? (
            <div
              className="text-sm text-amber-900 bg-amber-50 border border-amber-200 rounded-lg px-4 py-3"
              role="alert"
            >
              This page needs a valid reset link. Open the link from your email, or{" "}
              <Link to="/forgot-password" className="font-semibold underline">
                request a new reset
              </Link>
              .
            </div>
          ) : done ? (
            <div
              className="text-sm text-green-800 bg-green-50 border border-green-200 rounded-lg px-4 py-3"
              role="status"
            >
              Password updated. You can sign in with your new password.
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              {error ? (
                <p
                  className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2"
                  role="alert"
                >
                  {error}
                </p>
              ) : null}

              <div>
                <label className="flex items-center gap-2 text-gray-700 font-semibold mb-2 text-sm">
                  <Lock className="w-4 h-4 text-yellow-600" /> New password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    autoComplete="new-password"
                    required
                    minLength={6}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="At least 6 characters"
                    className="w-full rounded-lg border-2 border-gray-300 px-4 py-2 pr-10 text-sm focus:outline-none focus:border-yellow-600"
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
              </div>

              <div>
                <label className="flex items-center gap-2 text-gray-700 font-semibold mb-2 text-sm">
                  <Lock className="w-4 h-4 text-yellow-600" /> Confirm password
                </label>
                <input
                  type={showPassword ? "text" : "password"}
                  name="confirmPassword"
                  autoComplete="new-password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Repeat new password"
                  className="w-full rounded-lg border-2 border-gray-300 px-4 py-2 text-sm focus:outline-none focus:border-yellow-600"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-yellow-600 hover:bg-yellow-500 disabled:opacity-60 disabled:cursor-not-allowed text-white font-bold py-3 rounded-full shadow-lg text-sm transition duration-300"
              >
                {loading ? "Updating…" : "Update password"}
              </button>
            </form>
          )}

          {done ? (
            <div className="mt-6 text-center">
              <Link
                to="/login"
                className="inline-flex items-center justify-center text-yellow-700 font-semibold hover:underline"
              >
                Go to login
              </Link>
            </div>
          ) : null}
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 right-0">
        <div className="h-1 bg-gradient-to-r from-yellow-600 via-yellow-500 to-transparent opacity-70" />
      </div>
    </section>
  );
}
