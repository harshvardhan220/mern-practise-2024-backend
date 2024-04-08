import express from "express";
import mongoose from "mongoose";
import bcrypt from "bcrypt";

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
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  // email: {
  //   type: String,
  //   required: true,
  //   unique: true,
  // },
});

BlogPostSchema.pre("save", async function (next) {
  const blogPost = this;

  //Hash the password on if it is been modified or is a new record.
  if (!blogPost.isModified("password")) return next(); //if we are modifying the password, it will enter try block.

  try {
    // hash password generation
    const salt = await bcrypt.genSalt(10);

    //hash password
    const hashedPassword = await bcrypt.hash(blogPost.password, salt);

    //Override the plain password with the hashed one.
    blogPost.password = hashedPassword;
    next();
  } catch (error) {
    return next(error);
  }
});

BlogPostSchema.methods.comparePassword = async function (candidatePassword) {
  try {
    //use bcrypt to compare the provided password with the hashed password
    const isMatch = bcrypt.compare(candidatePassword, this.password);
    return isMatch;
  } catch (error) {
    throw error;
  }
};

const BlogPost = mongoose.model("BlogPost", BlogPostSchema);

export default BlogPost;
