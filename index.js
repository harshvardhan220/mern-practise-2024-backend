import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import db from "./db.js";
import dotenv from "dotenv";
import starterApi from "./routes/starterApi.js";
import blogPosts from "./routes/blogPosts.js";

const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
dotenv.config();

//Routes
app.use("/api", starterApi);
app.use("/api", blogPosts);

//PORT
const port = process.env.PORT || 8000;

//Starting a server
app.listen(port, () => {
  console.log(`App Listening on port ${process.env.PORT || 8000} `);
});
