const initialState = [];

const reducer = (posts = initialState, action) => {
  switch (action.type) {
    case "FETCH_ALL":
      return action.payload;
    case "CREATE":
      return [...posts, action.payload];
    case "UPDATE":
      return posts.map((post) =>
        post.id === action.payload.id ? action.payload : post
      );
    default:
      return posts;
  }
};

export default reducer;
