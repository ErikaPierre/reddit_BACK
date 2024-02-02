import { Comment } from "../models/commentModel";
import { Post } from "../models/postModel";

const createCommentInPost = async (req, res) => {
  try {
    const postID = await Post.findById(req.params.id_post);
    const newComment = await Comment.findById(req.params.id_comment);
    if (!postID) return res.status(404).send("Oooops...Post introuvable.");

    res.json({
      newComment,
      message: "Votre commentaire a bien été ajouté au post",
    });
    postID.comments.push(newComment);
    postID.save();
  } catch (error) {
    res.json({ error: error.message });
    res
      .status(500)
      .send("Erreur lors de la création de votre commentaire dans le post");
  }
};

const editComment = async (req, res) => {
  try {
    const updateComment = await Comment.findByIdAndUpdate(
      { _id: req.params.id_comment },
      req.body,
      { new: true }
    );
    res.json({
      updateComment,
      message: "Votre commentaire a bien été mis à jour",
    });
  } catch (error) {
    res
      .status(500)
      .send(
        "Oooops ! Semblerait-il qu'il y ait une erreur lors de la mise à jour de votre commentaire..."
      );
  }
};

const deleteComment = async (req, res) => {
  try {
    const removeComment = await Comment.findOneAndDelete({
      _id: req.params.id_comment,
    });
    res.json({
      removeComment,
      message: "Votre commentaire a bien été supprimé.",
    });
  } catch (error) {
    res
      .status(500)
      .send(
        "Oooops ! Une erreur est survenue lors de la suppression de votre commentaire..."
      );
  }
};

export { createCommentInPost, editComment, deleteComment };
