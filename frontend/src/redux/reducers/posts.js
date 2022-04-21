import {
  GET_ALL,
  CREATE,
  UPDATE,
  DELETE,
} from "../../constants/postsActionTypes";
const initialState = [];

const reducer = (posts = initialState, action) => {
  switch (action.type) {
    case GET_ALL:
      return action.payload;
    case CREATE:
      return [...posts, action.payload];
    case UPDATE:
      return posts.map((post) =>
        post.id === action.payload.id ? action.payload : post
      );
    case DELETE:
      return posts.filter((post) => post.id !== action.payload);
    default:
      return posts;
  }
};

export default reducer;
