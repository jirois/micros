import mongoose from "mongoose";

const connectDb = (url) => {
  return mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};

export default connectDb;
