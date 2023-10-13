import express from "express";
import morgan from "morgan";
import cors from "cors";

//Routes
import { userRoutes } from "./routes/user.routes";
import { postRoutes } from "./routes/post.routes";
import { commentRoutes } from "./routes/comment.routes";
import { authRoutes } from "./routes/auth.routes";

const app = express();

app.use(morgan("dev"));

app.use(express.json());

app.use(cors());

//Use routes
app.use("/api", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/post", postRoutes);
app.use("/api/post/:id/comment", commentRoutes);

export default app;
