// Types
import { Router } from "express";

//Middlewares
import { checkJwt } from "../middlewares/checkSession.middleware";
import { matchAndGetComment } from "../middlewares/matchAndGetComment.middleware";

//Controllers
import {
  createCommentController,
  deleteCommentByIdController,
  getCommentByIdController,
  getCommentsController,
  updateCommentByIdController,
} from "../controllers/comment.controller";

//Routes
export const commentRoutes = Router({ mergeParams: true });

commentRoutes.post("/", checkJwt, createCommentController);
commentRoutes.get("/", checkJwt, getCommentsController);
commentRoutes.get("/:commentId", checkJwt, getCommentByIdController);
commentRoutes.put(
  "/:commentId",
  checkJwt,
  matchAndGetComment,
  updateCommentByIdController
);
commentRoutes.delete(
  "/:commentId",
  checkJwt,
  matchAndGetComment,
  deleteCommentByIdController
);
