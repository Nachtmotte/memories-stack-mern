import axios from "axios";

const url = `${process.env.REACT_APP_API_ENDPOINT}/posts`;

axios.interceptors.request.use((req) => {
  const profile = sessionStorage.getItem("profile");
  if (profile) {
    req.headers.authorization = `Bearer ${JSON.parse(profile).token}`;
  }

  return req;
});

const fetchPost = (id) => axios.get(`${url}/${id}`);

const fetchPosts = (page) => axios.get(`${url}?page=${page}`);

const fetchPostsBySearch = (searchQuery) =>
  axios.get(
    `${url}/search?searchQuery=${searchQuery.search}&tags=${searchQuery.tags}&page=${searchQuery.page}`
  );

const createPost = (newPost) => axios.post(url, newPost);

const updatePost = (id, updatedPost) =>
  axios.patch(`${url}/${id}`, updatedPost);

const deletePost = (id) => axios.delete(`${url}/${id}`);

const likePost = (id) => axios.patch(`${url}/${id}/likePost`);

const commentPost = (value, id) =>
  axios.post(`${url}/${id}/commentPost`, { value });

const postsService = {
  fetchPost,
  fetchPosts,
  createPost,
  updatePost,
  deletePost,
  likePost,
  fetchPostsBySearch,
  commentPost,
};

export default postsService;
