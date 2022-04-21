import postsService from "../../services/posts";

export const getPosts = () => {
  return async (dispatch) => {
    try {
      const { data } = await postsService.fetchPosts();
      dispatch({
        type: "@posts/getall",
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
        type: "@posts/create",
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
        type: "@posts/update",
        payload: data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const deletePost = (id) => {
  return async (dispatch) => {
    try{
      await postsService.deletePost(id);
      dispatch({
        type: "@posts/delete",
        payload: id,
      });
    }catch(error){
      console.log(error);
    }
  }
}
