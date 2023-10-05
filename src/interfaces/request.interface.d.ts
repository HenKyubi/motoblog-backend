// Types
import { Request } from "express";
import { JWTMock } from "./jwt.interface";
import {
  FormCreateComment,
  FormCreatePost,
  FormLogin,
  FormSignUp,
  FormUpdateComment,
  FormUpdatePost,
  FormUpdateUser,
} from "./forms.interface";
import { UserModel } from "../models/user.model";

export interface RequestAuth extends Request {
  user?: JWTMock;
}

export interface RequestSignUp extends Request {
  body: FormSignUp;
}

export interface RequestLogin extends Request {
  body: FormLogin;
}

export interface RequestCreatePost extends RequestAuth {
  body: FormCreatePost;
}

export interface RequestGetPost extends RequestAuth {
  body: {};
  params: {
    id: string;
  };
}

export interface RequestGetPosts extends RequestAuth {
  body: {};
  params: {};
}

export interface RequestMatchPostUser extends RequestAuth {
  post?: any;
  params: { id: string };
}

export interface RequestUpdatePost extends RequestMatchPostUser {
  body: FormUpdatePost;
}

export interface RequestDeletePost extends RequestMatchPostUser {
  body: {};
}

export interface RequestCreateComment extends RequestAuth {
  body: FormCreateComment;
  params: {
    id: string;
  };
}

export interface RequestGetComment extends RequestAuth {
  body: {};
  params: {
    commentId: string;
  };
}

export interface RequestGetComments extends RequestAuth {
  body: {};
  params: {
    id: string;
  };
}

export interface RequestMatchComment extends RequestAuth {
  comment?: any;
  params: {
    id: string;
    commentId: string;
  };
}

export interface RequestUpdateComment extends RequestMatchComment {
  body: FormUpdateComment;
}

export interface RequestDeleteComment extends RequestMatchComment {
  body: {};
}

export interface RequestGetUserByUsername extends RequestMatchUserByUsername {}

export interface RequestMatchUserByUsername extends RequestAuth {
  params: {
    username: string;
  };
  usr?: UserModel;
}

export interface RequestUpdateUser extends RequestMatchUserByUsername {
  body: FormUpdateUser;
}

export interface RequestDeleteUser extends RequestMatchUserByUsername {
  body: {};
}
