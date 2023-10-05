// Types
import { NextFunction, Response } from "express";
import {
  RequestMatchPostUser,
} from "../interfaces/request.interface";
import { UserModel } from "../models/user.model";

// Utils
import { handleError } from "../utils/error.handle";

// Services
import { getPostByIdService } from "../services/post.service";

export const matchPostUser = async (
  req: RequestMatchPostUser,
  res: Response,
  next: NextFunction
) => {
  try {
    // Get post id
    const postId = parseInt(req.params.id);

    // Get username from request user
    const { username } = req.user!;

    // Search post by id
    const post = await getPostByIdService(postId);

    // Get username from post
    const { username: userNamePost } = post.user as UserModel;

    //Verify post and user match
    if (userNamePost !== username)
      return res.status(400).send({ message: "Post not is property of user." });

    // Save post data in request
    req.post = post;

    next();
  } catch (e) {
    return handleError(res, `${e}`, 400);
  }
};
