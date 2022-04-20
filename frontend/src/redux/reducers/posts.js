const initialState = [];

const reducer = (posts = initialState, action) => {
  switch (action.type) {
    case "FETCH_ALL":
      return action.payload;
    default:
      return posts;
  }
};

export default reducer;
