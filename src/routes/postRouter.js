import { Router } from "express";
import {
  createPost,
  deletePost,
  editPost,
  getAllPost,
  getApost,
} from "../controllers/postController";

const postRouter = Router();

postRouter.post("/new-post", createPost);
postRouter.get("/post/:id", getApost);
postRouter.get("/all-post", getAllPost);
postRouter.put("/update-post", editPost);
postRouter.delete("/remove-post/:id", deletePost);

export default postRouter;
