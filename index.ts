import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import connectDB from "./config/DB";
import taskRouter from "./routes/taskRoute";
import authRouter from "./routes/authRoute";
import userRouter from "./routes/userRoute";

dotenv.config();

const PORT = process.env.PORT || 3000;

const app = express();

app.use(cors({ origin: "*" }));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

connectDB();

app.use("/api/v1", taskRouter);
app.use("/api/v1", authRouter);
app.use("/api/v1", userRouter);

app.listen(PORT, () => {
  console.log(`Server is running in on PORT ${PORT}`);
});
