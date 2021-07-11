import React, { useRef, useState } from "react";
import { Alert } from "react-bootstrap";
import "./Login.css";
import { useAuth } from "../../../contexts/AuthContext";
import { Link, useHistory } from "react-router-dom";

export default function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { login } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);
      await login(emailRef.current.value, passwordRef.current.value);
      history.push("/");
    } catch {
      setError("Failed to log in");
    }

    setLoading(false);
  }

  return (
    <>
      <div className="login_center">
        <h1>Login</h1>
        {error && <Alert variant="danger">{error}</Alert>}
        <form onSubmit={handleSubmit}>
          <div className="txt_field">
            <input type="email" required ref={emailRef} />
            <span></span>
            <label>Email</label>
          </div>
          <div className="txt_field">
            <input type="password" required ref={passwordRef} />
            <span></span>
            <label>Password</label>
          </div>
          <input disabled={loading} type="submit" value="Login" />
          <div className="signup_link">
            Dont have account? <Link to="/signup">Sign Up</Link>
          </div>
        </form>
      </div>
    </>
  );
}
