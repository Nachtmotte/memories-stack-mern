import React, { useEffect, useState } from "react";
import { TextField, Button, Typography, Paper } from "@material-ui/core";
import FileBase from "react-file-base64";
import { useDispatch, useSelector } from "react-redux";

import useStyles from "./styles";
import { createPost, updatePost } from "../../redux/actions/posts";
import { clearPostToEdit } from "../../redux/actions/postToEdit";
import InputChip from "../InputChip/InputChip";

const Form = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const user = useSelector((state) => state.auth.authData);

  const emptyPost = {
    title: "",
    message: "",
    selectedFile: "",
  };
  const [tags, setTags] = useState([]);
  const [postData, setPostData] = useState(emptyPost);
  const postToEdit = useSelector((state) => state.postToEdit);

  useEffect(() => {
    if (postToEdit) {
      setPostData(postToEdit);
      setTags(postToEdit.tags);
    }
  }, [postToEdit]);

  const clearForm = () => {
    setTags([]);
    setPostData(emptyPost);
    dispatch(clearPostToEdit());
  };

  const handleSubmit = (e) => {
    postData.tags = tags;
    e.preventDefault();
    if (postToEdit) {
      dispatch(updatePost(postData.id, postData));
    } else {
      dispatch(createPost({ ...postData, username: user?.result?.name }));
    }
    clearForm();
    e.target.reset();
  };

  if (!user?.result?.name) {
    return (
      <Paper className={classes.paper}>
        <Typography variant="h6" align="center">
          Please Sign In to create your own memories and like other's memories.
        </Typography>
      </Paper>
    );
  }

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
          name="title"
          variant="outlined"
          label="Title"
          fullWidth
          value={postData.title}
          onChange={(e) => setPostData({ ...postData, title: e.target.value })}
          required
        />
        <TextField
          name="message"
          variant="outlined"
          label="Message"
          fullWidth
          multiline
          minRows={4}
          value={postData.message}
          onChange={(e) =>
            setPostData({ ...postData, message: e.target.value })
          }
          required
        />
        <InputChip
          chips={tags}
          setChips={setTags}
          fieldLabel={"Tags"}
          fieldStyle={{}}
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
