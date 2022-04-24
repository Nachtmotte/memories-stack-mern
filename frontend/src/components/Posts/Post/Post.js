import React from "react";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
//import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import EditIcon from "@material-ui/icons/Edit";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";

import { setPostToEdit } from "../../../redux/actions/postToEdit";

import useStyles from "./styles";
import { deletePost, likePost } from "../../../redux/actions/posts";
import Likes from "./Likes";

const Post = ({ post }) => {
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

  return (
    <Card className={classes.card} raised elevation={6}>
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
      {(user?.result?.googleId === post?.creatorId ||
        user?.result?.id === post?.creatorId) && (
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
      )}
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
          <Button size="small" color="primary" onClick={handleDeletePost}>
            <DeleteIcon fontSize="small" />
            Delete
          </Button>
        )}
      </CardActions>
    </Card>
  );
};

export default Post;
