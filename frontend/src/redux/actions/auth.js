import { GOOGLE_SINGIN, LOGOUT, SINGIN } from "../../constants/authActionTypes";
import usersService from "../../services/users";

export const signin = (credentials, navigate) => {
  return async (dispatch) => {
    try {
      const { data } = await usersService.signin(credentials);
      dispatch({
        type: SINGIN,
        payload: data,
      });
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };
};

export const signup = (formData, navigate) => {
  return async (dispatch) => {
    try {
      const { data } = await usersService.signup(formData);
      dispatch({
        type: SINGIN,
        payload: data,
      });
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };
};

export const googleLogin = (result, token) => {
  return {
    type: GOOGLE_SINGIN,
    payload: { result, token },
  };
};

export const logout = () => {
  return {
    type: LOGOUT,
    payload: null,
  };
};
