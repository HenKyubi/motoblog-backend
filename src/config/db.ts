// Lib
import { DataSource } from "typeorm";

// Config
import { DB_PORT, DB_USER, DB_PASSWORD, DB_NAME, DB_HOST } from "./config";

//Models

export const AppDataSource = new DataSource({
  type: "mysql",
  host: DB_HOST,
  port: DB_PORT,
  username: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,
  synchronize: true,
  logging: true,
  entities: [],
});
