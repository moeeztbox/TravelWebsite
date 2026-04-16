import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  Eye,
  EyeOff,
  User,
  Mail,
  MapPin,
  Globe,
  Home,
  Lock,
} from "lucide-react";
import { motion } from "framer-motion";
import { register } from "../../Services/authService";
import { useAuth } from "../../Context/AuthContext";

function getErrorMessage(error) {
  const data = error.response?.data;
  if (data?.message) return data.message;
  if (Array.isArray(data?.errors) && data.errors[0]?.msg) {
    return data.errors[0].msg;
  }
  return "Something went wrong. Please try again.";
}

function RegistrationForm() {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated, ready } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [focused, setFocused] = useState({});
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    country: "",
    city: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!ready || !isAuthenticated) return;
    navigate("/", { replace: true });
  }, [ready, isAuthenticated, navigate]);

  const handleFocus = (field) => setFocused({ ...focused, [field]: true });
  const handleBlur = (field) => setFocused({ ...focused, [field]: false });

  const update =
    (field) =>
    (e) =>
      setForm((f) => ({ ...f, [field]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    setLoading(true);
    try {
      const payload = {
        firstName: form.firstName.trim(),
        lastName: form.lastName.trim(),
        email: form.email.trim(),
        password: form.password,
        confirmPassword: form.confirmPassword,
        address: form.address.trim(),
        country: form.country.trim(),
        city: form.city.trim(),
      };
      await register(payload);
      navigate("/login", {
        replace: true,
        state: {
          from: location.state?.from,
          email: form.email.trim(),
          registered: true,
        },
      });
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
        className="bg-white rounded-2xl shadow-2xl p-6 sm:p-8 md:p-10 w-full max-w-md sm:max-w-lg md:max-w-2xl mt-10 md:mt-24"
      >
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 md:gap-5"
        >
          {error ? (
            <div className="md:col-span-2">
              <p
                className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2"
                role="alert"
              >
                {error}
              </p>
            </div>
          ) : null}

          {[
            { label: "First Name", icon: User, field: "firstName" },
            { label: "Last Name", icon: User, field: "lastName" },
          ].map(({ label, icon: Icon, field }) => (
            <div key={field}>
              <label className="flex items-center gap-2 text-gray-700 font-semibold mb-2 text-sm sm:text-base">
                <Icon className="w-4 h-4 text-yellow-600" /> {label}
              </label>
              <input
                type="text"
                required
                minLength={3}
                pattern=".*[A-Za-z].*"
                title="Name must be at least 3 characters and contain letters"
                value={form[field]}
                onChange={update(field)}
                placeholder={`Enter your ${label.toLowerCase()}`}
                onFocus={() => handleFocus(field)}
                onBlur={() => handleBlur(field)}
                className={`w-full rounded-lg border-2 ${
                  focused[field] ? "border-yellow-600" : "border-gray-300"
                } px-3 sm:px-4 py-2 text-sm sm:text-base focus:outline-none focus:ring-yellow-600 transition-all duration-300`}
              />
            </div>
          ))}

          <div className="md:col-span-2">
            <label className="flex items-center gap-2 text-gray-700 font-semibold mb-2 text-sm sm:text-base">
              <Mail className="w-4 h-4 text-yellow-600" /> Email
            </label>
            <input
              type="email"
              name="email"
              autoComplete="email"
              required
              value={form.email}
              onChange={update("email")}
              placeholder="Enter your email"
              onFocus={() => handleFocus("email")}
              onBlur={() => handleBlur("email")}
              className={`w-full rounded-lg border-2 ${
                focused.email ? "border-yellow-600" : "border-gray-300"
              } px-3 sm:px-4 py-2 text-sm sm:text-base focus:outline-none focus:ring-yellow-600 transition-all duration-300`}
            />
          </div>

          <div className="md:col-span-2">
            <label className="flex items-center gap-2 text-gray-700 font-semibold mb-2 text-sm sm:text-base">
              <Home className="w-4 h-4 text-yellow-600" /> Address
            </label>
            <input
              type="text"
              value={form.address}
              onChange={update("address")}
              placeholder="Enter your address"
              onFocus={() => handleFocus("address")}
              onBlur={() => handleBlur("address")}
              className={`w-full rounded-lg border-2 ${
                focused.address ? "border-yellow-600" : "border-gray-300"
              } px-3 sm:px-4 py-2 text-sm sm:text-base focus:outline-none focus:ring-yellow-600 transition-all duration-300`}
            />
          </div>

          <div>
            <label className="flex items-center gap-2 text-gray-700 font-semibold mb-2 text-sm sm:text-base">
              <Globe className="w-4 h-4 text-yellow-600" /> Country
            </label>
            <input
              type="text"
              value={form.country}
              onChange={update("country")}
              placeholder="Enter your country"
              onFocus={() => handleFocus("country")}
              onBlur={() => handleBlur("country")}
              className={`w-full rounded-lg border-2 ${
                focused.country ? "border-yellow-600" : "border-gray-300"
              } px-3 sm:px-4 py-2 text-sm sm:text-base focus:outline-none focus:ring-yellow-600 transition-all duration-300`}
            />
          </div>

          <div>
            <label className="flex items-center gap-2 text-gray-700 font-semibold mb-2 text-sm sm:text-base">
              <MapPin className="w-4 h-4 text-yellow-600" /> City
            </label>
            <input
              type="text"
              value={form.city}
              onChange={update("city")}
              placeholder="Enter your city"
              onFocus={() => handleFocus("city")}
              onBlur={() => handleBlur("city")}
              className={`w-full rounded-lg border-2 ${
                focused.city ? "border-yellow-600" : "border-gray-300"
              } px-3 sm:px-4 py-2 text-sm sm:text-base focus:outline-none focus:ring-yellow-600 transition-all duration-300`}
            />
          </div>

          {[
            { field: "password", label: "Password", auto: "new-password" },
            {
              field: "confirmPassword",
              label: "Confirm Password",
              auto: "new-password",
            },
          ].map(({ field, label, auto }) => (
            <div className="md:col-span-2" key={field}>
              <label className="flex items-center gap-2 text-gray-700 font-semibold mb-2 text-sm sm:text-base">
                <Lock className="w-4 h-4 text-yellow-600" /> {label}
              </label>
              <div className="relative">
                <input
                  type={
                    field === "password"
                      ? showPassword
                        ? "text"
                        : "password"
                      : showConfirmPassword
                        ? "text"
                        : "password"
                  }
                  required={field === "password" || field === "confirmPassword"}
                  autoComplete={auto}
                  value={form[field]}
                  onChange={update(field)}
                  placeholder={
                    field === "password"
                      ? "Enter your password"
                      : "Re-enter your password"
                  }
                  onFocus={() => handleFocus(field)}
                  onBlur={() => handleBlur(field)}
                  className={`w-full rounded-lg border-2 ${
                    focused[field] ? "border-yellow-600" : "border-gray-300"
                  } px-3 sm:px-4 py-2 pr-10 text-sm sm:text-base focus:outline-none focus:ring-yellow-600 transition-all duration-300`}
                />
                <button
                  type="button"
                  onClick={() =>
                    field === "password"
                      ? setShowPassword(!showPassword)
                      : setShowConfirmPassword(!showConfirmPassword)
                  }
                  className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-yellow-600"
                  aria-label={
                    field === "password"
                      ? showPassword
                        ? "Hide password"
                        : "Show password"
                      : showConfirmPassword
                        ? "Hide confirm password"
                        : "Show confirm password"
                  }
                >
                  {field === "password"
                    ? showPassword
                      ? <EyeOff size={18} />
                      : <Eye size={18} />
                    : showConfirmPassword
                      ? <EyeOff size={18} />
                      : <Eye size={18} />}
                </button>
              </div>
            </div>
          ))}

          <div className="md:col-span-2 text-center mt-2 sm:mt-4">
            <p className="text-gray-600 mb-3 sm:mb-4 text-sm sm:text-base">
              Already have an account?{" "}
              <Link
                to="/login"
                state={{ from: location.state?.from }}
                className="text-yellow-600 font-semibold hover:underline"
              >
                Login
              </Link>
            </p>

            <button
              type="submit"
              disabled={loading}
              className="bg-yellow-600 hover:bg-yellow-500 disabled:opacity-60 disabled:cursor-not-allowed text-white font-bold py-2 sm:py-3 px-8 sm:px-10 rounded-full shadow-lg text-sm sm:text-base transition duration-300"
            >
              {loading ? "Creating account…" : "Register"}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}

export default RegistrationForm;
