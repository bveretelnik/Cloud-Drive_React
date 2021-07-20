import React, { useState } from "react";
import "./Login.css";
import { useAuth } from "../../../contexts/AuthContext";
import { Link, useHistory } from "react-router-dom";
import AlertError from "../AlertError/AlertError";
import { AiOutlineGoogle } from "react-icons/ai";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, loginWithGoogle } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  async function handleLoginGoogle() {
    await loginWithGoogle();
    history.push("/");
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);
      await login(email, password);
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
        {error && <AlertError error={error}></AlertError>}
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
          <input disabled={loading} type="submit" value="Login" />
          <div className="signup_link">
            Dont have account? <Link to="/signup">Sign Up</Link>
          </div>
        </form>
        <div className="login_auth">
          <div className="login__container">
            <h2>Sign in with Google </h2>

            <button className="login_google_btn" onClick={handleLoginGoogle}>
              Sing in{" "}
              <span>
                <AiOutlineGoogle />
              </span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
