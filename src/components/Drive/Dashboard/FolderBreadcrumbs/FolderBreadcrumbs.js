import React from "react";
import { Link } from "react-router-dom";
import { ROOT_FOLDER } from "../../../../hooks/useFolder";
import "./FolderBreadcrumbs.css";

function FolderBreadcrumbs({ currentFolder }) {
  let path = currentFolder === ROOT_FOLDER ? [] : [ROOT_FOLDER];
  if (currentFolder) path = [...path, ...currentFolder.path];
  return (
    <>
      <ul className="breadcrumb">
        {path &&
          path.map((folder, index) => (
            <li key={folder.id}>
              <Link
                to={{
                  pathname: folder.id ? `/folder/${folder.id}` : "/",
                  state: { folder: { ...folder, path: path.slice(1, index) } },
                }}
                style={{ maxWidth: "150px" }}
              >
                {folder.name.length > 8
                  ? `${folder.name.substring(0, 8)}...`
                  : folder.name}
              </Link>
            </li>
          ))}
        {currentFolder && (
          <li style={{ maxWidth: "200px" }}>
            {currentFolder.name.length > 8
              ? `${currentFolder.name.substring(0, 8)}...`
              : currentFolder.name}
          </li>
        )}
      </ul>
    </>
  );
}

export default FolderBreadcrumbs;
