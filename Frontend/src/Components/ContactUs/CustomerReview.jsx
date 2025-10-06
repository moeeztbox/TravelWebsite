import React, { useState } from "react";
import { Star } from "lucide-react";

function CustomerReview() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    rating: 0,
    feedback: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleStarClick = (ratingValue) => {
    setFormData({ ...formData, rating: ratingValue });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Feedback Submitted:", formData);
    // Later connect with backend
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-4xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Customer Feedback
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6 bg-white p-8">
          {/* Name */}
          <input
            type="text"
            name="name"
            placeholder="Your Name (optional)"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300"
          />

          {/* Email */}
          <input
            type="email"
            name="email"
            placeholder="Your Email (optional)"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300"
          />

          {/* Rating Stars */}
          <div className="flex items-center gap-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                size={32}
                className={`cursor-pointer ${
                  star <= formData.rating
                    ? "text-yellow-400 fill-yellow-400"
                    : "text-gray-400"
                }`}
                onClick={() => handleStarClick(star)}
              />
            ))}
          </div>

          {/* Feedback */}
          <textarea
            name="feedback"
            placeholder="Write your feedback..."
            value={formData.feedback}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300"
            rows="5"
            required
          ></textarea>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-green-600 text-white p-3 text-lg hover:bg-green-700"
          >
            Submit Feedback
          </button>
        </form>
      </div>
    </section>
  );
}

export default CustomerReview;
