// Types
import { QueryRunner } from "typeorm";
import { FormCreatePost } from "../interfaces/forms.interface";

// Config
import { AppDataSource } from "../config/db";
import { PostModel } from "../models/post.model";
import { Visibility } from "../types/enums.type";

export const createPostService = async (
  postData: FormCreatePost,
  userId: number,
  queryRunner?: QueryRunner
) => {
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
      // Create post
      await queryRunner.manager.save(PostModel, {
        ...postData,
        userId,
      });

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
};

export const getPostsService = async (queryRunner?: QueryRunner) => {
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
      // Search posts
      const response = await queryRunner.manager.find(PostModel, {
        relations: {
          comments: true,
          userId: true,
        },
        order: {
          updateAt: "DESC",
          comments: {
            updateAt: "DESC",
          },
        },
        select: {
          userId: {
            firstName: true,
            lastName: true,
            photo: true,
            username: true,
          },
        },
      });

      //Save changes if...
      if (shouldReleaseQueryRunner) {
        await queryRunner.commitTransaction();
      }

      return response;
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
};

export const getPublicPostsService = async (queryRunner?: QueryRunner) => {
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
      // Search posts
      const response = await queryRunner.manager.find(PostModel, {
        where: {
          visibility: Visibility.PUBLIC,
        },
        order: {
          updateAt: "DESC",
        },
        relations: {
          userId: true
        },
        select:{
          userId: {
            username: true,
          }
        }
      });

      //Save changes if...
      if (shouldReleaseQueryRunner) {
        await queryRunner.commitTransaction();
      }

      return response;
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
};
