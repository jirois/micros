import "express-async-errors";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
import helmet from "helmet";
import cookieParser from "cookie-parser";
const app = express();

app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("Welcome home!");
});

const PORT = process.env.PORT || 5440;

app.listen(PORT, () => {
  console.log(`Server serving at port ${PORT}`);
});
