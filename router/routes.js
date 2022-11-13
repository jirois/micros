import express from "express";

const router = express.Router();

import {
  createBlog,
  getAllBlog,
  getSingleBlog,
  updateBlog,
  deleteBlog,
  uploadImage,
} from "../controller/blogController.js";

router.route("/").post(createBlog).get(getAllBlog);
router.route("/uploadImage").post(uploadImage);

router.route("/:id").get(getSingleBlog).patch(updateBlog).delete(deleteBlog);

export default router;
