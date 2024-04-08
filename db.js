import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const dbURL = process.env.MONGODB_URL;

mongoose.connect(dbURL, {
  //   useNewUrlParser: true,
  //   useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on("connected", () => {
  console.log("DB Connected");
});
db.on("error", (error) => {
  console.error("DB Connection error", error);
});
db.on("disconnected", (error) => {
  console.log("DB Disconnected");
});

export default db;
