// Libs
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
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
  title: string;

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

  @CreateDateColumn()
  createAt: Date;

  @UpdateDateColumn()
  updateAt: Date;

  //Relations
  @ManyToOne(() => UserModel, (user) => user.posts)
  user: UserModel;

  @OneToMany(() => CommentModel, (comment) => comment.post, {
    onDelete: "CASCADE",
  })
  comments: CommentModel[];
}
