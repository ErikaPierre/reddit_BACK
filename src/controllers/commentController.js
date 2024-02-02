import { Comment } from "../models/commentModel";
import { Post } from "../models/postModel";

// const createCommentInPost = async (req, res) => {
//   try {
//     const newComment = await Comment.findById(req.params.id_comment);
//     const postID = await Post.findById(req.params.id_post);
//     if (!postID) return res.status(404).send("Oooops...Post introuvable.");

//     res.json({
//       newComment,
//       message: "Votre commentaire a bien été ajouté au post",
//     });
//     postID.comments.push(newComment);
//     postID.save();
//   } catch (error) {
//     res.json({ error: error.message });
//     res
//       .status(500)
//       .send("Erreur lors de la création de votre commentaire dans le post");
//   }
// };

const createCommentInPost = async (req, res) => {
  try {
    const postID = req.params.id_post;
    const userName = req.params.id_userName;

    if (!postID) return res.status(404).send("Oooops...Post introuvable.");

    const newComment = await new Comment();
    newComment.title = req.body.title;
    newComment.content = req.body.content;
    newComment.userName = userName;
    newComment.post = postID;

    await newComment.save();

    const post = await Post.findByIdAndUpdate(
      postID,
      { $push: { comments: newComment._id } },
      { new: true }
    );

    res.json({
      newComment,
      message: "Votre commentaire a bien été ajouté au post",
    });
  } catch (error) {
    res.json({ error: error.message });
    res
      .status(500)
      .send("Erreur lors de la création de votre commentaire dans le post");
  }
};

const editComment = async (req, res) => { //Ne récupère pas la valeur
  try {
    const updateComment = await Comment.findByIdAndUpdate(
      { _id: req.params.id_comm },
      req.body,
      { new: true }
    );
    updateComment.save();
    res.json({
      updateComment,
      message: "Votre commentaire a bien été modifié",
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
      _id: req.params.id_comm,
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
