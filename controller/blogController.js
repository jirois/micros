import Blog from "../model/Blog.js";

const getAllBlog = async (req, res) => {
  try {
    const blog = await Blog.find({});
    res.status(200).json({ blog });
  } catch (error) {
    throw new Error(error.message);
  }
};

const getSingleBlog = async (req, res) => {
  try {
    const { id: blogId } = req.params;
    const blog = await Blog.findOne({ _id: blogId });
    res.status(200).json({ singleBlog: blog });
  } catch (error) {
    throw new Error(error.message);
  }
};

const createBlog = async (req, res) => {
  try {
    const blog = new Blog({
      title: "First blog Article",
      content: "This is the content of the blog",
      description: "First description",
      image: "/images/b1.jgp",
    });
    const createdBlog = await Blog.save();

    res.status(201).json({ blog: createdBlog });
  } catch (error) {
    throw new Error(error.message);
  }
};

const updateBlog = async (req, res) => {
  try {
    const blogId = req.params.id;
    const body = req.body;
    const blog = await Blog.findById(blogId);
    if (!blog) {
      res.status(404).send({ msg: "Blog Not Found" });
    }
    blog.title = body.title;
    blog.content = body.content;
    blog.description = body.description;
    blog.image = body.image;
    const updatedBlog = await Blog.save();
    res.status(201).json({ blog: updatedBlog });
  } catch (error) {
    throw new Error(error.message);
  }
};

const deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      res.status(404).send({ msg: "Blog Not Found" });
    }
    const deleteBlog = await Blog.remove();
    res.status(200).json({ msg: "Blog Deleted", blog: deleteBlog });
  } catch (error) {
    throw new Error(error.message);
  }
};

const uploadImage = async (req, res) => {
  if (!req.files) {
    throw new Error("No File Uploaded");
  }
  const blogImage = req.files.image;
  if (!blogImage.mimetype.startsWith("image")) {
    throw new Error("Please Upload Image");
  }
  const maxSize = 1024 * 1024;

  if (blogImage.size > maxSize) {
    throw new Error("Please upload image smaller than 1MB");
  }

  const imagePath = path.join(
    __dirname,
    "../public/uploads" + `${blogImage.name}`
  );
  await blogImage.mv(imagePath);
  res.status(201).json({ image: `/uploads/${blogImage.name}` });
};

const blogReview = async (req, res) => {
  const blogId = req.params.id;
  const blog = await Blog.findById(blogId);
  if (blog) {
    if (blog.comments.find((x) => x.name === req.user.name)) {
      return res.status(400).send("You already submitted a comment");
    }
    const comment = {
      name: req.user.name,
      comment: req.body.comment,
    };
    blog.reviews.push(comment);
    const updatedBlog = await Blog.save();
    res.status(201).json({
      update: updatedBlog,
    });
  } else {
    res.status(404).json("No such blog");
  }
};

export {
  getAllBlog,
  getSingleBlog,
  createBlog,
  updateBlog,
  deleteBlog,
  blogReview,
  uploadImage,
};
