// Libs
import { sign, verify } from "jsonwebtoken";

// Types
import { JWTMock } from "../interfaces/jwt.interface";

// Configs
import { JWT_SECRET } from "../config/config";

export const generateToken = (userData: JWTMock) => {
  const jwt = sign(userData, JWT_SECRET, {
    expiresIn: "4h",
  });
  return jwt;
};

export const verifyToken = (jwt: string) => {
  const tokenData: JWTMock = verify(jwt, JWT_SECRET) as JWTMock;
  return tokenData;
};
