import mongoose from "mongoose";

const connectDb = (url) => {
  return mongoose.connect(url, {
    newUserUrlParser: true,
    useUnifiedTopology: true,
  });
};

export default connectDb;
