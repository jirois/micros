import "express-async-errors";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
import helmet from "helmet";
import cookieParser from "cookie-parser";
import connectDb from "./db/dbConnect.js";
const app = express();

// middleware section
import errorHandlerMiddleware from "./middleware/error-handler.js";
import notFoundMiddleware from "./middleware/notFound-handler.js";

app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("Welcome home!");
});

app.use(errorHandlerMiddleware);
app.use(notFoundMiddleware);

const PORT = process.env.PORT || 5440;

const start = async () => {
  try {
    await connectDb(process.env.MONGO_URI);

    app.listen(PORT, () => {
      console.log(`Server serving at port ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
