// Types
import { NextFunction, Response } from "express";
import { RequestMatchUserByUsername } from "../interfaces/request.interface";

// Utils
import { handleError } from "../utils/error.handle";

export const matchRequestUser = async (
  req: RequestMatchUserByUsername,
  res: Response,
  next: NextFunction
) => {
  try {
    // Get data for search and match
    const { username } = req.usr!;
    const usernameFromToken = req.user!.username;

    if (username === usernameFromToken) {
      next();
    } else {
      return res
        .status(401)
        .send({ message: "Not authorized for this action." });
    }
  } catch (e) {
    return handleError(res, `${e}`, 400);
  }
};
