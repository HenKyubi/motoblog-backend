// Types
import { Router } from "express";

//Middlewares
import { checkJwt } from "../middlewares/checkSession.middleware";

//Controllers
import { createCommentController } from "../controllers/comment.controller";

//Routes
export const commentRoutes = Router({ mergeParams: true });

commentRoutes.post("/", checkJwt, createCommentController);
commentRoutes.get("/");
commentRoutes.put("/");
commentRoutes.delete("/");
