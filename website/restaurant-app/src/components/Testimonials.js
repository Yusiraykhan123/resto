import React, { useState, useEffect } from "react";
import "./Testimonials.css";

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [newTestimonial, setNewTestimonial] = useState({
    name: "",
    email: "",
    phone_number: "",
    rating: "",
    text: "",
    image: null,
  });

  useEffect(() => {
    fetch("https://yoloverse.pythonanywhere.com/api/contact/testimonials/")
      .then((response) => response.json())
      .then((data) => setTestimonials(data))
      .catch((error) => console.error("Error fetching testimonials:", error));
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTestimonial({ ...newTestimonial, [name]: value });
  };

  const handleImageChange = (e) => {
    setNewTestimonial({ ...newTestimonial, image: e.target.files[0] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    Object.keys(newTestimonial).forEach((key) => {
      formData.append(key, newTestimonial[key]);
    });

    fetch("https://yoloverse.pythonanywhere.com/api/contact/testimonials/", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        setTestimonials((prev) => [...prev, data]); // Update UI dengan testimonial baru
        setNewTestimonial({
          name: "",
          email: "",
          phone_number: "",
          rating: "",
          text: "",
          image: null,
        }); // Reset form
      })
      .catch((error) => console.error("Error adding testimonial:", error));
  };

  return (
    <div className="testimonials-container">
      <h1>Testimonials</h1>
      {/* Form Input */}
      <form className="testimonial-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          value={newTestimonial.name}
          onChange={handleInputChange}
          placeholder="Your Name"
          required
        />
        <input
          type="email"
          name="email"
          value={newTestimonial.email}
          onChange={handleInputChange}
          placeholder="Your Email"
          required
        />
        <input
          type="text"
          name="phone_number"
          value={newTestimonial.phone_number}
          onChange={handleInputChange}
          placeholder="Phone Number"
          required
        />
        <input
          type="number"
          name="rating"
          value={newTestimonial.rating}
          onChange={handleInputChange}
          placeholder="Rating (1-5)"
          required
        />
        <textarea
          name="text"
          value={newTestimonial.text}
          onChange={handleInputChange}
          placeholder="Your Feedback"
          required
        ></textarea>
        <input
          type="file"
          name="image"
          onChange={handleImageChange}
          accept="image/*"
          required
        />
        <button type="submit">Submit Testimonial</button>
      </form>

      {/* Display Testimonials */}
      {testimonials.length > 0 ? (
        <div className="testimonials-list">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="testimonial-card">
              <img
                src={testimonial.image}
                alt={`${testimonial.name}'s testimonial`}
                className="testimonial-image"
              />
              <h3>{testimonial.name}</h3>
              <p className="testimonial-rating">Rating: {testimonial.rating}</p>
              <p>{testimonial.text}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>Loading testimonials...</p>
      )}
    </div>
  );
};

export default Testimonials;
