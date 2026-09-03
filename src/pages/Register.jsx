import { useState } from "react";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";
import "./Register.css";
import axios from "axios";

function Register() {

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    password: "",
  });

  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [emailVerified, setEmailVerified] = useState(false);
  const [loading, setLoading] = useState(false);


  // =========================
  // HANDLE INPUT
  // =========================

  const handleChange = (e) => {

    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });


    // If email changes, verification is cancelled
    if (name === "email") {

      setEmailVerified(false);
      setOtpSent(false);
      setOtp("");
    }
  };


  // =========================
  // SEND OTP
  // =========================

  const handleSendOtp = async () => {

    const email = formData.email.trim().toLowerCase();


    if (email === "") {

      alert("Please enter your email.");

      return;
    }


    // Correct email format
    const emailPattern =
      /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;


    if (!emailPattern.test(email)) {

      alert("Email ID does not exist.");

      return;
    }


    try {

      setLoading(true);


      const response = await axios.post(
        "http://localhost:8081/api/registeruser/send-otp",
        {
          email: email
        }
      );


      // OTP successfully sent
      alert(response.data);

      setOtpSent(true);
      setEmailVerified(false);


    } catch (error) {

      console.log(error);


      setOtpSent(false);
      setEmailVerified(false);


      if (error.response) {

        // Show backend message
        alert(
          error.response.data ||
          "Email ID does not exist."
        );

      } else {

        alert(
          "Unable to connect to server."
        );
      }

    } finally {

      setLoading(false);
    }
  };


  // =========================
  // VERIFY OTP
  // =========================

  const handleVerifyOtp = async () => {

    if (otp.trim() === "") {

      alert("Please enter OTP.");

      return;
    }


    if (otp.trim().length !== 6) {

      alert("Please enter a valid 6-digit OTP.");

      return;
    }


    try {

      setLoading(true);


      const response = await axios.post(
        "http://localhost:8081/api/registeruser/verify-otp",
        {
          email: formData.email.trim().toLowerCase(),
          otp: otp.trim()
        }
      );


      alert(response.data);

      setEmailVerified(true);


    } catch (error) {

      console.log(error);

      setEmailVerified(false);


      if (error.response) {

        alert(error.response.data);

      } else {

        alert(
          "Unable to connect to server."
        );
      }

    } finally {

      setLoading(false);
    }
  };


  // =========================
  // REGISTER
  // =========================

  const handleSubmit = async (e) => {

    e.preventDefault();


    // Check all fields
    if (
      formData.name.trim() === "" ||
      formData.email.trim() === "" ||
      formData.mobile.trim() === "" ||
      formData.password.trim() === ""
    ) {

      alert("Please fill the full form.");

      return;
    }


    // Email MUST be verified
    if (!emailVerified) {

      alert(
        "Email ID is not verified. Please verify OTP first."
      );

      return;
    }


    try {

      setLoading(true);


      const response = await axios.post(
        "http://localhost:8081/api/registeruser",
        {
          name: formData.name.trim(),
          email: formData.email.trim().toLowerCase(),
          mobile: formData.mobile.trim(),
          password: formData.password,
        }
      );


      // Use backend response
      alert(
        response.data || "Registration Successful!"
      );


      console.log(response.data);


      // Clear form
      setFormData({
        name: "",
        email: "",
        mobile: "",
        password: "",
      });

      setOtp("");
      setOtpSent(false);
      setEmailVerified(false);


    } catch (error) {

      console.log(error);


      if (error.response) {

        alert(
          error.response.data ||
          "Registration failed."
        );

      } else {

        alert(
          "Unable to connect to server."
        );
      }

    } finally {

      setLoading(false);
    }
  };


  return (
    <>
      <Navbar />

      <div
        className="container-fluid d-flex justify-content-center align-items-center"
        style={{
          minHeight: "90vh",
          background: "#e9fcfb",
        }}
      >

        <div
          className="card shadow-lg"
          style={{
            width: "500px",
            borderRadius: "15px",
          }}
        >

          <div className="card-body p-5">

            <h2 className="text-center text-success mb-4">
              Register
            </h2>


            <form onSubmit={handleSubmit}>

              {/* NAME */}

              <input
                type="text"
                name="name"
                className="form-control mb-3"
                placeholder="Name"
                value={formData.name}
                onChange={handleChange}
                required
              />


              {/* EMAIL */}

              <div className="input-group mb-3">

                <input
                  type="email"
                  name="email"
                  className="form-control"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />

                <button
                  type="button"
                  className="btn btn-success"
                  onClick={handleSendOtp}
                  disabled={
                    loading ||
                    emailVerified
                  }
                >

                  {emailVerified
                    ? "Verified ✓"
                    : loading
                    ? "Sending..."
                    : "Send OTP"}

                </button>

              </div>


              {/* OTP */}

              {otpSent && !emailVerified && (

                <div className="mb-3">

                  <div className="input-group">

                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter 6-digit OTP"
                      value={otp}
                      onChange={(e) =>
                        setOtp(
                          e.target.value.replace(
                            /\D/g,
                            ""
                          )
                        )
                      }
                      maxLength="6"
                    />

                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={handleVerifyOtp}
                      disabled={loading}
                    >

                      {loading
                        ? "Verifying..."
                        : "Verify OTP"}

                    </button>

                  </div>

                  <small className="text-muted">
                    OTP is valid for 5 minutes.
                  </small>

                </div>
              )}


              {/* VERIFIED */}

              {emailVerified && (

                <div className="alert alert-success py-2">

                  ✓ Email verified successfully.

                </div>
              )}


              {/* MOBILE */}

              <input
                type="tel"
                name="mobile"
                className="form-control mb-3"
                placeholder="Mobile Number"
                pattern="[0-9]{10}"
                title="Please enter a valid 10-digit mobile number."
                value={formData.mobile}
                onChange={handleChange}
                required
              />


              {/* PASSWORD */}

              <input
                type="password"
                name="password"
                className="form-control mb-3"
                placeholder="Password"
                minLength="8"
                pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&^#()_+=-])[A-Za-z\d@$!%*?&^#()_+=-]{8,}$"
                title="Password must contain uppercase, lowercase, number and special character."
                value={formData.password}
                onChange={handleChange}
                required
              />


              {/* REGISTER */}

              <button
                type="submit"
                className="btn btn-success w-100"
                disabled={
                  !emailVerified ||
                  loading
                }
              >

                {loading
                  ? "Registering..."
                  : "Register"}

              </button>

            </form>


            <div className="text-center mt-3">

              Already have an account?{" "}

              <Link
                to="/login"
                className="text-success fw-bold text-decoration-none"
              >
                Login
              </Link>

            </div>

          </div>

        </div>

      </div>
    </>
  );
}

export default Register;