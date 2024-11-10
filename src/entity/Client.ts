import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { BankAccount } from "./BankAccount";

@Entity()
export class Client {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", length: 100 })
  name: string;

  @Column({ type: "varchar", unique: true, length: 100 })
  email: string;

  @Column({ type: "varchar", length: 100 })
  password: string;

  @OneToMany(() => BankAccount, (bankAccount) => bankAccount.client)
  bankAccounts: BankAccount[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
