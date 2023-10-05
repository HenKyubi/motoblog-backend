// Types
import { NextFunction, Response } from "express";
import { RequestMatchComment } from "../interfaces/request.interface";

// Utils
import { handleError } from "../utils/error.handle";

// Services
import { matchCommentService } from "../services/comment.service";

export const matchAndGetComment = async (
  req: RequestMatchComment,
  res: Response,
  next: NextFunction
) => {
  try {
    // Get data for search and match
    const userId = req.user!.userId;
    const postId = parseInt(req.params.id);
    const commentId = parseInt(req.params.commentId);

    const response = await matchCommentService(userId, postId, commentId);

    if (!response) {
      return res.status(404).send({ message: "Comment not found." });
    }

    // Save post data in request
    req.comment = response;

    next();
  } catch (e) {
    return handleError(res, `${e}`, 400);
  }
};
