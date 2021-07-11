import React from "react";
import "./Dashboard.css";
import AddFileButton from "./AddFileButton/AddFileButton";
import AddFolderButton from "./AddFolderButton/AddFolderButton";
import NavBar from "./NavBar/NavBar";
import { useFolder } from "../../../hooks/useFolder";
import Folder from "./Folder/Folder";
import { useParams } from "react-router-dom";
import FolderBreadcrumbs from "./FolderBreadcrumbs/FolderBreadcrumbs";

function Dashboard() {
  const { folderId } = useParams();
  const { folder, childFolders } = useFolder(folderId);

  return (
    <>
      <NavBar />
      <div className="db_container">
        <FolderBreadcrumbs currentFolder={folder} />
        <AddFolderButton currentFolder={folder} />
        <AddFileButton />
      </div>
      {childFolders.length > 0 && (
        <div
          style={{ display: "flex", alignItems: "center", padding: "2px 14px" }}
        >
          {childFolders.map((childFolder) => (
            <div key={childFolder.id} style={{ maxWidth: "250px" }}>
              <Folder folder={childFolder} />
            </div>
          ))}
        </div>
      )}
    </>
  );
}

export default Dashboard;
