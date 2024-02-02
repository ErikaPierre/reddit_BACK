import { Router } from "express";
import {
  createPost,
  createPostInSub,
  deletePost,
  editPost,
  getAllPosts,
  getApost,
} from "../controllers/postController";

const postRouter = Router();

postRouter.post("/new-post", createPost);
postRouter.post(":id_post/add/:id_sub", createPostInSub);
postRouter.get("/:id", getApost);
postRouter.get("/all-posts", getAllPosts);
postRouter.put("/update-post/:id", editPost);
postRouter.delete("/remove-post/:id", deletePost);

export default postRouter;
