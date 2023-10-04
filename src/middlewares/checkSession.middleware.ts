// Types
import { NextFunction, Response } from "express";
import { RequestAuth } from "../interfaces/request.interface";

// Utils
import { verifyToken } from "../utils/jwt.handle";
import { handleError } from "../utils/error.handle";

export const checkJwt = (
  req: RequestAuth,
  res: Response,
  next: NextFunction
) => {
  try {
    // Get header
    const jwtByUser = req.headers.authorization || null;

    //Validate if header authorization exist
    if (!jwtByUser)
      return handleError(res, "You are not unauthenticated.", 401);

    // Get token from header
    const jwt = jwtByUser.split(" ").pop()!;

    // Verify and get token data
    const tokenData = verifyToken(jwt);

    // Save token data in request(.user)
    req.user = tokenData;

    next();
  } catch (e) {
    return handleError(res, `${e}`, 400);
  }
};
