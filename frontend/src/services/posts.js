import axios from "axios";

const url = `${process.env.REACT_APP_API_ENDPOINT}/posts`;

const fetchPosts = () => axios.get(url);
const createPost = (newPost) => axios.post(url, newPost);

const postsService = { fetchPosts, createPost };

export default postsService;
