import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
  name: { type: String },
  comment: { type: String },
});

const BlogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Please provide the title"],
    minlength: 3,
  },
  content: {
    type: String,
    required: [true, "Please provide the content"],
  },
  description: {
    type: String,
  },
  image: {
    type: String,
  },
  comments: [commentSchema],
});

export default mongoose.model("Blog", BlogSchema);
