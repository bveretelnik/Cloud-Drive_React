import React from "react";
import "./AddFileButton.css";
import { AiOutlineCloudUpload } from "react-icons/ai";

function AddFileButton() {
  return (
    <>
      <div style={{ padding: "5px" }}>
        <input type="file" name="file" id="file" />
        <label className="file_input" htmlFor="file">
          Choose file{" "}
          <span className="button_file_icon">
            <AiOutlineCloudUpload />
          </span>
        </label>
      </div>
    </>
  );
}

export default AddFileButton;
