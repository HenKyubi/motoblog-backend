// Types
import { NextFunction, Response } from "express";
import { RequestMatchUserByUsername } from "../interfaces/request.interface";

// Utils
import { handleError } from "../utils/error.handle";

// Services
import { getUserByUsernameService } from "../services/user.service";

export const matchUserByUsername = async (
  req: RequestMatchUserByUsername,
  res: Response,
  next: NextFunction
) => {
  try {
    // Get data for search and match
    const { username } = req.params;

    const response = await getUserByUsernameService(username);

    if (!response) {
      return res.status(404).send({ message: "User not found." });
    }

    // Save post data in request
    req.usr = response;

    next();
  } catch (e) {
    return handleError(res, `${e}`, 400);
  }
};
