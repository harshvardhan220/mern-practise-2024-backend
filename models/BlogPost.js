import express from "express";
import mongoose from "mongoose";

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const BlogPostSchema = new Schema({
  author: { type: String, required: true },
  title: { type: String },
  description: { type: String, maxlength: 50 },
  date: { type: Date, default: Date.now() },
  technology: {
    type: String,
    enum: ["devops", "mern", "react", "javascript"],
    required: true,
  },
});

const BlogPost = mongoose.model("BlogPost", BlogPostSchema);

export default BlogPost;
