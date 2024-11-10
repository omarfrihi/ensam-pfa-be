import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { User } from "./User";

@Entity()
export class QueryHistory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar" })
  query: string;

  @ManyToOne(() => User, (account) => account.queries)
  user: User;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
