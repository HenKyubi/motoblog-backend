// Types
import { JwtPayload } from "jsonwebtoken";
import { Role } from "../types/enums.type";

export interface JWTMock extends JwtPayload {
  userId: number;
  username: string;
  role?: Role;
}
