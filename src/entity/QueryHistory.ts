import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { EROLE, User } from "./User";

@Entity({ comment: JSON.stringify({ scope: [] }) })
export class QueryHistory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "longtext" })
  query: string;

  @Column({ type: "longtext" })
  queryResult: string;

  @ManyToOne(() => User, (account) => account.queries)
  user: User;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
