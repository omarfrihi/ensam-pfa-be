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
enum EAcountType {
  SAVING = "SAVING",
  CURRENT = "CURRENT",
}
@Entity()
export class BankAccount {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", length: 20 })
  accountNumber: string;

  @Column({ type: "varchar", length: 50 })
  bankName: string;

  @Column({ type: "decimal", precision: 10, scale: 2 })
  balance: number;

  @ManyToOne(() => Client, (client) => client.bankAccounts)
  client: Client;

  @Column({ type: "enum", enum: EAcountType })
  accountType: EAcountType;

  @OneToMany(() => Operation, (operation) => operation.bankAcount)
  operations: Operation[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
