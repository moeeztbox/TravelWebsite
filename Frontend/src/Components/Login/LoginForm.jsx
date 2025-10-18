import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import { motion } from "framer-motion";

function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [focused, setFocused] = useState({});

  const handleFocus = (field) => setFocused({ ...focused, [field]: true });
  const handleBlur = (field) => setFocused({ ...focused, [field]: false });

  return (
    <div className="flex items-center justify-center w-full">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="bg-white rounded-2xl shadow-2xl p-6 sm:p-8 md:p-10 w-full max-w-md sm:max-w-lg md:max-w-xl mt-10 md:mt-24"
      >
        {/* 🔐 Login Form */}
        <form className="space-y-4 sm:space-y-6">
          {/* Email */}
          <div>
            <label className="flex items-center gap-2 text-gray-700 font-semibold mb-2 text-sm sm:text-base">
              <Mail className="w-4 h-4 text-yellow-600" /> Email
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              onFocus={() => handleFocus("email")}
              onBlur={() => handleBlur("email")}
              className={`w-full rounded-lg border-2 ${
                focused.email ? "border-yellow-600" : "border-gray-300"
              } px-3 sm:px-4 py-2 text-sm sm:text-base focus:outline-none focus:ring-yellow-600 transition-all duration-300`}
            />
          </div>

          {/* Password */}
          <div>
            <label className="flex items-center gap-2 text-gray-700 font-semibold mb-2 text-sm sm:text-base">
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
                } px-3 sm:px-4 py-2 pr-10 text-sm sm:text-base focus:outline-none focus:ring-yellow-600 transition-all duration-300`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-yellow-600"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>
        </form>

        {/* Buttons */}
        <div className="text-center mt-5 sm:mt-6">
          <p className="text-gray-600 mb-3 sm:mb-4 text-sm sm:text-base">
            Don’t have an account?{" "}
            <Link
              to="/registration"
              className="text-yellow-600 font-semibold hover:underline"
            >
              Register
            </Link>
          </p>

          <button
            type="submit"
            className="bg-yellow-600 hover:bg-yellow-500 text-white font-bold py-2 sm:py-3 px-8 sm:px-10 rounded-full shadow-lg text-sm sm:text-base transition duration-300"
          >
            Login
          </button>
        </div>
      </motion.div>
    </div>
  );
}

export default LoginForm;
