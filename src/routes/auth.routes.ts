// Types
import { Router } from "express";

//Controllers
import { loginController } from "../controllers/auth.controller";
import { createUserController } from "../controllers/user.controller";

//Routes
export const authRoutes = Router();

authRoutes.post("/login", loginController);

authRoutes.post("/register", createUserController);

