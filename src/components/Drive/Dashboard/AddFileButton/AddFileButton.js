import React, { useState } from "react";
import "./AddFileButton.css";
import ReactDOM from "react-dom";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { useAuth } from "../../../../contexts/AuthContext";
import { storage, database } from "../../../../firebase";
import { v4 as uuidV4 } from "uuid";
import { ROOT_FOLDER } from "../../../../hooks/useFolder";

import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import ChangingProgressProvider from "./ChangingProgressProvider";

function AddFileButton({ currentFolder }) {
  const [uploadingFiles, setUploadingFiles] = useState([]);
  const { currentUser } = useAuth();

  function handleUpload(e) {
    const file = e.target.files[0];

    if (currentFolder == null || file == null) return;
    const id = uuidV4();

    setUploadingFiles((prevUploadingFiles) => [
      ...prevUploadingFiles,
      { id: id, name: file.name, progress: 0, error: false },
    ]);
    const filePath =
      currentFolder === ROOT_FOLDER
        ? `${currentFolder.path.join("/")}/${file.name}`
        : `${currentFolder.path.join("/")}/${currentFolder.name}/${file.name}`;

    const uploadTask = storage
      .ref(`/files/${currentUser.uid}/${filePath}`)
      .put(file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = snapshot.bytesTransferred / snapshot.totalBytes;
        setUploadingFiles((prevUploadingFiles) => {
          return prevUploadingFiles.map((uploadFile) => {
            if (uploadFile.id === id) {
              return { ...uploadFile, progress: progress };
            }

            return uploadFile;
          });
        });
      },
      () => {
        setUploadingFiles((prevUploadingFiles) => {
          return prevUploadingFiles.map((uploadFile) => {
            if (uploadFile.id === id) {
              return { ...uploadFile, error: true };
            }
            return uploadFile;
          });
        });
      },
      () => {
        setUploadingFiles((prevUploadingFiles) => {
          return prevUploadingFiles.filter((uploadFile) => {
            return uploadFile.id !== id;
          });
        });

        uploadTask.snapshot.ref.getDownloadURL().then((url) => {
          database.files
            .where("name", "==", file.name)
            .where("userId", "==", currentUser.uid)
            .where("folderId", "==", currentFolder.id)
            .get()
            .then((existingFiles) => {
              const existingFile = existingFiles.docs[0];
              if (existingFile) {
                existingFile.ref.update({ url: url });
              } else {
                database.files.add({
                  url: url,
                  name: file.name,
                  createdAt: database.getCurrentTimestamp(),
                  folderId: currentFolder.id,
                  userId: currentUser.uid,
                });
              }
            });
        });
      }
    );
  }

  return (
    <>
      <div style={{ padding: "5px 5px" }}>
        <input
          type="file"
          name="file"
          id="file"
          onChange={(e) => handleUpload(e)}
        />
        <label className="file_input" htmlFor="file">
          Choose file{" "}
          <span className="button_file_icon">
            <AiOutlineCloudUpload />
          </span>
        </label>
        {uploadingFiles.length > 0 &&
          ReactDOM.createPortal(
            <div
              style={{
                position: "absolute",
                bottom: "1rem",
                right: "1rem",
                maxWidth: "100px",
              }}
            >
              {uploadingFiles.map((file) => (
                <ChangingProgressProvider key={file.id} values={[0, 100]}>
                  {(progress) => (
                    <CircularProgressbar
                      value={progress}
                      text={`${progress}%`}
                      styles={buildStyles({
                        pathTransition:
                          progress === 0
                            ? "none"
                            : "stroke-dashoffset 0.5s ease 0s",
                      })}
                    />
                  )}
                </ChangingProgressProvider>
              ))}
            </div>,
            document.body
          )}
      </div>
    </>
  );
}

export default AddFileButton;
