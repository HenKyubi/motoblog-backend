// Types
import { QueryRunner } from "typeorm";
import { FormCreatePost } from "../interfaces/forms.interface";

// Config
import { AppDataSource } from "../config/db";
import { PostModel } from "../models/post.model";
import { Visibility } from "../types/enums.type";
import { QueryDeepPartialEntity } from "typeorm/query-builder/QueryPartialEntity";
import { deleteCommentsByPostIdService } from "./comment.service";

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
        user: { id: userId },
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

export const getPostByIdService = async (
  postId: number,
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
      // Find post by id
      const post = await queryRunner.manager.findOne(PostModel, {
        where: {
          id: postId,
        },
        relations: {
          comments: {
            user: true,
          },
          user: true,
        },
        select: {
          user: {
            firstName: true,
            lastName: true,
            username: true,
          },
          comments: {
            comment: true,
            createAt: true,
            updateAt: true,

            user: {
              firstName: true,
              lastName: true,
              username: true,
            },
          },
        },
        order: {
          comments: {
            updateAt: "DESC",
          },
        },
      });

      if (!post) throw "Post not found";

      //Save changes if...
      if (shouldReleaseQueryRunner) {
        await queryRunner.commitTransaction();
      }

      return post;
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
          user: true,
        },
        order: {
          updateAt: "DESC",
          comments: {
            updateAt: "DESC",
          },
        },
        select: {
          user: {
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
          user: true,
        },
        select: {
          user: {
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

export const updatePostService = async (
  postId: number,
  postUpdate: QueryDeepPartialEntity<PostModel>,
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
      // Update post
      await queryRunner.manager.update(PostModel, { id: postId }, postUpdate);

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

export const deletePostService = async (
  postId: number,
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
      // Delete comments by post id
      await deleteCommentsByPostIdService(postId, queryRunner);

      // Delete post by id
      await queryRunner.manager.delete(PostModel, { id: postId });

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
