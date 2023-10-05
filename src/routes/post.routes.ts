// Types
import { Router } from "express";

//Middlewares
import { checkJwt } from "../middlewares/checkSession.middleware";
import { matchPostUser } from "../middlewares/matchPostUser.middleware";

//Controllers
import {
  createPostController,
  deletePostController,
  getPostByIdController,
  getPostsController,
  getPublicPostsController,
  updatePostController,
} from "../controllers/post.controller";

//Routes
export const postRoutes = Router();

postRoutes.get("/public", getPublicPostsController);
postRoutes.post("/", checkJwt, createPostController);
postRoutes.get("/", checkJwt, getPostsController);
postRoutes.get("/:id", checkJwt, getPostByIdController);
postRoutes.put("/:id", checkJwt, matchPostUser, updatePostController);
postRoutes.delete("/:id", checkJwt, matchPostUser, deletePostController);
