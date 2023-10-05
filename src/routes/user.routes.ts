import { Router } from "express";

//Middlewares
import { checkJwt } from "../middlewares/checkSession.middleware";

//Controllers
import {
  createUserController,
  deleteUserController,
  getUserController,
  getUsersController,
  updateUserController,
} from "../controllers/user.controller";
import { matchUserByUsername } from "../middlewares/matchUserByUsername.middleware";
import { matchRequestUser } from "../middlewares/matchRequestUser.middleware";

//Routes
export const userRoutes = Router();

userRoutes.post("/", createUserController);
userRoutes.get("/", checkJwt, getUsersController);
userRoutes.get("/:username", checkJwt, matchUserByUsername, getUserController);
userRoutes.put(
  "/:username",
  checkJwt,
  matchUserByUsername,
  matchRequestUser,
  updateUserController
);
userRoutes.delete(
  "/:username",
  checkJwt,
  matchUserByUsername,
  matchRequestUser,
  deleteUserController
);
