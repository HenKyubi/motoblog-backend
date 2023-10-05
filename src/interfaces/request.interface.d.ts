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
} from "./forms.interface";

export interface RequestAuth extends Request {
  user?: JWTMock;
}

export interface RequestSignUp extends Request {
  body: FormSignUp;
}

export interface RequestGetUserById extends RequestAuth {}

export interface RequestLogin extends Request {
  body: FormLogin;
}

export interface RequestCreatePost extends RequestAuth {
  body: FormCreatePost;
}

export interface RequestMatchPostUser extends RequestAuth {
  post?: any;
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
    id: number;
  };
}

export interface RequestGetComment extends RequestAuth {
  body: {};
  params: {
    commentId: number;
  };
}

export interface RequestGetComments extends RequestAuth {
  body: {};
  params: {
    id: number;
  };
}

export interface RequestMatchComment extends RequestAuth {
  comment?: any;
  params: {
    id: number;
    commentId: number;
  };
}

export interface RequestUpdateComment extends RequestMatchComment {
  body: FormUpdateComment;
}

export interface RequestDeleteComment extends RequestMatchComment {
  body: {};
}
