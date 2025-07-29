import express from "express";
import { logout, signin, signup } from "../controllers/authController";
import validate from "../middleware/validatorMiddleware";
import { signinSchema, signupSchema } from "../validation/validator";

const router = express.Router();

router.post("/signup", validate(signupSchema), signup);
router.post("/signin", validate(signinSchema), signin);
router.post("/logout", logout);

export default router;
