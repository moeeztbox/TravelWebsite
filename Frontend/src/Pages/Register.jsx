import React, { useState } from "react";

import RegisterBg from "../Assets/Images/RegisterImage/register.jpg"; // ✅ Background image import
import RegistrationForm from "../Components/Register/RegistrationForm";

function Register() {
  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center relative"
      style={{
        backgroundImage: `url(${RegisterBg})`,
      }}
    >
      {/* ✅ Overlay for readability */}

      <RegistrationForm />
    </div>
  );
}

export default Register;
