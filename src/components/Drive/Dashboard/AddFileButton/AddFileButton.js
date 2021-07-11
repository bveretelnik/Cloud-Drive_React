import React from "react";
import "./AddFileButton.css";
import { AiFillFileAdd } from "react-icons/ai";

function AddFileButton() {
  return (
    <>
      <div style={{ padding: "5px 5px" }}>
        <button type="button" className="button_file">
          <span className="button_file_text">Add file</span>
          <span className="button_file_icon">
            <AiFillFileAdd />
          </span>
        </button>
      </div>
    </>
  );
}

export default AddFileButton;
