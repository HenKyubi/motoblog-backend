// Lib
import { config } from "dotenv";

config();

// Export config const
export const PORT = process.env.PORT || 3001;

export const DB_HOST = process.env.DB_HOST || "localhost";

export const DB_PORT = parseInt(process.env.DB_PORT!) || 3306;

export const DB_USER = process.env.DB_USER || "test";

export const DB_PASSWORD = process.env.DB_PASSWORD || "1234";

export const DB_NAME = process.env.DB_NAME || "test";

export const JWT_SECRET = process.env.JWT_SECRET || "test";
