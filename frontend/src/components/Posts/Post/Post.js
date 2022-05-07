import React, { useState } from "react";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
  ButtonBase,
  Dialog,
  DialogActions,
  DialogTitle,
} from "@material-ui/core";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";

import { setPostToEdit } from "../../../redux/actions/postToEdit";
import {
  deletePost,
  likePost,
  getPostsBySearch,
} from "../../../redux/actions/posts";

import useStyles from "./styles";
import Likes from "./Likes";
import OptionsButton from "./OptionsButton";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const Post = ({ post }) => {
  const query = useQuery();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const classes = useStyles();
  const user = useSelector((state) => state.auth.authData);
  const [likes, setLikes] = useState(post?.likes);
  const [open, setOpen] = useState(false);
  const userId = user?.result?.googleId || user?.result?.id;

  const handleEditPost = () => {
    dispatch(setPostToEdit(post));
  };

  const handleLikePost = () => {
    const hasLikedPost = post.likes.find((like) => like === userId);
    dispatch(likePost(post.id));
    if (hasLikedPost) {
      setLikes(post.likes.filter((id) => id !== userId));
    } else {
      setLikes([...post.likes, userId]);
    }
  };

  const handleDeletePost = async () => {
    await dispatch(deletePost(post.id));
    dispatch(
      getPostsBySearch({
        search: query.get("searchQuery") || "",
        tags: query.get("tags") || "",
        page: query.get("page") || "",
      })
    );
  };

  const openPost = () => {
    navigate(`/posts/${post.id}`);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
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
            className={classes.limitMessage}
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
          <Likes userId={userId} likes={likes} />
        </Button>
        {(user?.result?.googleId === post?.creatorId ||
          user?.result?.id === post?.creatorId) && (
          <>
            <OptionsButton
              handleEditPost={handleEditPost}
              handleDeletePost={handleOpen}
            />
            <Dialog open={open} onClose={handleClose}>
              <DialogTitle>
                Do you really want to delete <strong>{post.title}</strong>?
              </DialogTitle>
              <DialogActions>
                <Button
                  onClick={handleClose}
                  color="default"
                  variant="contained"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleDeletePost}
                  color="secondary"
                  variant="contained"
                >
                  Delete
                </Button>
              </DialogActions>
            </Dialog>
          </>
        )}
      </CardActions>
    </Card>
  );
};

export default Post;
