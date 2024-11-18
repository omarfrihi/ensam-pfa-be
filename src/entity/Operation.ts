import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { BankAccount } from "./BankAccount";
import { EROLE } from "./User";
export enum EOperationType {
  credit = "credit",
  debit = "debit",
}

export enum EOperationCanal {
  withrawAtm = "withrawAtm",
  ecomNational = "ecomNational",
  ecomInternational = "ecomInternational",
  tpe = "tpe",
  virement = "virement",
  prelevement = "prelevement",
}

@Entity({
  comment: JSON.stringify({
    scope: [EROLE.ADMIN, EROLE.REGULAR],
    label: "Operation",
  }),
})
export class Operation {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "decimal", comment: "Montnat de l'operation" })
  amount: number;

  @Column({
    type: "enum",
    enum: EOperationType,
    comment: "Type de l'operation",
  })
  type: EOperationType;

  @Column({
    type: "enum",
    enum: EOperationCanal,
    comment: "Canal de l'operation",
  })
  canal: EOperationCanal;

  @ManyToOne(() => BankAccount, (bankAcount) => bankAcount.operations)
  bankAcount: BankAccount;

  @CreateDateColumn({ comment: "Date de l'operation" })
  operationDate: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
