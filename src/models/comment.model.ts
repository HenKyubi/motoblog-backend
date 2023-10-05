// Libs
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

//Models
import { PostModel } from "./post.model";
import { UserModel } from "./user.model";

@Entity()
export class CommentModel extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  comment: string;

  @CreateDateColumn()
  createAt: Date;

  @UpdateDateColumn()
  updateAt: Date;

  //Relations
  @ManyToOne(() => PostModel, (post) => post.comments)
  post: PostModel;

  @ManyToOne(() => UserModel, (user) => user.comments)
  user: UserModel;
}
