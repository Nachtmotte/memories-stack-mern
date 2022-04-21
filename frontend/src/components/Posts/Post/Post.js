import React from "react";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
} from "@material-ui/core";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import DeleteIcon from "@material-ui/icons/Delete";
//import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import EditIcon from "@material-ui/icons/Edit";
import moment from "moment";
import { useDispatch } from "react-redux";

import { setPostToEdit } from "../../../redux/actions/postToEdit";

import useStyles from "./styles";
import { deletePost, updatePost } from "../../../redux/actions/posts";

const Post = ({ post }) => {
  const dispatch = useDispatch();
  const classes = useStyles();

  const handleEditPost = () => {
    dispatch(setPostToEdit(post));
  };

  const handleLikePost = () => {
    dispatch(updatePost(post.id, { ...post, likeCount: post.likeCount + 1 }));
  };

  const handleDeletePost = () => {
    dispatch(deletePost(post.id));
  };

  return (
    <Card className={classes.card}>
      <CardMedia
        className={classes.media}
        image={post.selectedFile}
        title={post.title}
      />
      <div className={classes.overlay}>
        <Typography variant="h6">{post.creator}</Typography>
        <Typography variant="body2">
          {moment(post.createdAt).fromNow()}
        </Typography>
      </div>
      <div className={classes.overlay2}>
        <Button
          style={{ color: "white" }}
          size="small"
          onClick={handleEditPost}
        >
          {/*<MoreHorizIcon fontSize="medium" />*/}
          <EditIcon fontSize="small" />
        </Button>
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
        <Typography variant="body2" color="textSecondary" component="p" gutterBottom>
          {post.message}
        </Typography>
      </CardContent>
      <CardActions className={classes.cardActions}>
        <Button size="small" color="primary" onClick={handleLikePost}>
          <ThumbUpAltIcon fontSize="small" />
          &nbsp; Like &nbsp;
          {post.likeCount}
        </Button>
        <Button size="small" color="primary" onClick={handleDeletePost}>
          <DeleteIcon fontSize="small" />
          Delete
        </Button>
      </CardActions>
    </Card>
  );
};

export default Post;
