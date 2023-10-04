import "reflect-metadata";

import app from "./app";
import { PORT } from "./config/config";
import { AppDataSource } from "./config/db";

async function main() {
  try {
    await AppDataSource.initialize()
      .then(() => {
        console.log("Data Source has been initialized!");
      })
      .then(() => {
        app.listen(PORT, () => {
          console.log(`Server run on port ${PORT}`);
        });
      })
      .catch((err) => {
        console.error("Error during Data Source initialization", err);
      });
  } catch (error) {
    console.error(error);
  }
}

main();
