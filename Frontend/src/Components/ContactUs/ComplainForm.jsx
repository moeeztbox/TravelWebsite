import React, { useState } from "react";

function ComplainForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    complaint: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Complaint Submitted:", formData);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 p-6 bg-white shadow-md rounded-2xl"
    >
      <h2 className="text-xl font-semibold text-gray-700">Complain Form</h2>

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
        name="complaint"
        placeholder="Your Complaint"
        value={formData.complaint}
        onChange={handleChange}
        className="w-full p-2 border rounded"
        rows="4"
        required
      ></textarea>

      <button
        type="submit"
        className="w-full bg-red-600 text-white p-2 rounded hover:bg-red-700"
      >
        Submit Complaint
      </button>
    </form>
  );
}

export default ComplainForm;
