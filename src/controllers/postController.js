import { Post } from "../models/postModel";
import { SubReddit } from "../models/subredditModel";

const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find().populate("comments");
    res.json({ posts, message: "Here are all your posts." });
  } catch (error) {
    res.json({ error: error.message });
  }
};

const getApost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    res.json({ post, message: "This is your post." });
  } catch (error) {
    res.json({ error: error.message });
  }
};

const createPost = async (req, res) => {
  const { title, content } = req.body;
  const userName = req.params.id;
  try {
    const newPost = await Post.create({
      title: title,
      content: content,
      userName: userName,
    });
    res.json({ newPost, message: "Your post has been succefully create." });
  } catch (error) {
    res.json({ error: error.message });
    res.status(500).send("Erreur lors de la création du post");
  }
};

const createPostInSub = async (req, res) => {
  try {
    const subRedditID = await SubReddit.findById(req.params.id_sub);
    const newPostAdd = await Post.findById(req.params.id_post);
    if (!subRedditID) return res.status(404).send("Subreddit not found");

    res.json({
      newPostAdd,
      message: "Your post has been succefully add to your subreddit ",
    });
    subRedditID.posts.push(newPostAdd);
    subRedditID.save();
  } catch (error) {
    res.json({ error: error.message });
    res
      .status(500)
      .send("Erreur lors de l'insertion de votre post dans votre subreddit");
  }
};

const editPost = async (req, res) => {
  try {
    const updatePost = await Post.findByIdAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true }
    );
    res.json({
      updatePost,
      message: "Your post has been succefully updated ",
    });
  } catch (error) {
    res
      .status(500)
      .send(
        "Oooops ! Semblerait-il qu'il y ait une erreur lors de la mise à jour de votre post..."
      );
  }
};

const deletePost = async (req, res) => {
  try {
    const removePost = await Post.findOneAndDelete({ _id: req.params.id });
    res.json({
      removePost,
      message: "Your post has been succefully deleted",
    });
  } catch (error) {
    res
      .status(500)
      .send(
        "Oooops ! Une erreur est survenue lors de la suppression de votre post..."
      );
  }
};

export {
  getAllPosts,
  getApost,
  createPost,
  createPostInSub,
  editPost,
  deletePost,
};
