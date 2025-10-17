import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Home } from "lucide-react"; // 🏠 Home icon

function NotFoundPageAlternative() {
  return (
    <div className="relative flex h-screen flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-yellow-600 via-blue-700 to-gray-900 text-white">
      {/* Floating Animated Background Circles */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 0.3, scale: [1, 1.5, 1] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 left-1/3 h-72 w-72 rounded-full bg-yellow-500 blur-3xl"
        />
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 0.3, scale: [1, 1.4, 1] }}
          transition={{
            duration: 12,
            repeat: Infinity,
            delay: 2,
            ease: "easeInOut",
          }}
          className="absolute bottom-1/3 right-1/3 h-80 w-80 rounded-full bg-blue-500 blur-3xl"
        />
      </div>

      {/* Main Content */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 text-center px-6"
      >
        <h1 className="text-[140px] font-extrabold leading-none sm:text-[180px] md:text-[200px] text-yellow-400 drop-shadow-[0_0_25px_rgba(234,179,8,0.4)]">
          404
        </h1>
        <h2 className="text-3xl font-semibold text-gray-100 sm:text-4xl">
          Oops! Page Not Found
        </h2>
        <p className="mt-3 text-gray-300 max-w-md mx-auto">
          The page you’re looking for might have been removed, had its name
          changed, or is temporarily unavailable.
        </p>

        {/* Button with Home Icon */}
        <Link
          to="/"
          className="mt-6 inline-flex items-center gap-2 rounded-full bg-yellow-500 px-8 py-3 text-base font-semibold text-gray-900 shadow-lg transition hover:bg-yellow-400 hover:scale-[1.02]"
        >
          <Home className="w-5 h-5" />
          Go Back Home
        </Link>
      </motion.div>

      {/* Floating decorative shapes */}
      <motion.div
        className="absolute top-10 left-10 text-6xl text-yellow-400 opacity-20"
        animate={{ y: [0, -15, 0] }}
        transition={{ duration: 4, repeat: Infinity }}
      >
        ★
      </motion.div>
      <motion.div
        className="absolute bottom-16 right-12 text-5xl text-blue-400 opacity-20"
        animate={{ y: [0, 20, 0] }}
        transition={{ duration: 5, repeat: Infinity }}
      >
        ✦
      </motion.div>
    </div>
  );
}

export default NotFoundPageAlternative;
