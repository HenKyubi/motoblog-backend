// Types
import { Request, Response } from "express";
import {
  RequestAuth,
  RequestCreatePost,
} from "../interfaces/request.interface";
import { ResponseCreatePost } from "../interfaces/response.interface";
import { FormCreatePost } from "../interfaces/forms.interface";

// Utils
import { handleError } from "../utils/error.handle";

// Services
import {
  createPostService,
  getPostsService,
  getPublicPostsService,
} from "../services/post.service";

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

    const response: ResponseCreatePost = { message: "Post created!." };

    return res.status(201).send(response);
  } catch (error) {
    handleError(res, `${error}`);
  }
};

export const getPostsController = async (req: Request, res: Response) => {
  try {
    const posts = await getPostsService();

    return res.status(200).send(posts);
  } catch (error) {
    handleError(res, `${error}`);
  }
};

export const getPostByIdController = async (req: Request, res: Response) => {
  try {
  } catch (error) {
    handleError(res, `${error}`);
  }
};

export const getPublicPostsController = async (req: Request, res: Response) => {
  try {
    const posts = await getPublicPostsService();

    return res.status(200).send(posts);
  } catch (error) {
    handleError(res, `${error}`);
  }
};

export const updatePostController = async (req: Request, res: Response) => {
  try {
  } catch (error) {
    handleError(res, `${error}`);
  }
};

export const deletePostController = async (req: Request, res: Response) => {
  try {
  } catch (error) {
    handleError(res, `${error}`);
  }
};
