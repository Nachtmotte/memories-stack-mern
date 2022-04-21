export const setPostToEdit = (post) => {
  return {
    type: "@postToEdit/set",
    payload: post,
  };
};

export const clearPostToEdit = () => {
  return {
    type: "@postToEdit/clear",
    payload: null,
  };
};
