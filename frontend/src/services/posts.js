import axios from "axios";

const url = `${process.env.REACT_APP_API_ENDPOINT}/posts`;

const fetchPosts = () => axios.get(url);
const createPost = (newPost) => axios.post(url, newPost);
const updatePost = (id, updatedPost) =>
  axios.patch(`${url}/${id}`, updatedPost);

const postsService = { fetchPosts, createPost, updatePost };

export default postsService;
