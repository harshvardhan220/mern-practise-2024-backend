import express from "express";
const router = express.Router();
import Url from "../models/Url.js";
import { nanoid } from "nanoid";

router.post("/url", async (req, res) => {
  try {
    let url = req.body.url;
    let id = nanoid(6);
    let sentUrl = Url({ url: url, uid: id });
    const response = await sentUrl.save();
    res.status(200).json({ id: id });
  } catch (error) {
    res.status(404).json({ message: "Bad Request XYZ" });
  }
});
router.get("/url/:id", async (req, res) => {
  try {
    let uid = req.params.id; //IMP: id should be id
    console.log(uid);
    let url = await Url.findOne({uid});
    console.log(url);
    res.redirect(url.url);
  } catch (error) {
    res.status(404).json({ message: "Bad Request XYZ" });
  }
});

export default router;
