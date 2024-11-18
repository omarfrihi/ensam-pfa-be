import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { EROLE, User } from "./User";

@Entity({
  comment: JSON.stringify({ scope: [], label: "Historique de requette" }),
})
export class QueryHistory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "text" })
  query: string;

  @Column({ type: "text" })
  queryResult: string;

  @ManyToOne(() => User, (account) => account.queries)
  user: User;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
