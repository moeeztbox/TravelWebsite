import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { LogIn } from "lucide-react"; // 👈 Login icon

function LoginText() {
  const [displayText, setDisplayText] = useState("");

  const fullText =
    "Welcome back to AlBuraqGlobal — your trusted companion for hassle-free bookings and unforgettable experiences. Log in to continue your journey with us!";

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setDisplayText(fullText.slice(0, index));
      index++;
      if (index > fullText.length) clearInterval(interval);
    }, 20);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      className="text-white max-w-3xl space-y-6 px-4 sm:px-6 md:px-10 lg:px-12 text-center md:text-left md:-mt-20 lg:-mt-32"
    >
      {/* 👤 Centered Icon */}
      <div className="flex items-center justify-center md:justify-center">
        <LogIn className="text-yellow-400 w-12 sm:w-14 md:w-16 h-12 sm:h-14 md:h-16 mb-2" />
      </div>

      {/* 🟡 Heading */}
      <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold leading-tight whitespace-nowrap">
        Welcome{" "}
        <span className="text-yellow-400 whitespace-nowrap">Back</span>
      </h1>

      {/* 📜 Typing Animated Paragraph */}
      <motion.p
        className="text-gray-200 text-sm sm:text-base md:text-lg leading-relaxed max-w-3xl mx-auto md:mx-0 font-light"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
      >
        {displayText}
        <motion.span
          animate={{ opacity: [0, 1, 0] }}
          transition={{ repeat: Infinity, duration: 0.8 }}
          className="text-yellow-400"
        >
          |
        </motion.span>
      </motion.p>
    </motion.div>
  );
}

export default LoginText;
