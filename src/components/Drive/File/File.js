import React from "react";
import "./File.css";
import { AiFillFile } from "react-icons/ai";

function File({ file }) {
  const fileName = file.name.split(".");

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
        {fileName[0].length > 15
          ? `${fileName[0].substring(0, 10)}.../.${fileName[1]}`
          : file.name}
      </a>
    </div>
  );
}

export default File;
