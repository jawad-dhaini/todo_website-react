import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();

  async function registerUser() {
    try {
      const res = await fetch("http://localhost:5000/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });
      const data = await res.json();
      return data;
    } catch (err) {
      console.log(err);
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setEmail("");
    setPassword("");
    setConfirmPassword("");

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    const token = await registerUser();
    if (token.error) return;
    navigate("/login");
  };

  return (
    <div className="login-wrapper">
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        <p className="label">Email</p>
        <input
          type="text"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />{" "}
        <p className="label">Password</p>
        <input
          type="password"
          placeholder="Eassword"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <p className="label">Confirm Password</p>
        <input
          type="password"
          placeholder="Confirm password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
      <p className="have-account">
        Already have an account? <a href="/login">Login now!</a>
      </p>
    </div>
  );
};

export default Register;
