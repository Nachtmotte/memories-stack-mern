import { SET, CLEAR } from "../../constants/postToEditActionTypes";
const initialState = null;

const reducer = (post = initialState, action) => {
  switch (action.type) {
    case SET:
      return action.payload;
    case CLEAR:
      return initialState;
    default:
      return post;
  }
};

export default reducer;
