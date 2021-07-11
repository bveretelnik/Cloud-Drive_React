import React from "react";
import { Link } from "react-router-dom";
import "./Folder.css";

function Folder({ folder }) {
  return (
    <div className="folder" style={{ padding: "10px" }}>
      <Link
        style={{ textDecoration: "none", color: "black" }}
        to={`/folder/${folder.id}`}
      >
        <div className="folder__back">
          <div className="paper"></div>
          <div className="paper"></div>
          <div className="paper"></div>
          <div className="folder__front"></div>
          <div className="folder__front right"></div>
        </div>
      </Link>
      <span>{folder.name}</span>
    </div>
  );
}

export default Folder;
