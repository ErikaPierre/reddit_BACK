import { Post } from "../models/postModel";
import { SubReddit } from "../models/subredditModel";

const getAllPost = async (req, res) => {
  try {
    const posts = await Post.find();
    res.json({ posts, message: "Here are all your posts." });
  } catch (error) {
    res.json({ error: error.message });
  }
};

const getApost = async (req, res) => {
  try {
    const post = await Post.findById(res.params.id);
    res.json({ post, message: "This is your post." });
  } catch (error) {
    res.json({ error: error.message });
  }
};

const createPost = async (req, res) => {
  const { title, content, userName, subReddit, comments } = req.body;
  try {
    const newPost = await Post.create({
      title: title,
      content: content,
      userName: userName,
      subReddit: subReddit,
      comments: comments,
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
      { _id: req.params.id_post },
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
    const removePost = await Post.findOneAndDelete({ _id: req.params.id_post });
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
  getAllPost,
  getApost,
  createPost,
  createPostInSub,
  editPost,
  deletePost,
};
