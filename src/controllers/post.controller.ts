// Types
import { Request, Response } from "express";
import {
  RequestCreatePost,
  RequestDeletePost,
  RequestUpdatePost,
} from "../interfaces/request.interface";
import { ResponseCreatePost } from "../interfaces/response.interface";
import { FormCreatePost, FormUpdatePost } from "../interfaces/forms.interface";

// Utils
import { handleError } from "../utils/error.handle";

// Services
import {
  createPostService,
  deletePostService,
  getPostByIdService,
  getPostsService,
  getPublicPostsService,
  updatePostService,
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
    const postId = parseInt(req.params.id);

    const post = await getPostByIdService(postId);

    return res.send(post);
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

export const updatePostController = async (
  req: RequestUpdatePost,
  res: Response
) => {
  try {
    const postUpdate: FormUpdatePost = {
      title: req.body?.title,
      description: req.body?.description,
      visibility: req.body?.visibility,
      photo: req.body?.photo,
    };

    const postId = req.post.id;

    await updatePostService(postId, postUpdate);

    return res.send({ message: "Post updated!" });
  } catch (error) {
    handleError(res, `${error}`);
  }
};

export const deletePostController = async (
  req: RequestDeletePost,
  res: Response
) => {
  try {
    const postId = req.post.id;

    await deletePostService(postId);

    return res.send({ message: "Post deleted!" });
  } catch (error) {
    handleError(res, `${error}`);
  }
};
