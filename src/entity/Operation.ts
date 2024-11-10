import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { BankAccount } from "./BankAccount";
enum EOperationType {
  credit = "credit",
  debit = "debit",
}

enum EOperationNature {
  withrawAtm = "withrawAtm",
  ecomNational = "ecomNational",
  ecomInternational = "ecomInternational",
  tpe = "tpe",
  virement = "virement",
  prelevement = "prelevement",
}

@Entity()
export class Operation {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "decimal" })
  amount: number;

  @Column({ type: "enum", enum: EOperationType })
  type: EOperationType;

  @Column({ type: "enum", enum: EOperationNature })
  nature: EOperationNature;

  @ManyToOne(() => BankAccount, (bankAcount) => bankAcount.operations)
  bankAcount: BankAccount;

  @CreateDateColumn()
  operationDate: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
