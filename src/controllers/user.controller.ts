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
        country: tempUserData.country,
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
      country: req.body?.country,
      countryCode: req.body?.countryCode,
      password: req.body?.password,
      phoneNumber: req.body?.phoneNumber,
      photo: req.body?.photo,
      username: req.body?.username,
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
