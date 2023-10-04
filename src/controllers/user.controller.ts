// Types
import { Response } from "express";
import {
  RequestGetUserById,
  RequestSignUp,
} from "../interfaces/request.interface";
import { ResponseCreateUser } from "../interfaces/response.interface";
import { FormSignUp } from "../interfaces/forms.interface";

// Utils
import { handleError } from "../utils/error.handle";
import { generateToken } from "../utils/jwt.handle";

// Services
import { createUserService } from "../services/user.service";

export const createUserController = async (
  req: RequestSignUp,
  res: Response
) => {
  try {
    const newUserData: FormSignUp = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      country: req.body.country,
      countryCode: req.body.countryCode,
      password: req.body.password,
      phoneNumber: req.body.phoneNumber,
      username: req.body.username,
    };

    const newUser = await createUserService(newUserData);

    const token = generateToken({
      userId: newUser.id,
      username: newUser.username,
    });

    const response: ResponseCreateUser = {
      message: "User registered!.",
      token,
      userData: {
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        country: newUser.country,
        phoneNumber: newUser.phoneNumber,
        username: newUser.username,
      },
    };

    return res.status(201).send(response);
  } catch (error) {
    handleError(res, `${error}`);
  }
};

export const getUserController = async (
  req: RequestGetUserById,
  res: Response
) => {};
