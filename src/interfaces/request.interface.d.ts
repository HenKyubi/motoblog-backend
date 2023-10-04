// Types
import { Request } from "express";
import { JWTMock } from "./jwt.interface";
import { FormLogin, FormSignUp } from "./forms.interface";

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
