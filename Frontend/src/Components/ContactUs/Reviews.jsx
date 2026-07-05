import React, { useState } from "react";
import { Send, User, Mail, Phone, MessageSquare, Star } from "lucide-react";
import {
  sanitizeDigits,
  validateEmail,
  validateName,
  validatePhoneDigits,
} from "../../utils/formValidation";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function Reviews() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    review: "",
    rating: 0,
  });

  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState({ type: "", message: "" });
  const [hoverRating, setHoverRating] = useState(0);
  const [focused, setFocused] = useState({
    fullName: false,
    email: false,
    phone: false,
    review: false,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "phone") {
      setFormData((prev) => ({ ...prev, phone: sanitizeDigits(value) }));
      return;
    }
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFocus = (field) => {
    setFocused((prev) => ({ ...prev, [field]: true }));
  };

  const handleBlur = (field) => {
    setFocused((prev) => ({ ...prev, [field]: false }));
  };

  const validateForm = () => {
    const nextErrors = {};

    const nameErr = validateName(formData.fullName);
    if (nameErr) nextErrors.fullName = nameErr;

    const emailValue = formData.email.trim();
    if (!emailValue) {
      nextErrors.email = "Email address is required.";
    } else if (validateEmail(emailValue) || !EMAIL_REGEX.test(emailValue)) {
      nextErrors.email = "Please enter a valid email address.";
    }

    const phoneErr = validatePhoneDigits(formData.phone);
    if (phoneErr) nextErrors.phone = phoneErr;

    const reviewValue = formData.review.trim();
    if (!reviewValue) {
      nextErrors.review = "Please share your review.";
    } else if (reviewValue.length < 10) {
      nextErrors.review = "Review must be at least 10 characters.";
    }

    if (!formData.rating || formData.rating < 1) {
      nextErrors.rating = "Please select a star rating.";
    }

    return nextErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus({ type: "", message: "" });

    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setStatus({ type: "error", message: "Please fix the highlighted fields." });
      return;
    }

    setErrors({});
    setStatus({
      type: "success",
      message: "Thank you! Your review has been submitted successfully.",
    });
    setFormData({
      fullName: "",
      email: "",
      phone: "",
      review: "",
      rating: 0,
    });
    setHoverRating(0);
  };

  const activeRating = hoverRating || formData.rating;

  const inputBorderClass = (field, hasError) => {
    if (hasError) return "border-red-400";
    if (focused[field]) return "border-yellow-600";
    return "border-gray-200";
  };

  return (
    <section
      className="w-full max-w-7xl mx-auto px-2 sm:px-4 pb-16 pt-4"
      aria-labelledby="reviews-heading"
    >
      <div className="w-full max-w-3xl lg:max-w-4xl mx-auto">
        <form
          onSubmit={handleSubmit}
          noValidate
          className="bg-white rounded-2xl shadow-2xl p-4 sm:p-6 md:p-8 lg:p-10 space-y-6 w-full"
        >
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center bg-yellow-600 p-3 rounded-xl mb-4">
              <Star className="w-8 h-8 text-white fill-white" />
            </div>
            <h2
              id="reviews-heading"
              className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-2"
            >
              Share Your Experience
            </h2>
            <p className="text-gray-600 text-sm sm:text-base">
              Tell us about your journey with Al Buraq Global
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

          <div className="space-y-2">
            <label
              htmlFor="review-fullName"
              className="text-gray-700 text-sm font-medium flex items-center gap-2"
            >
              <User className="w-4 h-4 text-yellow-600" />
              Full Name <span className="text-red-500">*</span>
            </label>
            <div
              className={`relative transition-all duration-300 ${
                focused.fullName ? "transform scale-[1.01]" : ""
              }`}
            >
              <input
                id="review-fullName"
                type="text"
                name="fullName"
                placeholder="Enter your full name"
                value={formData.fullName}
                onChange={handleChange}
                onFocus={() => handleFocus("fullName")}
                onBlur={() => handleBlur("fullName")}
                className={`w-full p-3 sm:p-4 bg-gray-50 border-2 ${inputBorderClass(
                  "fullName",
                  errors.fullName,
                )} rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none transition-all duration-300 hover:bg-white hover:border-yellow-600/50`}
                aria-invalid={Boolean(errors.fullName)}
                aria-describedby={errors.fullName ? "review-fullName-error" : undefined}
              />
              {errors.fullName ? (
                <p id="review-fullName-error" className="mt-1 text-xs text-red-600">
                  {errors.fullName}
                </p>
              ) : null}
            </div>
          </div>

          <div className="flex flex-col lg:flex-row gap-4 lg:gap-6">
            <div className="flex-1 space-y-2">
              <label
                htmlFor="review-email"
                className="text-gray-700 text-sm font-medium flex items-center gap-2"
              >
                <Mail className="w-4 h-4 text-yellow-600" />
                Email Address <span className="text-red-500">*</span>
              </label>
              <div
                className={`relative transition-all duration-300 ${
                  focused.email ? "transform scale-[1.01]" : ""
                }`}
              >
                <input
                  id="review-email"
                  type="email"
                  name="email"
                  placeholder="Enter your email address"
                  value={formData.email}
                  onChange={handleChange}
                  onFocus={() => handleFocus("email")}
                  onBlur={() => handleBlur("email")}
                  className={`w-full p-3 sm:p-4 bg-gray-50 border-2 ${inputBorderClass(
                    "email",
                    errors.email,
                  )} rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none transition-all duration-300 hover:bg-white hover:border-yellow-600/50`}
                  aria-invalid={Boolean(errors.email)}
                  aria-describedby={errors.email ? "review-email-error" : undefined}
                />
                {errors.email ? (
                  <p id="review-email-error" className="mt-1 text-xs text-red-600">
                    {errors.email}
                  </p>
                ) : null}
              </div>
            </div>

            <div className="flex-1 space-y-2">
              <label
                htmlFor="review-phone"
                className="text-gray-700 text-sm font-medium flex items-center gap-2"
              >
                <Phone className="w-4 h-4 text-yellow-600" />
                Contact Number <span className="text-red-500">*</span>
              </label>
              <div
                className={`relative transition-all duration-300 ${
                  focused.phone ? "transform scale-[1.01]" : ""
                }`}
              >
                <input
                  id="review-phone"
                  type="tel"
                  inputMode="numeric"
                  name="phone"
                  placeholder="Ex. 0300 xxxxxxx"
                  value={formData.phone}
                  onChange={handleChange}
                  onFocus={() => handleFocus("phone")}
                  onBlur={() => handleBlur("phone")}
                  className={`w-full p-3 sm:p-4 bg-gray-50 border-2 ${inputBorderClass(
                    "phone",
                    errors.phone,
                  )} rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none transition-all duration-300 hover:bg-white hover:border-yellow-600/50`}
                  aria-invalid={Boolean(errors.phone)}
                  aria-describedby={errors.phone ? "review-phone-error" : undefined}
                />
                {errors.phone ? (
                  <p id="review-phone-error" className="mt-1 text-xs text-red-600">
                    {errors.phone}
                  </p>
                ) : null}
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <label
              htmlFor="review-comment"
              className="text-gray-700 text-sm font-medium flex items-center gap-2"
            >
              <MessageSquare className="w-4 h-4 text-yellow-600" />
              Your Review <span className="text-red-500">*</span>
            </label>
            <div
              className={`relative transition-all duration-300 ${
                focused.review ? "transform scale-[1.01]" : ""
              }`}
            >
              <textarea
                id="review-comment"
                name="review"
                placeholder="Share details about your experience..."
                value={formData.review}
                onChange={handleChange}
                onFocus={() => handleFocus("review")}
                onBlur={() => handleBlur("review")}
                rows="5"
                className={`w-full p-3 sm:p-4 bg-gray-50 border-2 ${inputBorderClass(
                  "review",
                  errors.review,
                )} rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none transition-all duration-300 hover:bg-white resize-none`}
                aria-invalid={Boolean(errors.review)}
                aria-describedby={errors.review ? "review-comment-error" : undefined}
              />
              {errors.review ? (
                <p id="review-comment-error" className="mt-1 text-xs text-red-600">
                  {errors.review}
                </p>
              ) : null}
            </div>
          </div>

          <fieldset className="space-y-3">
            <legend className="text-gray-700 text-sm font-medium flex items-center gap-2">
              <Star className="w-4 h-4 text-yellow-600" />
              Star Rating <span className="text-red-500">*</span>
            </legend>
            <div
              className="flex items-center gap-2"
              role="radiogroup"
              aria-label="Star rating from 1 to 5"
              onMouseLeave={() => setHoverRating(0)}
            >
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  role="radio"
                  aria-checked={formData.rating === star}
                  aria-label={`Rate ${star} out of 5 stars`}
                  onClick={() =>
                    setFormData((prev) => ({ ...prev, rating: star }))
                  }
                  onMouseEnter={() => setHoverRating(star)}
                  className="p-1 rounded-lg transition-all duration-200 hover:scale-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-yellow-600 focus-visible:ring-offset-2"
                >
                  <Star
                    className={`w-7 h-7 sm:w-8 sm:h-8 transition-colors duration-200 ${
                      star <= activeRating
                        ? "text-yellow-500 fill-yellow-500"
                        : "text-gray-300"
                    }`}
                  />
                </button>
              ))}
              <span className="ml-2 text-sm text-gray-500">
                {formData.rating ? `${formData.rating}/5` : "Select a rating"}
              </span>
            </div>
            {errors.rating ? (
              <p className="text-xs text-red-600">{errors.rating}</p>
            ) : null}
          </fieldset>

          <button
            type="submit"
            className="w-full bg-yellow-600 text-white font-semibold p-3 sm:p-4 rounded-xl hover:bg-yellow-700 transition-all duration-300 flex items-center justify-center gap-2 hover:scale-[1.02] group"
          >
            <span className="text-base sm:text-lg">Submit Review</span>
            <Send className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
          </button>
        </form>
      </div>
    </section>
  );
}

export default Reviews;
