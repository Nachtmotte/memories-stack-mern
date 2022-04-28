import React, { useEffect, useState } from "react";
import {
  TextField,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
} from "@material-ui/core";
import FileBase from "react-file-base64";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

import useStyles from "./styles";
import {
  createPost,
  updatePost,
  getPostsBySearch,
} from "../../redux/actions/posts";
import { clearPostToEdit } from "../../redux/actions/postToEdit";
import InputChip from "../InputChip/InputChip";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const Form = ({ open, setOpen, handleOpen }) => {
  const query = useQuery();
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
  const buttonSubmitEnabled =
    postData.title && postData.message && postData.selectedFile;

  useEffect(() => {
    if (postToEdit) {
      handleOpen();
      setPostData(postToEdit);
      setTags(postToEdit.tags);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [postToEdit]);

  const clearForm = () => {
    setTags([]);
    setPostData(emptyPost);
    dispatch(clearPostToEdit());
  };

  const handleClose = () => {
    setOpen(false);
    clearForm();
  };

  const handleSubmit = async (e) => {
    postData.tags = tags;
    e.preventDefault();
    if (postToEdit) {
      await dispatch(updatePost(postData.id, postData));
    } else {
      await dispatch(createPost({ ...postData, username: user?.result?.name }));
      dispatch(
        getPostsBySearch({
          search: query.get("searchQuery") || "",
          tags: query.get("tags") || "",
          page: query.get("page") || "",
        })
      );
    }
    clearForm();
    e.target.reset();
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth={"xs"}>
      <DialogTitle>{!postToEdit ? "Creating" : "Editing"} a Memory</DialogTitle>
      <DialogContent>
        <form
          autoComplete="off"
          noValidate
          className={`${classes.root} ${classes.form}`}
          onSubmit={handleSubmit}
        >
          <TextField
            name="title"
            variant="outlined"
            label="Title"
            fullWidth
            value={postData.title}
            onChange={(e) =>
              setPostData({ ...postData, title: e.target.value })
            }
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
          <InputChip chips={tags} setChips={setTags} fieldLabel={"Tags"} />
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
            disabled={!buttonSubmitEnabled}
          >
            {!postToEdit ? "Send" : "Update"}
          </Button>
          <Button
            variant="contained"
            color="secondary"
            size="small"
            type="reset"
            onClick={handleClose}
            fullWidth
            style={{ margin: "0 0 10px 0" }}
          >
            Cancel
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default Form;
