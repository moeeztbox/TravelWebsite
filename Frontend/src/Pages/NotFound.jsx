import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Home } from "lucide-react";

function NotFoundPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-200 p-6">
      <div className="text-center max-w-4xl mx-auto relative">
        {/* 404 Text - black with yellow-400 zero */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-8xl md:text-9xl lg:text-[160px] font-bold tracking-tight text-black leading-none mb-4"
        >
          4<span className="text-yellow-400">0</span>4
        </motion.h1>

        {/* Divider with yellow-400 dot */}
        <div className="flex items-center justify-center gap-4 my-8">
          <div className="w-12 h-px bg-gray-300"></div>
          <div className="w-2 h-2 rounded-full bg-yellow-400"></div>
          <div className="w-12 h-px bg-gray-300"></div>
        </div>

        {/* Page Not Found - in yellow-400 */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-3xl md:text-4xl font-bold text-yellow-400 mb-6"
        >
          Page Not Found
        </motion.h2>

        {/* Description - in a single line */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-gray-600 text-base md:text-lg max-w-2xl mx-auto leading-relaxed mb-10 whitespace-nowrap"
        >
          The page you're looking for doesn't exist or has been moved.
        </motion.p>

        {/* Button with black color - now with icon on the left (left to right) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-8 py-4 bg-black text-white font-medium tracking-wider uppercase text-sm hover:bg-gray-800 transition-colors duration-300"
          >
            <Home className="w-4 h-4" />
            Back to Home
          </Link>
        </motion.div>

        {/* Simple decorative elements - matching theme colors */}
        <motion.div
          className="absolute -top-10 -left-10 text-4xl text-yellow-400/20"
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        >
          ●
        </motion.div>
        <motion.div
          className="absolute -bottom-10 -right-10 text-4xl text-blue-400/20"
          animate={{ rotate: [360, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        >
          ●
        </motion.div>
      </div>
    </div>
  );
}

export default NotFoundPage;
