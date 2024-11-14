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

@Entity({
  comment: JSON.stringify({ scope: [EROLE.ADMIN], label: "Utilisateur" }),
})
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", length: 100, comment: "Nom d'utilsateur" })
  username: string;

  @Column({ type: "varchar", length: 100, comment: "password" })
  password: string; // Make sure to hash this

  @Column({ type: "enum", enum: EROLE, comment: "Role" })
  role: EROLE;
  @OneToMany(() => QueryHistory, (query) => query.user)
  queries: QueryHistory[];

  @CreateDateColumn({ comment: "Date de creation de l'utilisateur" })
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
