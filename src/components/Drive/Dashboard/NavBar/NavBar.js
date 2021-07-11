import React from "react";
import "./NavBar.css";
import { Link } from "react-router-dom";

function NavBar() {
  const toggleClass = () => {
    document.querySelector(".navbar_links").classList.toggle("active");
  };
  return (
    <nav className="navbar">
      <div className="brand_title">Cloud Drive</div>
      <a href="#" className="toggle_button" onClick={toggleClass}>
        <span className="bar"></span>
        <span className="bar"></span>
        <span className="bar"></span>
      </a>
      <div className="navbar_links">
        <ul>
          <li>
            <Link to="/login">Profile</Link>
          </li>
          <li>
            <Link to="/">Profile</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default NavBar;
