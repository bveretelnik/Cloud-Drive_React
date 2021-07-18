import React from "react";
import "./File.css";
import { AiFillFile } from "react-icons/ai";

function File({ file }) {
  return (
    <div
      style={{
        padding: "15px",
      }}
    >
      <a
        href={file.url}
        target="_blank"
        rel="noopener noreferrer"
        className="file_btn"
      >
        <span>
          <AiFillFile />
        </span>
        {file.name}
      </a>
    </div>
  );
}

export default File;
