import express from "express";

const router = express.Router();

router.get("/helloWorld", (req, res) => {
  res.send({ message: "Hello Harshvardhan! (From API)", success: true });
});

export default router;
