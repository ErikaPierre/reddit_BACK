import { Router } from "express";
import {
  createCommentInPost,
  deleteComment,
  editComment,
} from "../controllers/commentController";

const commentRouter = Router();

commentRouter.post("/:id_post/new-comment", createCommentInPost);
commentRouter.put("/:id_comm/update-comment", editComment);
commentRouter.delete("/:id_comm/remove-comment", deleteComment);

export default commentRouter;
