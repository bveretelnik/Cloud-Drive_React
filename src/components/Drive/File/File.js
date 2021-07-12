import React from "react";
import "./File.css";
import { AiFillFile } from "react-icons/ai";

function File() {
  return (
    <a href="#" target="_blank" className="file_btn">
      <span>
        <AiFillFile />
      </span>
      File Name
    </a>
  );
}

export default File;
