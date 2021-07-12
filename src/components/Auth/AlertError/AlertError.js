import React from "react";
import "./AlertError.css";

function AlertError({ error }) {
  const closeAlert = () => {
    const alert = document.querySelector(".alert");
    alert.style.display = "none";
  };
  return (
    <div className="alert">
      <span className="close_btn" onClick={closeAlert}>
        &times;
      </span>
      {error}
    </div>
  );
}

export default AlertError;
