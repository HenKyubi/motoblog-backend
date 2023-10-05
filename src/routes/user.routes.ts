import { Router } from "express";

//Middlewares
import { checkJwt } from "../middlewares/checkSession.middleware";

//Controllers
import {
  createUserController,
  getUserController,
  getUsersController,
} from "../controllers/user.controller";
import { matchUserByUsername } from "../middlewares/matchUserByUsername.middleware";

//Routes
export const userRoutes = Router();

userRoutes.get("/", checkJwt);
userRoutes.get("/:username", checkJwt,matchUserByUsername, getUserController);
userRoutes.post("/", createUserController);
userRoutes.put("/:username", checkJwt);
userRoutes.delete("/:username", checkJwt);
