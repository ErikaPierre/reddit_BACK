import { Router } from "express";
import {
  createCommentInPost,
  deleteComment,
  editComment,
} from "../controllers/commentController";

const commentRouter = Router();

commentRouter.post("/new-comment", createCommentInPost);
commentRouter.put("/update-comment", editComment);
commentRouter.delete("/remove-comment/:id", deleteComment);

export default commentRouter;
