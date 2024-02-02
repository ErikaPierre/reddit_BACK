import mongoose, { Schema } from "mongoose";

const commentSchema = new Schema({
  title: { type: String, require: true },
  userName: { type: Schema.Types.ObjectId, ref: "User" },
  content: String,
  post: { type: mongoose.Schema.Types.ObjectId, ref: "Post" },
  createAt: { type: Date, default: Date.now() },
});

const Comment = mongoose.model("Comment", commentSchema);

export { Comment };
