// Libs
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

// Types
import { Visibility } from "../types/enums.type";

//Models
import { UserModel } from "./user.model";
import { CommentModel } from "./comment.model";

@Entity()
export class PostModel extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  tittle: string;

  @Column()
  description: string;

  @Column({
    type: "enum",
    enum: Visibility,
    default: Visibility.PRIVATE,
  })
  visibility: Visibility;

  @Column({
    nullable: true,
  })
  photo?: string;

  //Relations
  @ManyToOne(() => UserModel, (user) => user.posts, {
    cascade: true,
  })
  @JoinColumn({ name: "userId" })
  userId: number | UserModel;

  @OneToMany(() => CommentModel, (comment) => comment.postId)
  comments: CommentModel[];

  @CreateDateColumn()
  createAt: Date;

  @UpdateDateColumn()
  updateAt: Date;
}
