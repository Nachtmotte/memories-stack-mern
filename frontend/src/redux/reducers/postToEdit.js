const initialState = null;

const reducer = (post = initialState, action) => {
  switch (action.type) {
    case "SET_POST_EDIT":
      return action.payload;
    case "CLEAR_POST_EDIT":
      return initialState;
    default:
      return post;
  }
};

export default reducer;
