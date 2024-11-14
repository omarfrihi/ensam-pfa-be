import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { BankAccount } from "./BankAccount";
import { EROLE } from "./User";

@Entity({ comment: JSON.stringify({ scope: [EROLE.ADMIN, EROLE.REGULAR] }) })
export class Client {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", length: 100, comment: "Nom du client" })
  name: string;

  @Column({ type: "varchar", unique: true, length: 100, comment: "Email" })
  email: string;

  @Column({ type: "varchar", length: 100 })
  password: string;

  @OneToMany(() => BankAccount, (bankAccount) => bankAccount.client)
  bankAccounts: BankAccount[];

  @CreateDateColumn({ comment: "Date de creation du compte" })
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
