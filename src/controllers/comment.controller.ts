// Types
import { Response } from "express";
import { RequestCreateComment } from "../interfaces/request.interface";
import { FormCreateComment } from "../interfaces/forms.interface";
import { ResponseCreateComment } from "../interfaces/response.interface";

// Utils
import { handleError } from "../utils/error.handle";

// Services
import { createCommentService } from "../services/comment.service";

export const createCommentController = async (
  req: RequestCreateComment,
  res: Response
) => {
  try {
    // Get data for use service
    const commentData: FormCreateComment = {
      comment: req.body.comment,
    };

    const { userId } = req.user!;

    const postId = parseInt(req.params.id);

    await createCommentService(commentData, postId, userId);

    const response: ResponseCreateComment = {
      message: "Comment saved!.",
    };

    return res.status(201).send(response);
  } catch (error) {
    handleError(res, `${error}`);
  }
};
