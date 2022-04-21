import axios from "axios";

const url = `${process.env.REACT_APP_API_ENDPOINT}/posts`;

const fetchPosts = () => axios.get(url);
const createPost = (newPost) => axios.post(url, newPost);
const updatePost = (id, updatedPost) =>
  axios.patch(`${url}/${id}`, updatedPost);
const deletePost = (id) => axios.delete(`${url}/${id}`);

const postsService = { fetchPosts, createPost, updatePost, deletePost };

export default postsService;
