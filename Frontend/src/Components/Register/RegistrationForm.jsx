import React, { useState } from "react";
import { Link } from "react-router-dom";
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

function RegistrationForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [focused, setFocused] = useState({});

  const handleFocus = (field) => setFocused({ ...focused, [field]: true });
  const handleBlur = (field) => setFocused({ ...focused, [field]: false });

  return (
    <div className=" flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="bg-white rounded-2xl shadow-2xl p-10 w-full max-w-2xl mt-24"
      >
        {/* Form */}
        <form className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {/* First Name */}
          <div>
            <label className="flex items-center gap-2 text-gray-700 font-semibold mb-2">
              <User className="w-4 h-4 text-yellow-600" /> First Name
            </label>
            <input
              type="text"
              placeholder="Enter your first name"
              onFocus={() => handleFocus("firstName")}
              onBlur={() => handleBlur("firstName")}
              className={`w-full rounded-lg border-2 ${
                focused.firstName ? "border-yellow-600" : "border-gray-300"
              } px-4 py-2 focus:outline-none focus:ring-yellow-600 transition-all duration-300`}
            />
          </div>

          {/* Last Name */}
          <div>
            <label className="flex items-center gap-2 text-gray-700 font-semibold mb-2">
              <User className="w-4 h-4 text-yellow-600" /> Last Name
            </label>
            <input
              type="text"
              placeholder="Enter your last name"
              onFocus={() => handleFocus("lastName")}
              onBlur={() => handleBlur("lastName")}
              className={`w-full rounded-lg border-2 ${
                focused.lastName ? "border-yellow-600" : "border-gray-300"
              } px-4 py-2 focus:outline-none focus:ring-yellow-600 transition-all duration-300`}
            />
          </div>

          {/* Email */}
          <div className="md:col-span-2">
            <label className="flex items-center gap-2 text-gray-700 font-semibold mb-2">
              <Mail className="w-4 h-4 text-yellow-600" /> Email
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              onFocus={() => handleFocus("email")}
              onBlur={() => handleBlur("email")}
              className={`w-full rounded-lg border-2 ${
                focused.email ? "border-yellow-600" : "border-gray-300"
              } px-4 py-2 focus:outline-none focus:ring-yellow-600 transition-all duration-300`}
            />
          </div>

          {/* Address */}
          <div className="md:col-span-2">
            <label className="flex items-center gap-2 text-gray-700 font-semibold mb-2">
              <Home className="w-4 h-4 text-yellow-600" /> Address
            </label>
            <input
              type="text"
              placeholder="Enter your address"
              onFocus={() => handleFocus("address")}
              onBlur={() => handleBlur("address")}
              className={`w-full rounded-lg border-2 ${
                focused.address ? "border-yellow-600" : "border-gray-300"
              } px-4 py-2 focus:outline-none focus:ring-yellow-600 transition-all duration-300`}
            />
          </div>

          {/* Country */}
          <div>
            <label className="flex items-center gap-2 text-gray-700 font-semibold mb-2">
              <Globe className="w-4 h-4 text-yellow-600" /> Country
            </label>
            <input
              type="text"
              placeholder="Enter your country"
              onFocus={() => handleFocus("country")}
              onBlur={() => handleBlur("country")}
              className={`w-full rounded-lg border-2 ${
                focused.country ? "border-yellow-600" : "border-gray-300"
              } px-4 py-2 focus:outline-none focus:ring-yellow-600 transition-all duration-300`}
            />
          </div>

          {/* City */}
          <div>
            <label className="flex items-center gap-2 text-gray-700 font-semibold mb-2">
              <MapPin className="w-4 h-4 text-yellow-600" /> City
            </label>
            <input
              type="text"
              placeholder="Enter your city"
              onFocus={() => handleFocus("city")}
              onBlur={() => handleBlur("city")}
              className={`w-full rounded-lg border-2 ${
                focused.city ? "border-yellow-600" : "border-gray-300"
              } px-4 py-2 focus:outline-none focus:ring-yellow-600 transition-all duration-300`}
            />
          </div>

          {/* Password - Separate Line */}
          <div className="md:col-span-2">
            <label className="flex items-center gap-2 text-gray-700 font-semibold mb-2">
              <Lock className="w-4 h-4 text-yellow-600" /> Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                onFocus={() => handleFocus("password")}
                onBlur={() => handleBlur("password")}
                className={`w-full rounded-lg border-2 ${
                  focused.password ? "border-yellow-600" : "border-gray-300"
                } px-4 py-2 pr-10 focus:outline-none focus:ring-yellow-600 transition-all duration-300`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-yellow-600"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          {/* Confirm Password - Separate Line */}
          <div className="md:col-span-2">
            <label className="flex items-center gap-2 text-gray-700 font-semibold mb-2">
              <Lock className="w-4 h-4 text-yellow-600" /> Confirm Password
            </label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Re-enter your password"
                onFocus={() => handleFocus("confirmPassword")}
                onBlur={() => handleBlur("confirmPassword")}
                className={`w-full rounded-lg border-2 ${
                  focused.confirmPassword
                    ? "border-yellow-600"
                    : "border-gray-300"
                } px-4 py-2 pr-10 focus:outline-none focus:ring-yellow-600 transition-all duration-300`}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-yellow-600"
              >
                {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>
        </form>

        {/* Login & Register */}
        <div className="text-center mt-4">
          <p className="text-gray-600 mb-4">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-yellow-600 font-semibold hover:underline"
            >
              Login
            </Link>
          </p>

          <button
            type="submit"
            className="bg-yellow-600 hover:bg-yellow-500 text-white font-bold py-3 px-10 rounded-full shadow-lg transition duration-300"
          >
            Register
          </button>
        </div>
      </motion.div>
    </div>
  );
}

export default RegistrationForm;
