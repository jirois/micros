import "express-async-errors";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
import bodyParser, { urlencoded } from "body-parser";
import helmet from "helmet";
const app = express();

app.use(cors());
app.use(bodyParser(urlencoded({ type: true })));
app.use(helmet());

app.get("/", (req, res) => {
  res.send("Welcome home!");
});

const PORT = process.env.PORT || 5440;

app.listen(PORT, () => {
  console.log(`Server serving at port ${PORT}`);
});
