/******************* IMPORT ************************************************/
import { Router } from "express";
const router = Router();

import { register, login, logout } from "../controllers/authController.js";
import {
  validateRegisterInput,
  validateLoginInput,
} from "../middleware/validationMiddleware.js";

/******************* ROUTER ************************************************/
router.post("/register", validateRegisterInput, register);
router.post("/login", validateLoginInput, login);
router.get("/logout", logout);

/******************* EXPORT ************************************************/
export default router;
