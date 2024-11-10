import "reflect-metadata";
import { createConnection } from "typeorm";
import { Request, Response } from "express";
import * as express from "express";
import * as bodyParser from "body-parser";
import { AppRoutes } from "./routes";
import { authenticateToken } from "./middlewares/authenticateToken";
import { login } from "./controller/login";
var cors = require("cors");

require("dotenv").config();

createConnection()
  .then(async (connection) => {
    const app = express();
    app.use(cors());
    app.use(bodyParser.json());
    app.post("/login", login);
    AppRoutes.forEach((route) => {
      app[route.method](
        route.path,
        authenticateToken,
        (request: Request, response: Response, next: Function) => {
          route
            .action(request, response)
            .then(() => next)
            .catch((err) => next(err));
        }
      );
    });

    app.listen(3001);

    console.log("Express application is up and running on port 3001");
  })
  .catch((error) => console.log("TypeORM connection error: ", error));
