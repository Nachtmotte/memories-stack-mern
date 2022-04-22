import { LOGOUT, SET_USER, SINGIN } from "../../constants/authActionTypes";
const initialState = { authData: null };

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SINGIN:
      sessionStorage.setItem("profile", JSON.stringify({ ...action?.payload }));
      return { ...state, authData: action?.payload };
    case SET_USER:
      return { ...state, authData: action?.payload };
    case LOGOUT:
      sessionStorage.clear();
      return initialState;
    default:
      return state;
  }
};

export default reducer;
