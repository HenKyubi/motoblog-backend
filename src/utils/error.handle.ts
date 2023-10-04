// Types
import { Response } from "express";

export const handleError = (
  res: Response,
  error: string,
  errorCode?: number
) => {
  res.status(errorCode || 500).send({ message: error });
};
