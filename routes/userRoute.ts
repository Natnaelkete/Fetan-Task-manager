import express from "express";
import { getProfile } from "../controllers/userController";
import verifyToken from "../middleware/authMiddleware";

const router = express.Router();

router.get("/profile", verifyToken, getProfile);

export default router;
