import React, { useState } from "react";

function InquiryForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    inquiry: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Inquiry Submitted:", formData);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 p-6 bg-white shadow-md rounded-2xl"
    >
      <h2 className="text-xl font-semibold text-gray-700">Inquiry Form</h2>

      <input
        type="text"
        name="name"
        placeholder="Your Name"
        value={formData.name}
        onChange={handleChange}
        className="w-full p-2 border rounded"
        required
      />

      <input
        type="email"
        name="email"
        placeholder="Your Email"
        value={formData.email}
        onChange={handleChange}
        className="w-full p-2 border rounded"
        required
      />

      <textarea
        name="inquiry"
        placeholder="Your Inquiry"
        value={formData.inquiry}
        onChange={handleChange}
        className="w-full p-2 border rounded"
        rows="4"
        required
      ></textarea>

      <button
        type="submit"
        className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
      >
        Submit Inquiry
      </button>
    </form>
  );
}

export default InquiryForm;
