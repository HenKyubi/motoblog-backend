// Libs
import { QueryRunner } from "typeorm";

// Config
import { AppDataSource } from "../config/db";

// Utils
import { encrypt, verified } from "../utils/bcrypt.handle";

// Models
import { UserModel } from "../models/user.model";

// Types
import { FormLogin, FormSignUp } from "../interfaces/forms.interface";
import { generateToken } from "../utils/jwt.handle";
import { ResponseLogin } from "../interfaces/response.interface";
import { QueryDeepPartialEntity } from "typeorm/query-builder/QueryPartialEntity";
import { CommentModel } from "../models/comment.model";
import { PostModel } from "../models/post.model";

export const createUserService = async (
  userData: FormSignUp,
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
      // Encrypt password
      const passwordCrypt = await encrypt(userData.password);

      // Save user on db
      const newUser: UserModel = await queryRunner.manager.save(UserModel, {
        ...userData,
        password: passwordCrypt,
      });

      //Save changes if...
      if (shouldReleaseQueryRunner) {
        await queryRunner.commitTransaction();
      }

      return newUser;
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

export const loginService = async (
  loginData: FormLogin,
  queryRunner?: QueryRunner
): Promise<ResponseLogin> => {
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
      // Find user
      const userData = await queryRunner.manager.findOneBy(UserModel, {
        username: loginData.username,
      });

      // Reject if user not found
      if (!userData) throw "User no found.";

      //Get password encrypted.
      const passwordCrypt = userData.password;

      //Verify password is correct.
      const isCorrect = await verified(loginData.password, passwordCrypt);

      if (!isCorrect) throw "Wrong password.";

      //Get token to reply request
      const token = generateToken({
        userId: userData.id,
        username: userData.username,
      });

      //Save changes if...
      if (shouldReleaseQueryRunner) {
        await queryRunner.commitTransaction();
      }

      return {
        token,
        userData: {
          firstName: userData.firstName,
          lastName: userData.lastName,
          country: userData.country,
          phoneNumber: userData.phoneNumber,
          username: userData.username,
        },
      };
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

export const getUserByUsernameService = async (
  username: string,
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
      // Search user by username in db
      const user = await queryRunner.manager.findOne(UserModel, {
        where: { username },
      });

      //Save changes if...
      if (shouldReleaseQueryRunner) {
        await queryRunner.commitTransaction();
      }

      return user;
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

export const getUsersService = async (queryRunner?: QueryRunner) => {
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
      // Search users
      const users = queryRunner.manager.find(UserModel, {
        select: {
          firstName: true,
          username: true,
          lastName: true,
          country: true,
          photo: true,
        },
        order: {
          createAt: "DESC",
        },
      });

      //Save changes if...
      if (shouldReleaseQueryRunner) {
        await queryRunner.commitTransaction();
      }

      return users;
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

export const updateUserByIdService = async (
  userId: number,
  userUpdate: QueryDeepPartialEntity<UserModel>,
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
      // Update user
      if (!!userUpdate.password) {
        const passwordCrypt = await encrypt(userUpdate.password as string);

        await queryRunner.manager.update(
          UserModel,
          { id: userId },
          { ...userUpdate, password: passwordCrypt }
        );
      } else {
        await queryRunner.manager.update(UserModel, { id: userId }, userUpdate);
      }

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

export const deleteUserByIdService = async (
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
      // Delete comments
      await queryRunner.manager.delete(CommentModel, {
        user: {
          id: userId,
        },
      });

      // Delete posts
      await queryRunner.manager.delete(PostModel, {
        user: {
          id: userId,
        },
      });

      // Delete user
      await queryRunner.manager.delete(UserModel, { id: userId });

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
