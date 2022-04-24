import React, { useEffect } from "react";
import {
  Paper,
  Typography,
  CircularProgress,
  Divider,
  ButtonBase,
  Card,
  CardMedia,
  CardContent,
  Grid,
} from "@material-ui/core/";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { useParams, useNavigate } from "react-router-dom";

import { getPost, getPostsBySearch } from "../../redux/actions/posts";
import useStyles from "./styles";

const Post = () => {
  const { post, posts, isLoading } = useSelector((state) => state.posts);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const classes = useStyles();
  const { id } = useParams();

  useEffect(() => {
    dispatch(getPost(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (post) {
      dispatch(
        getPostsBySearch({ search: "none", tags: post?.tags.join(",") })
      );
    }
  }, [dispatch, post]);

  if (!post) return null;

  const openPost = (_id) => navigate(`/posts/${_id}`);

  if (isLoading) {
    return (
      <Paper elevation={6} className={classes.loadingPaper}>
        <CircularProgress size="7em" />
      </Paper>
    );
  }

  const recommendedPosts = posts.filter(({ id }) => id !== post.id);

  return (
    <Paper style={{ padding: "20px", borderRadius: "15px" }} elevation={6}>
      <div className={classes.card}>
        <div className={classes.section}>
          <Typography variant="h3" component="h2">
            {post.title}
          </Typography>
          <Typography
            gutterBottom
            variant="h6"
            color="textSecondary"
            component="h2"
          >
            {post.tags.map((tag) => `#${tag} `)}
          </Typography>
          <Typography gutterBottom variant="body1" component="p">
            {post.message}
          </Typography>
          <Typography variant="h6">Created by: {post.name}</Typography>
          <Typography variant="body1">
            {moment(post.createdAt).fromNow()}
          </Typography>
          <Divider style={{ margin: "20px 0" }} />
          <Typography variant="body1">
            <strong>Comments - coming soon!</strong>
          </Typography>
          <Divider style={{ margin: "20px 0" }} />
        </div>
        <div className={classes.imageSection}>
          <img
            className={classes.media}
            src={post.selectedFile}
            alt={post.title}
          />
        </div>
      </div>
      {!!recommendedPosts.length && (
        <div className={classes.section}>
          <Typography gutterBottom variant="h5">
            You might also like:
          </Typography>
          <Divider />
          <div className={classes.recommendedPosts}>
            <Grid
              className={classes.mainContainer}
              container
              alignItems="stretch"
              spacing={3}
            >
              {recommendedPosts.map(
                ({
                  title,
                  username,
                  createdAt,
                  message,
                  selectedFile,
                  id,
                  tags,
                }) => (
                  <Grid key={id} item xs={12} sm={6} md={4} lg={3}>
                    <Card className={classes.card2} raised elevation={6}>
                      <ButtonBase
                        component="span"
                        className={classes.cardAction}
                        onClick={() => openPost(id)}
                      >
                        <CardMedia
                          className={classes.media2}
                          image={selectedFile}
                          title={title}
                        />
                        <div className={classes.overlay}>
                          <Typography variant="h6">{username}</Typography>
                          <Typography variant="body2">
                            {moment(createdAt).fromNow()}
                          </Typography>
                        </div>
                        <div className={classes.details}>
                          <Typography variant="body1" color="textSecondary">
                            {tags.map((tag) => `#${tag} `)}
                          </Typography>
                        </div>
                        <Typography
                          className={classes.title}
                          variant="h5"
                          gutterBottom
                        >
                          {title}
                        </Typography>
                        <CardContent>
                          <Typography
                            variant="body2"
                            color="textSecondary"
                            component="p"
                            gutterBottom
                          >
                            {message}
                          </Typography>
                        </CardContent>
                      </ButtonBase>
                    </Card>
                  </Grid>
                )
              )}
            </Grid>
          </div>
        </div>
      )}
    </Paper>
  );
};

export default Post;
