import { NextFunction, Request, Response } from "express";
import Task from "../models/taskModel";

export const createTask = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name } = req.body;
    if (!name) {
      res.status(400).json({ error: "Task name is required" });
      return;
    }

    if (!req.userId) {
      res.status(401).json({ error: "User not authenticated" });
      return;
    }

    const task = new Task({
      name,
      userId: req.userId,
    });

    await task.save();
    res.status(201).json(task);
  } catch (error) {
    next(error);
  }
};

export const getTasks = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.userId) {
      res.status(401).json({ error: "User not authenticated" });
      return;
    }

    const { page = "1", limit = "10", search = "" } = req.query;
    const query = {
      userId: req.userId,
      name: { $regex: search, $options: "i" },
    };

    const tasks = await Task.find(query)
      .limit(Number(limit))
      .skip((Number(page) - 1) * Number(limit))
      .sort({ createdAt: -1 });

    const total = await Task.countDocuments(query);

    res.json({
      tasks,
      totalPages: Math.ceil(total / Number(limit)),
      currentPage: Number(page),
    });
  } catch (error) {
    next(error);
  }
};

export const updateTask = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { status } = req.body;
    if (!["pending", "completed"].includes(status)) {
      res.status(400).json({ error: "Invalid status" });
      return;
    }

    if (!req.userId) {
      res.status(401).json({ error: "User not authenticated" });
      return;
    }

    const task = await Task.findOne({ _id: req.params.id, userId: req.userId });
    if (!task) {
      res.status(404).json({ error: "Task not found" });
      return;
    }

    task.status = status;
    await task.save();

    res.json(task);
  } catch (error) {
    next(error);
  }
};

export const deleteTask = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.userId) {
      res.status(401).json({ message: "User not authenticated" });
      return;
    }

    const task = await Task.findOneAndDelete({
      _id: req.params.id,
      userId: req.userId,
    });
    if (!task) {
      res.status(404).json({ message: "Task not found" });
      return;
    }

    res.json({ message: "Task deleted successfully" });
  } catch (error) {
    next(error);
  }
};
