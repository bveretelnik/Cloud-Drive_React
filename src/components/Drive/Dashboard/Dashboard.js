import React from "react";
import "./Dashboard.css";
import AddFileButton from "./AddFileButton/AddFileButton";
import AddFolderButton from "./AddFolderButton/AddFolderButton";
import NavBar from "./NavBar/NavBar";
import { useFolder } from "../../../hooks/useFolder";
import Folder from "./Folder/Folder";
import { useParams } from "react-router-dom";
import FolderBreadcrumbs from "./FolderBreadcrumbs/FolderBreadcrumbs";
import File from "../File/File";

function Dashboard() {
  const { folderId } = useParams();
  const { folder, childFolders, childFiles } = useFolder(folderId);

  return (
    <>
      <NavBar />
      <div className="db_container">
        <FolderBreadcrumbs currentFolder={folder} />
        <AddFolderButton currentFolder={folder} />
        <AddFileButton currentFolder={folder} />
      </div>

      {childFolders.length > 0 && (
        <div className="folder_container">
          {childFolders.map((childFolder) => (
            <div key={childFolder.id}>
              <Folder folder={childFolder} />
            </div>
          ))}
        </div>
      )}
      {childFolders.length > 0 && childFiles.length > 0 && <hr />}
      {childFiles.length > 0 && (
        <div className="file_component">
          {childFiles.map((childFile) => (
            <File key={childFile.id} file={childFile} />
          ))}
        </div>
      )}
    </>
  );
}

export default Dashboard;
