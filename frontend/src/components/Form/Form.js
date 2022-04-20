import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createPost } from "../../redux/actions/posts";

const Form = () => {
  const emptyPost = {
    creator: "",
    title: "",
    message: "",
    tags: "",
    selectedFile: "",
  };
  const [postData, setPostData] = useState(emptyPost);

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createPost(postData));
    setPostData(emptyPost);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="creator">Creator:</label>
      <br />
      <input
        type="text"
        id="creator"
        name="creator"
        value={postData.creator}
        onChange={(e) => setPostData({ ...postData, creator: e.target.value })}
      />
      <br />
      <label htmlFor="title">Title:</label>
      <br />
      <input
        type="text"
        id="title"
        name="title"
        value={postData.title}
        onChange={(e) => setPostData({ ...postData, title: e.target.value })}
      />
      <br />
      <label htmlFor="message">Message:</label>
      <br />
      <input
        type="text"
        id="message"
        name="message"
        value={postData.message}
        onChange={(e) => setPostData({ ...postData, message: e.target.value })}
      />
      <br />
      <label htmlFor="tags">Tags:</label>
      <br />
      <input
        type="text"
        id="tags"
        name="tags"
        value={postData.tags}
        onChange={(e) => setPostData({ ...postData, tags: e.target.value })}
      />
      <br />
      <br />
      <button type="submit">Submit</button>
    </form>
  );
};

export default Form;
