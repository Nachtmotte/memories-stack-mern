import React from "react";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
  ButtonBase,
} from "@material-ui/core";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { setPostToEdit } from "../../../redux/actions/postToEdit";
import { deletePost, likePost } from "../../../redux/actions/posts";

import useStyles from "./styles";
import Likes from "./Likes";
import OptionsButton from "./OptionsButton";

const Post = ({ post }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const classes = useStyles();
  const user = useSelector((state) => state.auth.authData);

  const handleEditPost = () => {
    dispatch(setPostToEdit(post));
  };

  const handleLikePost = () => {
    dispatch(likePost(post.id));
  };

  const handleDeletePost = () => {
    dispatch(deletePost(post.id));
  };

  const openPost = () => {
    navigate(`/posts/${post.id}`);
  };

  return (
    <Card className={classes.card} raised elevation={6}>
      <ButtonBase
        component="span"
        className={classes.cardAction}
        onClick={openPost}
      >
        <CardMedia
          className={classes.media}
          image={post.selectedFile}
          title={post.title}
        />
        <div className={classes.overlay}>
          <Typography variant="h6">{post.username}</Typography>
          <Typography variant="body2">
            {moment(post.createdAt).fromNow()}
          </Typography>
        </div>
        <div className={classes.details}>
          <Typography variant="body1" color="textSecondary">
            {post.tags.map((tag) => `#${tag} `)}
          </Typography>
        </div>
        <Typography className={classes.title} variant="h5" gutterBottom>
          {post.title}
        </Typography>
        <CardContent>
          <Typography
            variant="body2"
            color="textSecondary"
            component="p"
            gutterBottom
          >
            {post.message}
          </Typography>
        </CardContent>
      </ButtonBase>
      <CardActions className={classes.cardActions}>
        <Button
          size="small"
          color="primary"
          disabled={!user?.result}
          onClick={handleLikePost}
        >
          <Likes post={post} />
        </Button>
        {(user?.result?.googleId === post?.creatorId ||
          user?.result?.id === post?.creatorId) && (
          <OptionsButton
            handleEditPost={handleEditPost}
            handleDeletePost={handleDeletePost}
          />
        )}
      </CardActions>
    </Card>
  );
};

export default Post;
