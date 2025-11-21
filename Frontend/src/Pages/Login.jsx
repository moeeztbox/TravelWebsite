import React, { useEffect, useRef } from "react";
import RegisterBg from "../Assets/Images/RegisterImage/register.png";
import LoginForm from "../Components/Login/LoginForm";
import LoginText from "../Components/Login/LoginText";

function Login() {
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
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
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

      {/* 🔹 Centered Two-Column Layout */}
      <div className="relative z-10 flex flex-col md:flex-row items-center justify-center w-full max-w-7xl px-4 sm:px-8 md:px-16 py-10 gap-10">
        {/* Left Side Text */}
        <div className="w-full md:w-[45%] flex justify-center md:justify-end">
          <LoginText />
        </div>

        {/* Right Side Form */}
        <div className="w-full md:w-[45%] flex justify-center md:justify-start">
          <LoginForm />
        </div>
      </div>

      {/* ✨ Bottom Gold Accent Line */}
      <div className="absolute bottom-0 left-0 right-0">
        <div className="h-1 bg-gradient-to-r from-yellow-600 via-yellow-500 to-transparent opacity-70"></div>
      </div>
    </section>
  );
}

export default Login;
