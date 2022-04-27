import {
  GET_ALL,
  /*CREATE,
  DELETE,*/
  UPDATE,
  GET_ALL_SEARCH,
  START_LOADING,
  END_LOADING,
  GET_POST,
} from "../../constants/postsActionTypes";
const initialState = {
  posts: [],
  currentPage: 1,
  numberOfPages: 1,
  isLoading: false,
  post: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case START_LOADING:
      return { ...state, isLoading: true };
    case END_LOADING:
      return { ...state, isLoading: false };
    case GET_ALL:
      return {
        ...state,
        posts: action.payload.data,
        currentPage: action.payload.currentPage,
        numberOfPages: action.payload.numberOfPages,
      };
    case GET_POST:
      return { ...state, post: action.payload };
    case GET_ALL_SEARCH:
      return {
        ...state,
        posts: action.payload.data,
        currentPage: action.payload.currentPage,
        numberOfPages: action.payload.numberOfPages,
      };
    /*case CREATE:
      return { ...state, posts: [...state.posts, action.payload] };*/
    case UPDATE:
      return {
        ...state,
        posts: state.posts.map((post) =>
          post.id === action.payload.id ? action.payload : post
        ),
      };
    /*case DELETE:
      return {
        ...state,
        posts: state.posts.filter((post) => post.id !== action.payload),
      };*/
    default:
      return state;
  }
};

export default reducer;
