import postsService from "../../services/posts";
import {
  GET_ALL,
  CREATE,
  UPDATE,
  DELETE,
  GET_ALL_SEARCH,
  START_LOADING,
  END_LOADING,
  GET_POST,
} from "../../constants/postsActionTypes";

export const getPost = (id) => {
  return async (dispatch) => {
    try {
      dispatch({ type: START_LOADING });
      const { data } = await postsService.fetchPost(id);
      dispatch({
        type: GET_POST,
        payload: data,
      });
      dispatch({ type: END_LOADING });
    } catch (error) {
      console.log(error);
    }
  };
};

export const getPosts = (page) => {
  return async (dispatch) => {
    try {
      dispatch({ type: START_LOADING });
      const { data } = await postsService.fetchPosts(page);
      dispatch({
        type: GET_ALL,
        payload: data,
      });
      dispatch({ type: END_LOADING });
    } catch (error) {
      console.log(error);
    }
  };
};

export const getPostsBySearch = (searchQuery) => {
  return async (dispatch) => {
    try {
      dispatch({ type: START_LOADING });
      const { data } = await postsService.fetchPostsBySearch(searchQuery);
      dispatch({
        type: GET_ALL_SEARCH,
        payload: data,
      });
      dispatch({ type: END_LOADING });
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

export const commentPost = (value, id) => {
  return async (dispatch) => {
    try {
      const { data } = await postsService.commentPost(value, id);
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
