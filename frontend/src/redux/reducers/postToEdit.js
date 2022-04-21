const initialState = null;

const reducer = (post = initialState, action) => {
  switch (action.type) {
    case "@postToEdit/set":
      return action.payload;
    case "@postToEdit/clear":
      return initialState;
    default:
      return post;
  }
};

export default reducer;
