import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import connectDB from "./config/DB";
import rateLimit from "express-rate-limit";
import helmet from "helmet";

import taskRouter from "./routes/taskRoute";
import authRouter from "./routes/authRoute";
import userRouter from "./routes/userRoute";
import { errorHandler, notFound } from "./middleware/errorMiddleware";

dotenv.config();

const PORT = process.env.PORT || 3000;

const app = express();

const limiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 100,
});

app.use(cors({ origin: "*" }));

app.use(helmet());
app.use(limiter);
app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

connectDB();

app.use("/api/v1", taskRouter);
app.use("/api/v1", authRouter);
app.use("/api/v1", userRouter);

app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running in on PORT ${PORT}`);
});
