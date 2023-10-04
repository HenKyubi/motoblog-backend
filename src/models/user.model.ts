// Libs
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

//Models
import { PostModel } from "./post.model";
import { CommentModel } from "./comment.model";

@Entity()
export class UserModel extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  country: string;

  @Column()
  countryCode: string;

  @Column()
  phoneNumber: string;

  @Column({
    unique: true,
  })
  username: string;

  @Column()
  password: string;

  //Relations
  @OneToMany(() => PostModel, (post) => post.userId, {
    nullable: true,
  })
  posts?: PostModel[];

  @OneToMany(() => CommentModel, (comment) => comment.userId, {
    nullable: true,
  })
  comments?: CommentModel[];

  @CreateDateColumn()
  createAt: Date;

  @UpdateDateColumn()
  updateAt: Date;
}
