// Types
import { JwtPayload } from "jsonwebtoken";

export interface JWTMock extends JwtPayload {
  userId: number;
  username: string;
  role: Role;
}
