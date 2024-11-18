import { faker } from "@faker-js/faker";
import { getManager } from "typeorm";
import { BankAccount, EAcountType } from "./entity/BankAccount";
import { Client } from "./entity/Client";
import { EOperationCanal, EOperationType, Operation } from "./entity/Operation";

export const seed = async () => {
  const clientRepository = getManager().getRepository(Client);
  const bankAccountRepository = getManager().getRepository(BankAccount);
  const operationepository = getManager().getRepository(Operation);
  const userRepository = getManager().getRepository(User);
  const admin = userRepository.create({
    username: "admin",
    password: "$2a$12$vhkkydL3qJt7oTfiGGlUzeHrC2fKIP37vm3cNXd9o2Vml7MP2AD4C",
    role: EROLE.ADMIN,
  });
  await userRepository.save(admin);

  const regular = userRepository.create({
    username: "user",
    password: "$2a$12$vhkkydL3qJt7oTfiGGlUzeHrC2fKIP37vm3cNXd9o2Vml7MP2AD4C",
    role: EROLE.REGULAR,
  });
  await userRepository.save(regular);

  for (let i = 0; i < 150; i++) {
    const client = clientRepository.create({
      name: faker.name.fullName(),
      email: faker.internet.email(),
    });

    const savedClient = await clientRepository.save(client);

    for (let i = 0; i < Math.floor(Math.random() * 150); i++) {
      const bankAccount = bankAccountRepository.create({
        accountNumber: faker.finance.accountNumber(),
        balance: parseFloat(faker.finance.amount()),
        client: savedClient,
        bankName: faker.company.name(),
        accountType: Object.values(EAcountType)[Math.floor(Math.random() * 2)],
        isActive: Math.floor(Math.random() * 8) % 2 === 0,
      });
      const savedBankAccount = await bankAccountRepository.save(bankAccount);

      for (let i = 0; i < Math.floor(Math.random() * 150); i++) {
        const operation = operationepository.create({
          amount: parseFloat(faker.finance.amount()),
          bankAcount: savedBankAccount,
          canal: Object.values(EOperationCanal)[Math.floor(Math.random() * 6)],
          type: Object.values(EOperationType)[Math.floor(Math.random() * 2)],
        });
        await operationepository.save(operation);
      }
    }
  }
};

import "reflect-metadata";
import { createConnection } from "typeorm";
import { EROLE, User } from "./entity/User";
var cors = require("cors");

require("dotenv").config();

createConnection().then(async (connection) => {
  seed();
});
