import { Router } from "express";

//Middlewares
//Controllers
import { createUserController } from "../controllers/user.controller";

//Routes
export const userRoutes = Router();

userRoutes.get("/");
userRoutes.get("/:id");
userRoutes.post("/", createUserController);
userRoutes.put("/");
userRoutes.delete("/");
