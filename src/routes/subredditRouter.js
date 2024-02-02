import { Router } from "express";
import {
  createSubreddit,
  deleteSubreddit,
  getAllSubreddits,
  getAsubreddit,
} from "../controllers/subredditController";

const subredditRouter = Router();

subredditRouter.post("/new-subreddit", createSubreddit);
subredditRouter.get("/subreddit/:id", getAsubreddit);
subredditRouter.get("/all-subreddit", getAllSubreddits);
subredditRouter.delete("/remove-subreddit/:id", deleteSubreddit);

export default subredditRouter;
