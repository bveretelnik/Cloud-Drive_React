import React, { useState } from "react";
import "./AddFolderButton.css";
import { AiFillFolderAdd } from "react-icons/ai";
import { database } from "../../../../firebase";
import { useAuth } from "../../../../contexts/AuthContext";
import { ROOT_FOLDER } from "../../../../hooks/useFolder";

function AddFolderButton({ currentFolder }) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const { currentUser } = useAuth();

  const openModal = () => {
    setOpen(true);
  };
  const closeModal = () => {
    setOpen(false);
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    if (currentFolder === null) return;

    const path = [...currentFolder.path];
    if (currentFolder !== ROOT_FOLDER) {
      path.push({ name: currentFolder.name, id: currentFolder.id });
    }

    database.folders.add({
      name: name,
      parentId: currentFolder.id,
      userId: currentUser.uid,
      path: path,
      createdAt: database.getCurrentTimestamp(),
    });

    setName("");
    closeModal();
  };

  return (
    <>
      <div style={{ padding: "5px 5px" }}>
        <button type="button" className="button_folder" onClick={openModal}>
          <span className="button_folder_text">Add folder</span>
          <span className="button_folder_icon">
            <AiFillFolderAdd />
          </span>
        </button>
      </div>
      {open && (
        <div className="bg_modal">
          <div className="modal_contents">
            <div className="close" onClick={closeModal}>
              +
            </div>

            <form action="" onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <button className="button_folder">
                <span className="button_folder_text">Add</span>
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default AddFolderButton;
