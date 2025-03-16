import "./register.css";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
  const navigate = useNavigate();

  async function register(e) {
    e.preventDefault();
    const response = await fetch(
      `${process.env.REACT_APP_SERVER_URL}/auth/register`,
      {
        method: "POST",
        body: JSON.stringify({ username, password }),
        headers: { "Content-type": "application/json" },
      }
    );
    if (response.status === 200) return navigate("/login");
    else alert("Registration failed.");
  }

  return (
    <div className="register-container">
      <div className="register-box">
        <div className="register-header">
          <img
            src="/register-icon.png" // Path to your PNG file
            alt="Register Icon"
            className="register-icon"
          />
          <h1 className="glitch" data-text="Register">
            Register
          </h1>
        </div>

        <form onSubmit={register} className="register-form">
          <div className="input-group">
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
              className="register-input"
              required
            />
          </div>

          <div className="input-group password-group">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="register-input"
              required
            />
            <i
              className={`password-toggle fa ${
                showPassword ? "fa-eye-slash" : "fa-eye"
              }`}
              onClick={() => setShowPassword(!showPassword)}
            ></i>
          </div>

          <button type="submit" className="register-button">
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
