import axios from "axios";

const url = `${process.env.REACT_APP_API_ENDPOINT}/posts`;

const fetchPosts = () => axios.get(url);

const postsService = { fetchPosts };

export default postsService;
