import React, { useMemo, useState } from "react";
import { Send, User, Mail, MessageSquare, Phone } from "lucide-react";
import { api, formatAxiosError } from "../../Services/authService";
import { useAuth } from "../../Context/AuthContext";
import { sanitizeDigits, validateCommonFields } from "../../utils/formValidation";

function InquiryForm() {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    inquiry: "",
  });

  const [status, setStatus] = useState({ type: "", message: "" });
  const [sending, setSending] = useState(false);
  const [errors, setErrors] = useState({});

  const [focused, setFocused] = useState({
    firstName: false,
    lastName: false,
    email: false,
    phone: false,
    inquiry: false,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "phone") {
      setFormData({ ...formData, phone: sanitizeDigits(value) });
      return;
    }
    setFormData({ ...formData, [name]: value });
  };

  const inferredName = useMemo(() => {
    const n =
      [user?.firstName, user?.lastName].filter(Boolean).join(" ").trim() || "";
    return n;
  }, [user?.firstName, user?.lastName]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ type: "", message: "" });
    setErrors({});

    const fullName = `${formData.firstName} ${formData.lastName}`.trim();
    const validationErrors = validateCommonFields({
      name: fullName,
      email: formData.email,
      phone: formData.phone,
    });

    // Map shared error keys to this form's fields
    const mapped = {};
    if (validationErrors.name) mapped.firstName = validationErrors.name;
    if (validationErrors.email) mapped.email = validationErrors.email;
    if (validationErrors.phone) mapped.phone = validationErrors.phone;

    if (Object.keys(mapped).length > 0) {
      setErrors(mapped);
      setStatus({ type: "error", message: "Please fix the highlighted fields." });
      return;
    }

    setSending(true);
    try {
      const phoneDigits = sanitizeDigits(formData.phone);
      const body = String(formData.inquiry || "").trim();
      const message = body ? `Phone: ${phoneDigits}\n\n${body}` : `Phone: ${phoneDigits}`;

      await api.post("/contact", {
        type: "inquiry",
        userEmail: formData.email.trim(),
        userName:
          inferredName ||
          `${formData.firstName} ${formData.lastName}`.trim() ||
          "User",
        message,
      });
      setStatus({ type: "success", message: "Inquiry submitted. Email sent." });
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        inquiry: "",
      });
    } catch (err) {
      setStatus({ type: "error", message: formatAxiosError(err) });
    } finally {
      setSending(false);
    }
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
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-2xl shadow-2xl p-4 sm:p-6 md:p-8 lg:p-10 space-y-6 w-full"
        >
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

          {status.message ? (
            <div
              className={`text-sm rounded-lg px-3 py-2 border ${
                status.type === "success"
                  ? "text-green-700 bg-green-50 border-green-200"
                  : "text-red-700 bg-red-50 border-red-200"
              }`}
              role="alert"
            >
              {status.message}
            </div>
          ) : null}

          {/* First Row: First Name & Last Name */}
          <div className="flex flex-col lg:flex-row gap-4 lg:gap-6">
            {/* First Name */}
            <div className="flex-1 space-y-2">
              <label className="text-gray-700 text-sm font-medium flex items-center gap-2">
                <User className="w-4 h-4 text-yellow-600" />
                First Name <span className="text-red-500">*</span>
              </label>
              <div
                className={`relative transition-all duration-300 ${
                  focused.firstName ? "transform scale-[1.01]" : ""
                }`}
              >
                <input
                  type="text"
                  name="firstName"
                  placeholder="Write your First Name"
                  value={formData.firstName}
                  onChange={handleChange}
                  onFocus={() => handleFocus("firstName")}
                  onBlur={() => handleBlur("firstName")}
                  className={`w-full p-3 sm:p-4 bg-gray-50 border-2 ${
                    errors.firstName
                      ? "border-red-400"
                      : focused.firstName
                        ? "border-yellow-600"
                        : "border-gray-200"
                  } rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none transition-all duration-300 hover:bg-white hover:border-yellow-600/50`}
                  required
                />
                {errors.firstName ? (
                  <p className="mt-1 text-xs text-red-600">{errors.firstName}</p>
                ) : null}
              </div>
            </div>
            {/* Last Name */}
            <div className="flex-1 space-y-2">
              <label className="text-gray-700 text-sm font-medium flex items-center gap-2">
                <User className="w-4 h-4 text-yellow-600" />
                Last Name <span className="text-red-500">*</span>
              </label>
              <div
                className={`relative transition-all duration-300 ${
                  focused.lastName ? "transform scale-[1.01]" : ""
                }`}
              >
                <input
                  type="text"
                  name="lastName"
                  placeholder="Write your Last Name"
                  value={formData.lastName}
                  onChange={handleChange}
                  onFocus={() => handleFocus("lastName")}
                  onBlur={() => handleBlur("lastName")}
                  className={`w-full p-3 sm:p-4 bg-gray-50 border-2 ${
                    focused.lastName ? "border-yellow-600" : "border-gray-200"
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
              <div
                className={`relative transition-all duration-300 ${
                  focused.email ? "transform scale-[1.01]" : ""
                }`}
              >
                <input
                  type="email"
                  name="email"
                  placeholder="Write Your E-mail"
                  value={formData.email}
                  onChange={handleChange}
                  onFocus={() => handleFocus("email")}
                  onBlur={() => handleBlur("email")}
                  className={`w-full p-3 sm:p-4 bg-gray-50 border-2 ${
                    errors.email
                      ? "border-red-400"
                      : focused.email
                        ? "border-yellow-600"
                        : "border-gray-200"
                  } rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none transition-all duration-300 hover:bg-white`}
                  required
                />
                {errors.email ? (
                  <p className="mt-1 text-xs text-red-600">{errors.email}</p>
                ) : null}
              </div>
            </div>
            {/* Phone */}
            <div className="flex-1 space-y-2">
              <label className="text-gray-700 text-sm font-medium flex items-center gap-2">
                <Phone className="w-4 h-4 text-yellow-600" />
                Phone
              </label>
              <div
                className={`relative transition-all duration-300 ${
                  focused.phone ? "transform scale-[1.01]" : ""
                }`}
              >
                <input
                  type="tel"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  name="phone"
                  placeholder="Ex. 055 xxxxx"
                  value={formData.phone}
                  onChange={handleChange}
                  onFocus={() => handleFocus("phone")}
                  onBlur={() => handleBlur("phone")}
                  className={`w-full p-3 sm:p-4 bg-gray-50 border-2 ${
                    errors.phone
                      ? "border-red-400"
                      : focused.phone
                        ? "border-yellow-600"
                        : "border-gray-200"
                  } rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none transition-all duration-300 hover:bg-white`}
                />
                {errors.phone ? (
                  <p className="mt-1 text-xs text-red-600">{errors.phone}</p>
                ) : null}
              </div>
            </div>
          </div>

          {/* Inquiry Textarea */}
          <div className="space-y-2">
            <label className="text-gray-700 text-sm font-medium flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-yellow-600" />
              Your Message
            </label>
            <div
              className={`relative transition-all duration-300 ${
                focused.inquiry ? "transform scale-[1.01]" : ""
              }`}
            >
              <textarea
                name="inquiry"
                placeholder="Tell us about your inquiry or questions..."
                value={formData.inquiry}
                onChange={handleChange}
                onFocus={() => handleFocus("inquiry")}
                onBlur={() => handleBlur("inquiry")}
                className={`w-full p-3 sm:p-4 bg-gray-50 border-2 ${
                  focused.inquiry ? "border-yellow-600" : "border-gray-200"
                } rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none transition-all duration-300 hover:bg-white resize-none`}
                rows="5"
                required
              ></textarea>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={sending}
            className="w-full bg-yellow-600 text-white font-semibold p-3 sm:p-4 rounded-xl hover:bg-yellow-700 transition-all duration-300 flex items-center justify-center gap-2  hover:scale-[1.02] group"
          >
            <span className="text-base sm:text-lg">
              {sending ? "Sending..." : "Submit Inquiry"}
            </span>
            <Send className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
          </button>
        </form>
      </div>
    </div>
  );
}

export default InquiryForm;
