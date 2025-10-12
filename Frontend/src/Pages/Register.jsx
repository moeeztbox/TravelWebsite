// import React, { useEffect, useRef } from "react";
// import RegisterBg from "../Assets/Images/RegisterImage/register.png";
// import RegistrationForm from "../Components/Register/RegistrationForm";
// import RegistrationText from "../Components/Register/RegistrationText";

// function Register() {
//   const overlayRef = useRef(null);

//   useEffect(() => {
//     // Smooth fade-in overlay animation
//     if (overlayRef.current) {
//       overlayRef.current.style.opacity = "0";
//       setTimeout(() => {
//         overlayRef.current.style.transition = "opacity 1s ease-in-out";
//         overlayRef.current.style.opacity = "1";
//       }, 100);
//     }
//   }, []);

//   return (
//     <section className="relative min-h-screen flex flex-col overflow-hidden">
//       {/* Overlay for fade-in */}
//       <div ref={overlayRef} className="absolute inset-0 z-20 pointer-events-none"></div>


//       {/* 🌄 Background Image + Gradient */}
//       <div
//         className="absolute inset-0 bg-cover bg-center bg-no-repeat"
//         style={{
//           backgroundImage: `linear-gradient(135deg, 
//             rgba(0, 0, 0, 0.85) 0%, 
//             rgba(0, 0, 0, 0.75) 50%, 
//             rgba(0, 0, 0, 0.9) 100%), 
//             url(${RegisterBg})`,
//         }}
//       ></div>

//       {/* ✨ Golden sparkles animation */}
//       <div className="absolute inset-0 opacity-40">
//         {[...Array(10)].map((_, i) => (
//           <div
//             key={i}
//             className="absolute w-1 h-1 bg-yellow-400 rounded-full animate-pulse"
//             style={{
//               top: `${Math.random() * 80 + 10}%`,
//               left: `${Math.random() * 80 + 10}%`,
//               animationDelay: `${Math.random() * 3}s`,
//               animationDuration: `${2 + Math.random() * 2}s`,
//             }}
//           ></div>
//         ))}
//       </div>

//       {/* 🔹 Main Content */}
//       <div className="relative z-10 flex flex-col md:flex-row items-center justify-between w-full px-6 md:px-16 py-10">
//         {/* Left Side Text */}
//         <div className="hidden md:flex w-full md:w-[45%] justify-center">
//           <RegistrationText />
//         </div>

//         {/* Right Side Form */}
//         <div className="w-full md:w-[50%] lg:w-[40%]">
//           <RegistrationForm />
//         </div>
//       </div>

//       {/* ✨ Bottom Gold Accent Line */}
//       <div className="absolute bottom-0 left-0 right-0">
//         <div className="h-1 bg-gradient-to-r from-yellow-600 via-yellow-500 to-transparent opacity-70"></div>
//       </div>
//     </section>
//   );
// }

// export default Register;
import React, { useEffect, useRef } from "react";
import RegisterBg from "../Assets/Images/RegisterImage/register.png";
import RegistrationForm from "../Components/Register/RegistrationForm";
import RegistrationText from "../Components/Register/RegistrationText";

function Register() {
  const overlayRef = useRef(null);

  useEffect(() => {
    // Smooth fade-in overlay animation
    if (overlayRef.current) {
      overlayRef.current.style.opacity = "0";
      setTimeout(() => {
        overlayRef.current.style.transition = "opacity 1s ease-in-out";
        overlayRef.current.style.opacity = "1";
      }, 100);
    }
  }, []);

  return (
    <section className="relative min-h-screen flex flex-col overflow-hidden">
      {/* Overlay for fade-in */}
      <div
        ref={overlayRef}
        className="absolute inset-0 z-20 pointer-events-none"
      ></div>

      {/* 🌄 Background Image + Gradient */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `linear-gradient(135deg, 
            rgba(0, 0, 0, 0.85) 0%, 
            rgba(0, 0, 0, 0.75) 50%, 
            rgba(0, 0, 0, 0.9) 100%), 
            url(${RegisterBg})`,
        }}
      ></div>

      {/* ✨ Golden sparkles animation */}
      <div className="absolute inset-0 opacity-40">
        {[...Array(10)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-yellow-400 rounded-full animate-pulse"
            style={{
              top: `${Math.random() * 80 + 10}%`,
              left: `${Math.random() * 80 + 10}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`,
            }}
          ></div>
        ))}
      </div>

      {/* 🔹 Main Content */}
      <div className="relative z-10 flex flex-col md:flex-row items-center justify-between w-full px-4 sm:px-8 md:px-16 py-10 gap-10 md:gap-0">

        {/* Left Side Text */}
        <div className="w-full md:w-[45%] flex justify-center mb-10 md:mb-0">
          <RegistrationText />
        </div>

        {/* Right Side Form */}
        <div className="w-full md:w-[50%] lg:w-[40%]">
          <RegistrationForm />
        </div>
      </div>

      {/* ✨ Bottom Gold Accent Line */}
      <div className="absolute bottom-0 left-0 right-0">
        <div className="h-1 bg-gradient-to-r from-yellow-600 via-yellow-500 to-transparent opacity-70"></div>
      </div>
    </section>
  );
}

export default Register;
