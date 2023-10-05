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

  @Column({ nullable: true })
  photo?: string;

  @CreateDateColumn()
  createAt: Date;

  @UpdateDateColumn()
  updateAt: Date;

  //Relations
  @OneToMany(() => PostModel, (post) => post.user, {
    nullable: true,
    onDelete: "CASCADE",
  })
  posts?: PostModel[];

  @OneToMany(() => CommentModel, (comment) => comment.user, {
    nullable: true,
    onDelete: "CASCADE",
  })
  comments?: CommentModel[];
}
