import "express-async-errors";
import express from "express";
import dotenv from "dotenv";
dotenv.config();
import fileUpload from "express-fileupload";
import connectDb from "./db/connect.js";
import blogRouter from "./router/routes.js";

const app = express();

app.use(express.json());
app.use(express.static("./public"));
app.use(fileUpload());

app.use("api/v1/blog", blogRouter);

app.get("/", (req, res) => {
  res.send("Welcome home");
});

const PORT = process.env.PORT || 4300;

const start = async () => {
  await connectDb(process.env.MONGO_URI);
  app.listen(PORT, () => {
    console.log(`app serving at port: ${PORT}`);
  });
};

start();
