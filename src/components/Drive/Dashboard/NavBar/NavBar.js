import React from "react";
import "./NavBar.css";
import { Link, useHistory } from "react-router-dom";
import { useAuth } from "../../../../contexts/AuthContext";
import cloud_logo from "../../../../assets/img/cloud_logo.png";

function NavBar() {
  const { currentUser, logout } = useAuth();
  const history = useHistory();
  const toggleClass = () => {
    document.querySelector(".navbar_links").classList.toggle("active");
  };

  const handleLogout = async () => {
    try {
      await logout();
      history.push("/login");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <nav className="navbar">
      <div className="brand_title">
        <img src={cloud_logo} alt="Logo" />
        <Link style={{ textDecoration: "none", color: "black" }} to="/">
          Cloud Drive
        </Link>
      </div>

      <a href="#/" className="toggle_button" onClick={toggleClass}>
        <span className="bar"></span>
        <span className="bar"></span>
        <span className="bar"></span>
      </a>
      <div className="navbar_links">
        <ul>
          <li>
            <a href="#/" style={{ color: "green" }}>
              {currentUser.email}
            </a>
          </li>
          <li onClick={handleLogout}>
            <a href="#/">Sing out</a>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default NavBar;
