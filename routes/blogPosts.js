import express from "express";
import BlogPost from "../models/BlogPost.js";

const router = express.Router();

// POST route for creating a new post
router.post("/blogPosts", async (req, res) => {
  try {
    const { title, description, author, date, technology, username, password } =
      req.body;
    const post = new BlogPost({
      title,
      description,
      author,
      date,
      technology,
      username,
      password,
    });
    await post.save();
    res.status(201).json(post);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

//GET route to get blogPosts
router.get("/blogPosts", async (req, res) => {
  try {
    const response = await BlogPost.find();
    res.status(200).json(response);
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

//GET route to get posts by technology.
router.get("/blogPosts/:technology", async (req, res) => {
  try {
    const technology = req.params.technology; //Extract the technology from URL parameter
    if (
      technology == "devops" ||
      technology == "mern" ||
      technology == "react" ||
      technology == "javascript"
    ) {
      const response = await BlogPost.find({ technology: technology });
      res.status(200).json(response);
    } else {
      res.status(404).json({ message: "Invalid Technology" });
    }
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

//Update route to update blogposts.
router.put("/blogPosts/:id", async (req, res) => {
  const { id } = req.params;
  const body = req.body;
  console.log(body);
  try {
    const updatedPost = await BlogPost.findByIdAndUpdate(id, body, {
      new: true,
    });
    if (!updatedPost) {
      return res.status(404).json({ error: "BlogPost not found" });
    }
    res.status(200).json(updatedPost);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

//Delete route to delete blogposts.
router.delete("/blogPosts/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const user = await BlogPost.findByIdAndDelete(id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json({ message: "BlogPost deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

export default router;
