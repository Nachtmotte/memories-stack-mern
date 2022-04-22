import { LOGOUT, SET_USER, SINGIN } from "../../constants/authActionTypes";
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
    type: SINGIN,
    payload: { result, token },
  };
};

export const getSession = () => {
  const user = JSON.parse(sessionStorage.getItem("profile"));
  return {
    type: SET_USER,
    payload: user,
  };
};

export const logout = () => {
  return {
    type: LOGOUT,
    payload: null,
  };
};
