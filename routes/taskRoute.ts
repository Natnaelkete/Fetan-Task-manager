import { Router } from "express";
import {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
} from "../controllers/taskController";
import verifyToken from "../middleware/authMiddleware";

const router: Router = Router();

router.post("/tasks", verifyToken, createTask);
router.get("/tasks", verifyToken, getTasks);
router.patch("/tasks/:id", verifyToken, updateTask);
router.delete("/tasks/:id", verifyToken, deleteTask);

export default router;
