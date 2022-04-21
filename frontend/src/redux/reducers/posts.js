const initialState = [];

const reducer = (posts = initialState, action) => {
  switch (action.type) {
    case "@posts/getall":
      return action.payload;
    case "@posts/create":
      return [...posts, action.payload];
    case "@posts/update":
      return posts.map((post) =>
        post.id === action.payload.id ? action.payload : post
      );
    case "@posts/delete":
      return posts.filter((post) => post.id !== action.payload);
    default:
      return posts;
  }
};

export default reducer;
