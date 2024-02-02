import { Router } from "express";
import {
  createCommentInPost,
  deleteComment,
  editComment,
} from "../controllers/commentController";

const commentRouter = Router();

commentRouter.post("/:postID/new-comment", createCommentInPost);
commentRouter.put("/:postID/update-comment", editComment);
commentRouter.delete("/:postID/remove-comment/:id_post", deleteComment);

export default commentRouter;
