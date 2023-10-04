// Types
import { Router } from "express";

//Controllers
import { loginController } from "../controllers/auth.controller";

//Routes
export const authRoutes = Router();

authRoutes.post("/", loginController);
