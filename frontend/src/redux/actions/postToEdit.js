import { SET, CLEAR } from "../../constants/postToEditActionTypes";

export const setPostToEdit = (post) => {
  return {
    type: SET,
    payload: post,
  };
};

export const clearPostToEdit = () => {
  return {
    type: CLEAR,
    payload: null,
  };
};
