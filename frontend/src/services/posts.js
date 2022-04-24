import axios from "axios";

const url = `${process.env.REACT_APP_API_ENDPOINT}/posts`;

axios.interceptors.request.use((req) => {
  const profile = sessionStorage.getItem("profile");
  if (profile) {
    req.headers.authorization = `Bearer ${JSON.parse(profile).token}`;
  }

  return req;
});

const fetchPosts = (page) => axios.get(`${url}?page=${page}`);

const fetchPostsBySearch = (searchQuery) =>
  axios.get(
    `${url}/search?searchQuery=${searchQuery.search || "none"}&tags=${
      searchQuery.tags
    }`
  );

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
  fetchPostsBySearch,
};

export default postsService;
