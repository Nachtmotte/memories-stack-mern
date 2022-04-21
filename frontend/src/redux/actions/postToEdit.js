export const setPostToEdit = (post) => {
  return {
    type: "SET_POST_EDIT",
    payload: post,
  };
};

export const clearPostToEdit = () => {
  return {
    type: "CLEAR_POST_EDIT",
    payload: null,
  };
};
