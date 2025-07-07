import React, { useState } from "react";
import axios from "axios";
import { Rating } from "react-simple-star-rating";

const FeedbackForm = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    description: "",
    rating: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const onRatingClick = (ratingData) => {
    setForm({ ...form, rating: ratingData });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form Submitted:", form);
    try {
      await axios.post("http://localhost:4000/api/feedback", form);
      alert("Feedback submitted!");
      setForm({ name: "", email: "", description: "", rating: "" });
    } catch (err) {
      console.error("Error submitting feedback:", err);
      alert("Error submitting feedback!");
    }
  };

  return (
    <div className="container mt-5">
      <div className="card shadow p-4">
        <h2 className="mb-4 text-center">📝 Feedback Form</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Name</label>
            <input
              name="name"
              type="text"
              className="form-control"
              placeholder="Enter your name"
              value={form.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              name="email"
              type="email"
              className="form-control"
              placeholder="Enter your email"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Description</label>
            <textarea
              name="description"
              className="form-control"
              placeholder="Write your feedback"
              rows={5}
              value={form.description}
              onChange={handleChange}
              required
            ></textarea>
          </div>

          <div className="mb-3">
            <label className="form-label d-block mb-2">Rating</label>
            <div className="d-flex justify-content-center">
              <Rating
                onClick={onRatingClick}
                ratingValue={form.rating ? 1 : 0}
                size={60} // Increased size for bigger ratings
                transition
                fillColor="#FFD700"
                emptyColor="#e4e5e9"
              />
            </div>
          </div>

          <button type="submit" className="btn btn-primary w-100">
            Submit Feedback
          </button>
        </form>
      </div>
    </div>
  );
};

export default FeedbackForm;
