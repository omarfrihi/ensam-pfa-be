import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { BankAccount } from "./BankAccount";
import { QueryHistory } from "./QueryHistory";

export enum EROLE {
  ADMIN = "ADMIN",
  REGULAR = "REGULAR",
}

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", length: 100 })
  username: string;

  @Column({ type: "varchar", length: 100 })
  password: string; // Make sure to hash this

  @Column({ type: "enum", enum: EROLE })
  role: EROLE;
  @OneToMany(() => QueryHistory, (query) => query.user)
  queries: QueryHistory[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
