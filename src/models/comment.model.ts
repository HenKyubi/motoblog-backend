// Libs
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
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

  //Relations
  @ManyToOne(() => PostModel, (post) => post.comments, {
    cascade: true,
  })
  @JoinColumn({ name: "postId" })
  postId: number | PostModel;

  @ManyToOne(() => UserModel, (user) => user.comments, {
    cascade: true,
  })
  @JoinColumn({ name: "userId" })
  userId: number | UserModel;

  @CreateDateColumn()
  createAt: Date;

  @UpdateDateColumn()
  updateAt: Date;
}
