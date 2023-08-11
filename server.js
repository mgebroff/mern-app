/******************* IMPORT ************************************************/
import express from "express";
import mongoose from "mongoose";
import morgan from "morgan";
import * as dotenv from "dotenv";
import jobRouter from "./routes/jobRouter.js";
import authRouter from "./routes/authRouter.js";
import userRouter from "./routes/userRouter.js";
import errorHandlerMiddleware from "./middleware/errorHandlerMiddleware.js";
import { authenticateUser } from "./middleware/authMiddleware.js";
import cookieParser from "cookie-parser";
import { dirname } from "path";
import { fileURLToPath } from "url";
import path from "path";
import cloudinary from "cloudinary";

/******************* DOTENV CONFIG *****************************************/
dotenv.config();

/******************* EXPRESS ***********************************************/
const app = express();

const __dirname = dirname(fileURLToPath(import.meta.url));

/******************* CLOUDINARY *********************************************/
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

/******************* MIDDLEWARE ********************************************/
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

/******************* ROUTES *************************************************/
app.get("/api/v1/test", (req, res) => {
  res.json({ msg: "test rout" });
});

app.use(express.static(path.resolve(__dirname, "./public")));

app.use("/api/v1/jobs", authenticateUser, jobRouter);
app.use("/api/v1/users", authenticateUser, userRouter);
app.use("/api/v1/auth", authRouter);

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "./public", "index.html"));
});

/******************* ERRORS ****************************************************/
app.use("*", (req, res) => {
  res.status(404).json({ msg: "not found" });
});

app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5100;

/******************* SERVER / DB ***********************************************/
try {
  await mongoose.connect(process.env.MONGO_URL);

  app.listen(port, () => {
    console.log(`Server running on PORT ${port}`);
  });
} catch (error) {
  console.log(error);
  process.exit(1);
}
