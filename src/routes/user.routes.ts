import { Router } from "express";

//Middlewares
import { checkJwt } from "../middlewares/checkSession.middleware";

//Controllers
import { createUserController } from "../controllers/user.controller";

//Routes
export const userRoutes = Router();

userRoutes.get("/", checkJwt);
userRoutes.get("/:id");
userRoutes.post("/", createUserController);
userRoutes.put("/:id", checkJwt);
userRoutes.delete("/:id", checkJwt);
