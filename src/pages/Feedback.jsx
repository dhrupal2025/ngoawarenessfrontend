import { useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "../components/Navbar";

function Feedback() {
  const [feedback, setFeedback] = useState({
    name: "",
    email: "",
    subject: "",
    rating: 0,
    message: "",
  });

  const [hover, setHover] = useState(0);

  const handleChange = (e) => {
    setFeedback({
      ...feedback,
      [e.target.name]: e.target.value,
    });
  };

  const handleRating = (value) => {
    setFeedback({
      ...feedback,
      rating: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !feedback.name ||
      !feedback.email ||
      !feedback.message ||
      feedback.rating === 0
    ) {
      alert("Please fill all fields.");
      return;
    }

    try {
      await axios.post("http://localhost:8081/api/feedback", feedback);

   alert("🎉 Thank you! Your feedback has been submitted successfully.");

      setFeedback({
        name: "",
        email: "",
        subject: "",
        rating: 0,
        message: "",
      });
    } catch (error) {
    console.error("Full Error:", error);

    if (error.response) {
        console.log("Status:", error.response.status);
        console.log("Data:", error.response.data);
        alert("Error: " + JSON.stringify(error.response.data));
    } else {
        alert(error.message);
    }
}
  };

  return (
     <>
               <Navbar />
    <div className="container py-5">
      <div className="row justify-content-center">

        <div className="col-lg-7">

          <div className="card shadow-lg border-0 rounded-4">

            <div className="card-header bg-success text-white text-center rounded-top-4">
              <h3 className="mb-0">Feedback Form</h3>
            </div>

            <div className="card-body p-4">

              <form onSubmit={handleSubmit}>

                <div className="mb-3">
                  <label className="form-label">Full Name</label>
                  <input
                    type="text"
                    className="form-control"
                    name="name"
                    value={feedback.name}
                    onChange={handleChange}
                    placeholder="Enter your name"
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Email Address</label>
                  <input
                    type="email"
                    className="form-control"
                    name="email"
                    value={feedback.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label d-block">
                    Overall Rating
                  </label>

                  {[1, 2, 3, 4, 5].map((star) => (
                    <span
                      key={star}
                      style={{
                        fontSize: "32px",
                        cursor: "pointer",
                        color:
                          star <= (hover || feedback.rating)
                            ? "#ffc107"
                            : "#ccc",
                      }}
                      onClick={() => handleRating(star)}
                      onMouseEnter={() => setHover(star)}
                      onMouseLeave={() => setHover(0)}
                    >
                      ★
                    </span>
                  ))}
                </div>

                <div className="mb-3">
                  <label className="form-label">
                    Your Feedback
                  </label>

                  <textarea
                    rows="5"
                    className="form-control"
                    name="message"
                    value={feedback.message}
                    onChange={handleChange}
                    placeholder="Write your feedback here..."
                  ></textarea>
                </div>

                <button className="btn btn-success w-100">
                  Submit Feedback
                </button>

              </form>

            </div>

          </div>

        </div>

      </div>
    </div>
    </>
  );
}

export default Feedback;