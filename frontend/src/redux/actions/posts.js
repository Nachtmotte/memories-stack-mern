import postsService from "../../services/posts";

export const getPosts = () => {
  return async (dispatch) => {
    try {
      const { data } = await postsService.fetchPosts();
      dispatch({
        type: "FETCH_ALL",
        payload: data,
      });
    } catch (error) {
      console.log(error.message);
    }
  };
};
