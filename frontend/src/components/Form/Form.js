import React, { useEffect, useState } from "react";
import { TextField, Button, Typography, Paper } from "@material-ui/core";
import FileBase from "react-file-base64";
import { useDispatch, useSelector } from "react-redux";

import useStyles from "./styles";
import { createPost, updatePost } from "../../redux/actions/posts";
import { clearPostToEdit } from "../../redux/actions/postToEdit";

const Form = () => {
  const dispatch = useDispatch();

  const emptyPost = {
    creator: "",
    title: "",
    message: "",
    tags: "",
    selectedFile: "",
  };
  const [postData, setPostData] = useState(emptyPost);
  const postToEdit = useSelector((state) => state.postToEdit);

  useEffect(() => {
    if (postToEdit) {
      setPostData(postToEdit);
    }
  }, [postToEdit]);

  const clearForm = () => {
    setPostData(emptyPost);
    dispatch(clearPostToEdit());
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (postToEdit) {
      dispatch(updatePost(postData.id, postData));
    } else {
      dispatch(createPost(postData));
    }
    clearForm();
    e.target.reset();
  };

  const classes = useStyles();

  return (
    <Paper className={classes.paper}>
      <form
        autoComplete="off"
        noValidate
        className={`${classes.root} ${classes.form}`}
        onSubmit={handleSubmit}
      >
        <Typography variant="h6">
          {!postToEdit ? "Creating" : "Editing"} a Memory
        </Typography>
        <TextField
          name="creator"
          variant="outlined"
          label="Creator"
          fullWidth
          value={postData.creator}
          onChange={(e) =>
            setPostData({ ...postData, creator: e.target.value })
          }
        />
        <TextField
          name="title"
          variant="outlined"
          label="Title"
          fullWidth
          value={postData.title}
          onChange={(e) => setPostData({ ...postData, title: e.target.value })}
        />
        <TextField
          name="message"
          variant="outlined"
          label="Message"
          fullWidth
          value={postData.message}
          onChange={(e) =>
            setPostData({ ...postData, message: e.target.value })
          }
        />
        <TextField
          name="tags"
          variant="outlined"
          label="Tags"
          fullWidth
          value={postData.tags}
          onChange={(e) => setPostData({ ...postData, tags: e.target.value })}
        />
        <div className={classes.fileInput}>
          <FileBase
            type="file"
            multiple={false}
            onDone={({ base64 }) =>
              setPostData({ ...postData, selectedFile: base64 })
            }
          />
        </div>
        <Button
          className={classes.buttonSubmit}
          variant="contained"
          color="primary"
          size="large"
          type="submit"
          fullWidth
        >
          {!postToEdit ? "Send" : "Update"}
        </Button>
        <Button
          variant="contained"
          color="secondary"
          size="small"
          type="reset"
          onClick={clearForm}
          fullWidth
        >
          Clear
        </Button>
      </form>
    </Paper>
  );
};

export default Form;
