import postsService from "../../services/posts";
import {
  GET_ALL,
  CREATE,
  UPDATE,
  DELETE,
} from "../../constants/postsActionTypes";

export const getPosts = () => {
  return async (dispatch) => {
    try {
      const { data } = await postsService.fetchPosts();
      dispatch({
        type: GET_ALL,
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
        type: CREATE,
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
        type: UPDATE,
        payload: data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const likePost = (id) => {
  return async (dispatch) => {
    try {
      const { data } = await postsService.likePost(id);
      dispatch({
        type: UPDATE,
        payload: data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const deletePost = (id) => {
  return async (dispatch) => {
    try {
      await postsService.deletePost(id);
      dispatch({
        type: DELETE,
        payload: id,
      });
    } catch (error) {
      console.log(error);
    }
  };
};
