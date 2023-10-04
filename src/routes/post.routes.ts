// Types
import { Router } from "express";

//Middlewares
import { checkJwt } from "../middlewares/checkSession.middleware";

//Controllers
import { createPostController } from "../controllers/post.controller";

//Routes
export const postRoutes = Router();

postRoutes.post("/", checkJwt, createPostController);
postRoutes.get("/");
postRoutes.put("/");
postRoutes.delete("/");
