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
      console.log(error);
    }
  };
};

export const createPost = (post) => {
  return async (dispatch) => {
    try {
      const { data } = await postsService.createPost(post);
      dispatch({
        type: "CREATE",
        payload: data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const updatePost = (id, post) => {
  return async (dispatch) => {
    try {
      const { data } = await postsService.updatePost(id, post);
      dispatch({
        type: "UPDATE",
        payload: data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};
