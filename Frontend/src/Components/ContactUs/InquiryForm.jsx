import React, { useState } from "react";
import { Send, User, Mail, MessageSquare, Phone } from "lucide-react";

function InquiryForm() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    inquiry: "",
  });

  const [focused, setFocused] = useState({
    firstName: false,
    lastName: false,
    email: false,
    phone: false,
    inquiry: false,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Inquiry Submitted:", formData);
  setFormData({ firstName: "", lastName: "", email: "", phone: "", inquiry: "" });
  };

  const handleFocus = (field) => {
    setFocused({ ...focused, [field]: true });
  };

  const handleBlur = (field) => {
    setFocused({ ...focused, [field]: false });
  };

  return (
  <div className="w-full max-w-3xl lg:max-w-4xl mx-auto py-6 px-2 sm:px-4">
      {/* Form Container */}
  <div className="relative z-10 w-full flex flex-col items-stretch">
  <div className="bg-white rounded-2xl shadow-2xl p-4 sm:p-6 md:p-8 lg:p-10 space-y-6 w-full">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center bg-yellow-600 p-3 rounded-xl mb-4">
              <MessageSquare className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
              Send Us Your Inquiry
            </h2>
            <p className="text-gray-600 text-sm sm:text-base">
              We'll get back to you within 24 hours
            </p>
          </div>


          {/* First Row: First Name & Last Name */}
          <div className="flex flex-col lg:flex-row gap-4 lg:gap-6">
            {/* First Name */}
            <div className="flex-1 space-y-2">
              <label className="text-gray-700 text-sm font-medium flex items-center gap-2">
                <User className="w-4 h-4 text-yellow-600" />
                First Name <span className="text-red-500">*</span>
              </label>
              <div className={`relative transition-all duration-300 ${focused.firstName ? 'transform scale-[1.01]' : ''}`}>
                <input
                  type="text"
                  name="firstName"
                  placeholder="Write your First Name"
                  value={formData.firstName}
                  onChange={handleChange}
                  onFocus={() => handleFocus('firstName')}
                  onBlur={() => handleBlur('firstName')}
                  className={`w-full p-3 sm:p-4 bg-gray-50 border-2 ${
                    focused.firstName ? 'border-yellow-600' : 'border-gray-200'
                  } rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none transition-all duration-300 hover:bg-white hover:border-yellow-600/50`}
                  required
                />
              </div>
            </div>
            {/* Last Name */}
            <div className="flex-1 space-y-2">
              <label className="text-gray-700 text-sm font-medium flex items-center gap-2">
                <User className="w-4 h-4 text-yellow-600" />
                Last Name <span className="text-red-500">*</span>
              </label>
              <div className={`relative transition-all duration-300 ${focused.lastName ? 'transform scale-[1.01]' : ''}`}>
                <input
                  type="text"
                  name="lastName"
                  placeholder="Write your Last Name"
                  value={formData.lastName}
                  onChange={handleChange}
                  onFocus={() => handleFocus('lastName')}
                  onBlur={() => handleBlur('lastName')}
                  className={`w-full p-3 sm:p-4 bg-gray-50 border-2 ${
                    focused.lastName ? 'border-yellow-600' : 'border-gray-200'
                  } rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none transition-all duration-300 hover:bg-white hover:border-yellow-600/50`}
                  required
                />
              </div>
            </div>
          </div>

          {/* Second Row: Email & Phone */}
          <div className="flex flex-col lg:flex-row gap-4 lg:gap-6">
            {/* Email */}
            <div className="flex-1 space-y-2">
              <label className="text-gray-700 text-sm font-medium flex items-center gap-2">
                <Mail className="w-4 h-4 text-yellow-600" />
                E-mail <span className="text-red-500">*</span>
              </label>
              <div className={`relative transition-all duration-300 ${focused.email ? 'transform scale-[1.01]' : ''}`}>
                <input
                  type="email"
                  name="email"
                  placeholder="Write Your E-mail"
                  value={formData.email}
                  onChange={handleChange}
                  onFocus={() => handleFocus('email')}
                  onBlur={() => handleBlur('email')}
                  className={`w-full p-3 sm:p-4 bg-gray-50 border-2 ${
                    focused.email ? 'border-yellow-600' : 'border-gray-200'
                  } rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none transition-all duration-300 hover:bg-white`}
                  required
                />
              </div>
            </div>
            {/* Phone */}
            <div className="flex-1 space-y-2">
              <label className="text-gray-700 text-sm font-medium flex items-center gap-2">
                <Phone className="w-4 h-4 text-yellow-600" />
                Phone
              </label>
              <div className={`relative transition-all duration-300 ${focused.phone ? 'transform scale-[1.01]' : ''}`}>
                <input
                  type="text"
                  name="phone"
                  placeholder="Ex. 055 xxxxx"
                  value={formData.phone}
                  onChange={handleChange}
                  onFocus={() => handleFocus('phone')}
                  onBlur={() => handleBlur('phone')}
                  className={`w-full p-3 sm:p-4 bg-gray-50 border-2 ${
                    focused.phone ? 'border-yellow-600' : 'border-gray-200'
                  } rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none transition-all duration-300 hover:bg-white`}
                />
              </div>
            </div>
          </div>

          {/* Inquiry Textarea */}
          <div className="space-y-2">
            <label className="text-gray-700 text-sm font-medium flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-yellow-600" />
              Your Message
            </label>
            <div className={`relative transition-all duration-300 ${focused.inquiry ? 'transform scale-[1.01]' : ''}`}>
              <textarea
                name="inquiry"
                placeholder="Tell us about your inquiry or questions..."
                value={formData.inquiry}
                onChange={handleChange}
                onFocus={() => handleFocus('inquiry')}
                onBlur={() => handleBlur('inquiry')}
                className={`w-full p-3 sm:p-4 bg-gray-50 border-2 ${
                  focused.inquiry ? 'border-yellow-600' : 'border-gray-200'
                } rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none transition-all duration-300 hover:bg-white resize-none`}
                rows="5"
                required
              ></textarea>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="button"
            onClick={handleSubmit}
            className="w-full bg-yellow-600 text-white font-semibold p-3 sm:p-4 rounded-xl hover:bg-yellow-700 transition-all duration-300 flex items-center justify-center gap-2  hover:scale-[1.02] group"
          >
            <span className="text-base sm:text-lg">Submit Inquiry</span>
            <Send className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default InquiryForm;