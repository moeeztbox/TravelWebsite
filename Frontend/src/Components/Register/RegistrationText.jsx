// import React, { useEffect, useState } from "react";
// import { motion } from "framer-motion";
// import { UserRound } from "lucide-react";

// function RegistrationText() {
//   const [displayText, setDisplayText] = useState("");

//   // 🟡 The paragraph text (shortened as you requested)
//   const fullText =
//     "Join AlBuraqGlobal and start exploring the world your way. Discover exclusive offers, personalized trips, and unforgettable journeys — all in one place.";

//   // 🧠 Typing animation effect
//   useEffect(() => {
//     let index = 0;
//     const interval = setInterval(() => {
//       setDisplayText(fullText.slice(0, index));
//       index++;
//       if (index > fullText.length) clearInterval(interval);
//     }, 20); // typing speed (ms per letter)
//     return () => clearInterval(interval);
//   }, []);

//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 40 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 1 }}
//       className="text-white max-w-3xl space-y-6 px-6 md:px-12 -mt-32 text-center"
//     >
//       {/* 👤 Centered Person Icon */}
//       <div className="flex items-center justify-center">
//         <UserRound className="text-yellow-400 w-16 h-16 mb-2" />
//       </div>

//       {/* 🟡 Heading */}
//       <h1 className="text-5xl md:text-7xl font-extrabold leading-tight whitespace-nowrap">
//         Create Your <span className="text-yellow-400">Account</span>
//       </h1>

//       {/* 📜 Typing Animated Paragraph */}
//       <motion.p
//         className="text-gray-200 text-md leading-relaxed max-w-3xl mx-auto text-left font-light"
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         transition={{ delay: 0.5, duration: 0.5 }}
//       >
//         {displayText}
//         <motion.span
//           animate={{ opacity: [0, 1, 0] }}
//           transition={{ repeat: Infinity, duration: 0.8 }}
//           className="text-yellow-400"
//         >
//           |
//         </motion.span>
//       </motion.p>
//     </motion.div>
//   );
// }

// export default RegistrationText;
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { UserRound } from "lucide-react";

function RegistrationText() {
  const [displayText, setDisplayText] = useState("");

  const fullText =
    "Join AlBuraqPilgrim and start exploring the world your way. Discover exclusive offers, personalized trips, and unforgettable journeys — all in one place.";

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
      {/* 👤 Centered Icon (Responsive Alignment) */}
      <div className="flex items-center justify-center md:justify-center">
        <UserRound className="text-yellow-400 w-12 sm:w-14 md:w-16 h-12 sm:h-14 md:h-16 mb-2" />
      </div>

      {/* 🟡 Heading */}
      <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold leading-tight whitespace-nowrap">
        Create Your{" "}
        <span className="text-yellow-400 whitespace-nowrap">Account</span>
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

export default RegistrationText;
