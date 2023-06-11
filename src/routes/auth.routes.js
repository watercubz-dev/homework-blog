import { Router } from "express";
import {
  login,
  register,
  logout,
  profile,
  verifyToken,
} from "../controllers/auth.controllers.js";
import { authRequired } from "../middlewares/validateToken.js";
import {validateSchema} from "../middlewares/validator.midelware.js";
import {loginSchema, registerSchema} from "../schemas/auth.schema.js"
const router = Router();

router.post("/register", validateSchema(registerSchema), register);

router.post("/login",validateSchema(loginSchema), login);

router.post("/logout", logout);

router.get("/verify",  verifyToken);
router.get("/profile", authRequired, profile);

export default router;
