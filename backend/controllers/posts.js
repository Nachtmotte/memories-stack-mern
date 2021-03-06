import mongoose from "mongoose";
import Post from "../models/post.js";
import config from "../utils/config.js";

export const getPost = async (req, res) => {
  const { id } = req.params;
  try {
    const post = await Post.findById(id);
    res.status(200).json(post);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getPosts = async (req, res) => {
  const { page } = req.query || 1;
  try {
    const perPage = config.PER_PAGE;
    const startIndex = (Number(page) - 1) * perPage;
    const total = await Post.countDocuments({});

    const posts = await Post.find()
      .sort({ _id: -1 })
      .limit(perPage)
      .skip(startIndex);

    res.status(200).json({
      data: posts,
      currentPage: Number(page),
      numberOfPages: Math.ceil(total / perPage),
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getPostsBySearch = async (req, res) => {
  const { page } = req.query || 1;
  const { tags } = req.query;
  let { searchQuery } = req.query;

  if (searchQuery === "" && tags !== "") searchQuery = "none";
  try {
    const title = new RegExp(searchQuery, "i");

    const perPage = config.PER_PAGE;
    const startIndex = (Number(page) - 1) * perPage;
    const total = await Post.countDocuments({
      $or: [{ title }, { tags: { $in: tags.split(",") } }],
    });
    const posts = await Post.find({
      $or: [{ title }, { tags: { $in: tags.split(",") } }],
    })
      .sort({ _id: -1 })
      .limit(perPage)
      .skip(startIndex);

    res.status(200).json({
      data: posts,
      currentPage: Number(page),
      numberOfPages: Math.ceil(total / perPage),
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: error.message });
  }
};

export const createPost = async (req, res) => {
  const post = req.body;

  var tzoffset = new Date().getTimezoneOffset() * 60000;
  var localISOTime = new Date(Date.now() - tzoffset).toISOString().slice(0, -1);

  const newPost = new Post({
    ...post,
    creatorId: req.userId,
    createAt: localISOTime,
  });

  try {
    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const updatePost = async (req, res) => {
  const { id: _id } = req.params;
  const post = req.body;

  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).send("There isn't POST with that id");

  const postToUpdate = await Post.findById(_id);

  if (req.userId !== postToUpdate.creatorId)
    return res.status(401).send("Login to update this post");

  const updatedPost = await Post.findByIdAndUpdate(_id, post, { new: true });

  res.status(200).json(updatedPost);
};

export const deletePost = async (req, res) => {
  const { id: _id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).send("There isn't POST with that id");

  const postToDelete = await Post.findById(_id);

  if (req.userId !== postToDelete.creatorId)
    return res.status(401).send("Login to delete this post");

  await Post.findByIdAndDelete(_id);

  res.status(200).json({ message: "POST deleted successfully" });
};

export const likePost = async (req, res) => {
  const { id } = req.params;

  if (!req.userId) {
    return res.json({ message: "Unauthenticated" });
  }

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No post with id: ${id}`);

  const post = await Post.findById(id);

  const index = post.likes.findIndex((id) => id === String(req.userId));

  if (index === -1) {
    post.likes = post.likes.concat(req.userId);
  } else {
    post.likes = post.likes.filter((id) => id !== String(req.userId));
  }
  const updatedPost = await Post.findByIdAndUpdate(id, post, {
    new: true,
  });
  res.status(200).json(updatedPost);
};

export const commentPost = async (req, res) => {
  const { id } = req.params;
  const { value } = req.body;

  if (!req.userId) {
    return res.json({ message: "Unauthenticated" });
  }

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No post with id: ${id}`);

  const post = await Post.findById(id);

  post.comments.push(value);

  const updatedPost = await Post.findByIdAndUpdate(id, post, { new: true });

  res.json(updatedPost);
};
