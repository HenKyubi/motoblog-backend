// Types
import { Response } from "express";
import {
  RequestCreateComment,
  RequestDeleteComment,
  RequestGetComment,
  RequestGetComments,
  RequestUpdateComment,
} from "../interfaces/request.interface";
import { FormCreateComment } from "../interfaces/forms.interface";
import { ResponseCreateComment } from "../interfaces/response.interface";

// Utils
import { handleError } from "../utils/error.handle";

// Services
import {
  createCommentService,
  deleteCommentByIdService,
  getCommentByIdService,
  getCommentsService,
  updateCommentByIdService,
} from "../services/comment.service";

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

    const postId = req.params.id;

    await createCommentService(commentData, postId, userId);

    const response: ResponseCreateComment = {
      message: "Comment saved!.",
    };

    return res.status(201).send(response);
  } catch (error) {
    handleError(res, `${error}`);
  }
};

export const getCommentsController = async (
  req: RequestGetComments,
  res: Response
) => {
  try {
    // Get data for use service
    const postId = req.params.id;

    const response = await getCommentsService(postId);

    return res.send(response);
  } catch (error) {
    handleError(res, `${error}`);
  }
};

export const getCommentByIdController = async (
  req: RequestGetComment,
  res: Response
) => {
  try {
    // Get data for use service
    const { commentId } = req.params;
    const response = await getCommentByIdService(commentId);

    if (!response) {
      return res.status(404).send({ message: "Comment no found!." });
    }

    return res.send(response);
  } catch (error) {
    handleError(res, `${error}`);
  }
};

export const updateCommentByIdController = async (
  req: RequestUpdateComment,
  res: Response
) => {
  try {
    // Get data for use service
    const { commentId } = req.params;
    const commentUpdate = {
      comment: req.body?.comment,
    };

    await updateCommentByIdService(commentId, commentUpdate);

    return res.send({ massage: "Comment updated!." });
  } catch (error) {
    handleError(res, `${error}`);
  }
};

export const deleteCommentByIdController = async (
  req: RequestDeleteComment,
  res: Response
) => {
  try {
    // Get data for use service
    const { commentId } = req.params;

    const response = await deleteCommentByIdService(commentId);

    return res.send(response);
  } catch (error) {
    handleError(res, `${error}`);
  }
};
