import React, { useState } from "react";
import "./Signup.css";
import { useAuth } from "../../../contexts/AuthContext";
import { Link, useHistory } from "react-router-dom";
import AlertError from "../AlertError/AlertError";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const { signup } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  async function handleSubmit(e) {
    e.preventDefault();

    if (password !== passwordConfirm) {
      return setError("Passwords do not match");
    }

    try {
      setError("");
      setLoading(true);
      await signup(email, password);
      history.push("/");
    } catch {
      setError("Failed to create an account");
    }

    setLoading(false);
  }

  return (
    <>
      <div className="signup_center">
        <h1>Sign Up</h1>
        {error && <AlertError error={error} />}
        <form onSubmit={handleSubmit}>
          <div className="txt_field">
            <input
              type="email"
              required
              onChange={(e) => setEmail(e.target.value)}
            />
            <span></span>
            <label>Email</label>
          </div>
          <div className="txt_field">
            <input
              type="password"
              required
              onChange={(e) => setPassword(e.target.value)}
            />
            <span></span>
            <label>Password</label>
          </div>
          <div className="txt_field">
            <input
              type="password"
              required
              onChange={(e) => setPasswordConfirm(e.target.value)}
            />
            <span></span>
            <label>Password Confirmation</label>
          </div>
          <input disabled={loading} type="submit" value="Sign Up" />
          <div className="login_link">
            Already have an account? <Link to="/login">Log In</Link>
          </div>
        </form>
      </div>
    </>
  );
}
