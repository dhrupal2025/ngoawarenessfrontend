import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useState } from "react";
import "./Login.css";
import axios from "axios";

function Login() {

  const navigate = useNavigate();

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      loginData.email.trim() === "" ||
      loginData.password.trim() === ""
    ) {
      alert("Please enter Email and Password");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:8081/api/registeruser/login",
        loginData
      );

alert("Login Successful");

// Save the email entered by the user
localStorage.setItem("userEmail", loginData.email);

// Check if admin
if (loginData.email === "pdhrupal996@gmail.com") {

    localStorage.setItem("userRole", "ADMIN");

    navigate("/admin-home");

} else {

    localStorage.setItem("userRole", "USER");

    navigate("/customer-home");

}

    } catch (error) {

      console.log(error);

      if (error.response) {
        alert(error.response.data);
      } else {
        alert("Server Not Running");
      }

    }
  };

  return (
    <>
      <Navbar />

      <div className="login-page">

        <div className="login-card">

          <div className="login-left">

            <h1>NGO Awareness</h1>

            <p>
              Together we can create awareness and make the world a better place.
            </p>

            <img
              src="https://cdn-icons-png.flaticon.com/512/2917/2917995.png"
              alt="ngo"
            />

          </div>

          <div className="login-right">

            <h2>Welcome Back 👋</h2>

            <p>Login to continue</p>

            <form onSubmit={handleSubmit}>

              <div className="input-box">

                <span>📧</span>

                <input
                  type="email"
                  name="email"
                  className="form-control mb-3"
                  placeholder="Email"
                  value={loginData.email}
                  onChange={handleChange}
                  required
                />

              </div>

              <div className="input-box">

                <span>🔒</span>

                <input
                  type="password"
                  name="password"
                  className="form-control mb-3"
                  placeholder="Password"
                  value={loginData.password}
                  onChange={handleChange}
                  required
                />

              </div>

              <div className="options">

                <label>
                  <input type="checkbox" />
                  Remember Me
                </label>

                <Link to="/forgot-password">
                  Forgot Password?
                </Link>

              </div>

              <button type="submit" className="login-btn">
                Login
              </button>

            </form>

            <div className="divider">
              OR
            </div>

            <button className="google-btn">
              Continue with Google
            </button>

            <p className="register-text">

              Don't have an account?

              <Link to="/register">
                Register
              </Link>

            </p>

          </div>

        </div>

      </div>

    </>
  );
}

export default Login;