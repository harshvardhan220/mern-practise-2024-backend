import express from "express";
// import passport from "../auth.js"; // Import your authentication logic

const router = express.Router();

// Hello World Route (Authenticated)
router.get(
  "/helloWorld",
  (req, res) => {
    res.send({ message: "Hello Harshvardhan! (From API)", success: true });
  }
);

export default router;
