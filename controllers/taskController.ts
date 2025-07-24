import { Request, Response } from "express";
import Task from "../models/taskModel";

export const createTask = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;
    if (!name) {
      res.status(400).json({ error: "Task name is required" });
      return;
    }

    const task = new Task({
      name,
    });

    await task.save();
    res.status(201).json(task);
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
};
