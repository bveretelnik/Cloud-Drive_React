import {
  SELECT_FOLDER,
  SET_CHILD_FILES,
  SET_CHILD_FOLDERS,
  UPDATE_FOLDER,
} from "./types";

export const reducer = (state, { type, payload }) => {
  switch (type) {
    case SELECT_FOLDER:
      return {
        folderId: payload.folderId,
        folder: payload.folder,
        childFiles: [],
        childFolders: [],
      };
    case UPDATE_FOLDER:
      return {
        ...state,
        folder: payload.folder,
      };
    case SET_CHILD_FOLDERS:
      return {
        ...state,
        childFolders: payload.childFolders,
      };
    case SET_CHILD_FILES:
      return {
        ...state,
        childFiles: payload.childFiles,
      };
    default:
      return state;
  }
};
