import mongoose, { Schema } from "mongoose";

const postSchema = new Schema({
  title: { type: String, required: true },
  content: String,
  userName: { type: Schema.Types.ObjectId, ref: "User" },
  subReddit: { type: Schema.Types.ObjectId, ref: "subReddit" },
  comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
  createAt: { type: Date, default: Date.now() },
});

const Post = mongoose.model("Post", postSchema);

export { Post };
