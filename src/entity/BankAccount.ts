import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from "typeorm";
import { Client } from "./Client";
import { Operation } from "./Operation";
import { EROLE } from "./User";
enum EAcountType {
  SAVING = "SAVING",
  CURRENT = "CURRENT",
}
@Entity({ comment: JSON.stringify({ scope: [EROLE.ADMIN, EROLE.REGULAR] }) })
export class BankAccount {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", length: 20, comment: "Numero de compte" })
  accountNumber: string;

  @Column({ type: "varchar", length: 50, comment: "Nom du banque" })
  bankName: string;

  @Column({ type: "decimal", precision: 10, scale: 2, comment: "Solde" })
  balance: number;

  @ManyToOne(() => Client, (client) => client.bankAccounts)
  client: Client;

  @Column({ type: "enum", enum: EAcountType, comment: "Type de compte" })
  accountType: EAcountType;

  @OneToMany(() => Operation, (operation) => operation.bankAcount)
  operations: Operation[];

  @CreateDateColumn({ comment: "Date de creation" })
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
