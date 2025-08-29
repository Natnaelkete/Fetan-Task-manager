import express from "express";
import { logout, signin, signup } from "../controllers/authController";
import { signinSchema, signupSchema } from "../validation/validator";
import validate from "../middleware/validatorMiddleware";
import authLimiter  from "../middleware/authLimmiter";

const router = express.Router();

router.post("/signup", validate(signupSchema), signup);
router.post("/signin", authLimiter, validate(signinSchema), signin);
router.post("/logout", logout);

export default router;
