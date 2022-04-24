import React, { useEffect } from "react";
import Post from "./Post/Post";
import { Grid, CircularProgress, Paper } from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import { getPosts } from "../../redux/actions/posts";

import useStyles from "./styles";

const Posts = () => {
  const dispatch = useDispatch();
  const { posts, isLoading } = useSelector((state) => state.posts);
  const classes = useStyles();

  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);

  if (!posts.length && !isLoading) return "No posts";

  return isLoading ? (
    <Paper elevation={6} className={classes.loadingPaper}>
      <CircularProgress size="7em" />
    </Paper>
  ) : (
    <Grid
      className={classes.mainContainer}
      container
      alignItems="stretch"
      spacing={3}
    >
      {posts.map((post) => (
        <Grid key={post.id} item xs={12} sm={12} md={6} lg={3}>
          <Post post={post} />
        </Grid>
      ))}
    </Grid>
  );
};

export default Posts;
