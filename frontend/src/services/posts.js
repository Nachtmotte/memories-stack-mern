import axios from "axios";

const url = `${process.env.REACT_APP_API_ENDPOINT}/posts`;

axios.interceptors.request.use((req) => {
  const profile = sessionStorage.getItem("profile");
  if (profile) {
    req.headers.authorization = `Bearer ${JSON.parse(profile).token}`;
  }

  return req;
});

const fetchPosts = () => axios.get(url);

const createPost = (newPost) => axios.post(url, newPost);

const updatePost = (id, updatedPost) =>
  axios.patch(`${url}/${id}`, updatedPost);

const deletePost = (id) => axios.delete(`${url}/${id}`);

const likePost = (id) => axios.patch(`${url}/${id}/likePost`);

const postsService = {
  fetchPosts,
  createPost,
  updatePost,
  deletePost,
  likePost,
};

export default postsService;
