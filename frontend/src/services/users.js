import axios from "axios";

const url = `${process.env.REACT_APP_API_ENDPOINT}/users`;

const signin = (credentials) => axios.post(`${url}/signin`, credentials);
const signup = (newUserData) => axios.post(`${url}/signup`, newUserData);

const usersService = { signin, signup };

export default usersService;
