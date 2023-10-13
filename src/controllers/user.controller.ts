// Types
import { Request, Response } from "express";
import {
  RequestDeleteUser,
  RequestGetUserByUsername,
  RequestSignUp,
  RequestUpdateUser,
} from "../interfaces/request.interface";
import {
  ResponseCreateUser,
  ResponseGetUserByUsername,
} from "../interfaces/response.interface";
import { FormSignUp, FormUpdateUser } from "../interfaces/forms.interface";

// Utils
import { handleError } from "../utils/error.handle";
import { generateToken } from "../utils/jwt.handle";

// Services
import {
  createUserService,
  deleteUserByIdService,
  getUsersService,
  updateUserByIdService,
} from "../services/user.service";

export const createUserController = async (
  req: RequestSignUp,
  res: Response
) => {
  try {
    const newUserData: FormSignUp = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      password: req.body.password,
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
        username: newUser.username,
      },
    };

    return res.status(201).send(response);
  } catch (error) {
    handleError(res, `${error}`);
  }
};

export const getUserController = async (
  req: RequestGetUserByUsername,
  res: Response
) => {
  try {
    const tempUserData = req.usr!;

    const response: ResponseGetUserByUsername = {
      userData: {
        firstName: tempUserData.firstName,
        username: tempUserData.username,
        lastName: tempUserData.lastName,
        photo: tempUserData?.photo,
      },
    };

    return res.send(response);
  } catch (error) {
    handleError(res, `${error}`);
  }
};

export const getUsersController = async (req: Request, res: Response) => {
  try {
    const response = await getUsersService();

    return res.send(response);
  } catch (error) {
    handleError(res, `${error}`);
  }
};

export const updateUserController = async (
  req: RequestUpdateUser,
  res: Response
) => {
  try {
    const userId = req.usr!.id;

    const userUpdate: FormUpdateUser = {
      firstName: req.body?.firstName,
      lastName: req.body?.lastName,
      username: req.body?.username,
      password: req.body?.password,
      photo: req.body?.photo,
    };

    await updateUserByIdService(userId, userUpdate);

    return res.send({ message: "User updated!" });
  } catch (error) {
    handleError(res, `${error}`);
  }
};

export const deleteUserController = async (
  req: RequestDeleteUser,
  res: Response
) => {
  try {
    const userId = req.usr!.id;

    await deleteUserByIdService(userId);

    res.send({ message: "User deleted!." });
  } catch (error) {
    handleError(res, `${error}`);
  }
};
