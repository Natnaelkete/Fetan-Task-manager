import mongoose from "mongoose";

export type TaskType = {
  name: string;
  status: "pending" | "completed";
  userId: mongoose.Types.ObjectId;
  createdAt: Date;
};

const taskSchema = new mongoose.Schema<TaskType>(
  {
    name: { type: String, required: true },
    status: {
      type: String,
      enum: ["pending", "completed"],
      default: "pending",
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

const Task = mongoose.model<TaskType>("Task", taskSchema);

export default Task;
