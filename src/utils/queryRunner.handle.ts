import { QueryRunner } from "typeorm";
import { AppDataSource } from "../config/db";

export const queryRunnerHandle =async (run: ()=>void , queryRunner?: QueryRunner) => {
  try {
    // Flag for manage the connection if query runner is sended.
    let shouldReleaseQueryRunner = false;

    // If query runner isn´t sended...
    if (!queryRunner) {
      queryRunner = AppDataSource.createQueryRunner();

      await queryRunner.connect();

      await queryRunner.startTransaction();

      shouldReleaseQueryRunner = true;
    }

    try {
      // Eject


      //Save changes if...
      if (shouldReleaseQueryRunner) {
        await queryRunner.commitTransaction();
      }
    } catch (error) {
      // Rollback changes if...
      if (shouldReleaseQueryRunner) {
        await queryRunner.rollbackTransaction();
      }

      throw `${error}`;
    } finally {
      // Release connection if...
      if (shouldReleaseQueryRunner) {
        await queryRunner.release();
      }
    }
  } catch (error) {
    throw `${error}`;
  }
}