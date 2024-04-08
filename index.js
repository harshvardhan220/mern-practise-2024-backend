import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { Strategy as LocalStrategy } from "passport-local"; //Username and Password Strategy.
import db from "./db.js";
import dotenv from "dotenv";
import starterApi from "./routes/starterApi.js";
import blogPosts from "./routes/blogPosts.js";
import BlogPost from "./models/BlogPost.js";
import passport from "./auth.js"; // Import your authentication logic

const localAuthMiddleware = passport.authenticate("local", { session: false });

const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
dotenv.config();

//Routes
app.use("/api", blogPosts);
app.use("/api", localAuthMiddleware, starterApi);

//PORT
const port = process.env.PORT || 8000;

//Starting a server
app.listen(port, () => {
  console.log(`App Listening on port ${process.env.PORT || 8000} `);
});
