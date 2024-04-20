import express from "express";
import BlogPost from "../models/BlogPost.js";
import jwtAuthMiddleware, { generateToken } from "../jwt.js";

const router = express.Router();

// POST route for creating a new post
router.post("/signup", async (req, res) => {
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
    const response = await post.save();
    const payload = { id: response.id, username: response.username }; //NOTE: we dont write id as _id because mongodb understands if we write id.
    const token = generateToken(payload); //NOTE: We are passing username as payload.
    console.log("Token is: ", token);
    res.status(201).json({ response: response, token: token });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

//POST route for login
router.post("/login", async (req, res) => {
  try {
    //extract the username and password from the request body.
    const { username, password } = req.body;

    //Find the user by username in the db.
    const user = await BlogPost.findOne({ username: username });

    //If user does not exist or password do not match, return error.
    if (!user || !(await user.comparePassword(password))) {
      res.status(401).json({ message: "Invalid Username or Password" });
    }

    //Generate Token
    const payload = {
      id: user.id,
      username: user.username,
    };

    const token = generateToken(payload);

    //Return token as response.
    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

//GET route to get blogPosts
router.get("/blogPosts", jwtAuthMiddleware, async (req, res) => {
  try {
    const response = await BlogPost.find();
    res.status(200).json(response);
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

//GET route for Profile
router.get("/profile", jwtAuthMiddleware, async (req, res) => {
  try {
    const userData = req.decoded;
    console.log(userData);

    const userId = userData.id;
    const user = await BlogPost.findById(userId);

    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
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
