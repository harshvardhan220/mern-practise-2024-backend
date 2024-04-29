import express from "express";
import mongoose from "mongoose";

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const UrlSchema = new Schema(
  {
    url: { type: String, required: true },
    uid: { type: String },
    username: { type: String },
  },
  { timestamps: true }
);

const Url = mongoose.model("Url", UrlSchema);

export default Url;
