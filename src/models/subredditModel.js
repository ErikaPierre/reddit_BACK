import mongoose, { Schema } from "mongoose";

const subRedditSchema = new Schema({
    title: { type: String, require: true },
    content: String,
    posts: { type: Schema.Types.ObjectId, ref: "Post" },
    createAt: { type: Date, default: Date.now() },
  });
  
  const SubReddit = mongoose.model("SubReddit", subRedditSchema);
  
  module.exports = SubReddit;