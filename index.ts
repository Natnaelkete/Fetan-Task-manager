import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import connectDB from "./config/DB";
import taskRouter from "./routes/taskRoute";

dotenv.config();

const PORT = process.env.NODE_ENV || 3000;

const app = express();

app.use(cors({ origin: "*" }));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

connectDB();

app.use("/api/v1", taskRouter);

app.listen(PORT, () => {
  console.log(`Server is running in on PORT ${PORT}`);
});
