// Types
import { Response } from "express";
import { RequestCreatePost } from "../interfaces/request.interface";
import { ResponseCreatePost } from "../interfaces/response.interface";
import { FormCreatePost } from "../interfaces/forms.interface";

// Utils
import { handleError } from "../utils/error.handle";

// Services
import { createPostService } from "../services/post.service";

export const createPostController = async (
  req: RequestCreatePost,
  res: Response
) => {
  try {
    const postData: FormCreatePost = {
      title: req.body.title,
      description: req.body.description,
      visibility: req.body.visibility,
      photo: req.body?.photo,
    };

    const { userId } = req.user!;

    await createPostService(postData, userId);

    const response: ResponseCreatePost = { message: "Post created!" };

    return res.send(response);
  } catch (error) {
    handleError(res, `${error}`);
  }
};
