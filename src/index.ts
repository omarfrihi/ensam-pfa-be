import "reflect-metadata";
import { createConnection } from "typeorm";
import { Request, Response } from "express";
import * as express from "express";
import * as bodyParser from "body-parser";
import { AppRoutes } from "./routes";
import { authenticateToken } from "./middlewares/authenticateToken";
import { login } from "./controller/login";
var cors = require("cors");
import * as serverless from "serverless-http";

require("dotenv").config();

// Wrapping the logic inside a serverless function handler
const handler = async (req: Request, res: Response) => {
  try {
    // Ensure database connection only occurs when a request is received
    const connection = await createConnection();

    const app = express();
    app.use(cors());
    app.use(bodyParser.json());

    app.post("/login", login);

    // Setting up routes with authentication middleware
    AppRoutes.forEach((route) => {
      app[route.method](
        route.path,
        authenticateToken,
        (request: Request, response: Response, next: Function) => {
          route
            .action(request as any, response)
            .then(() => next())
            .catch((err) => next(err));
        }
      );
    });

    // Instead of app.listen(), return the serverless handler
    serverless(app)(req, res); // This will handle the HTTP request/response for serverless
  } catch (error) {
    console.error("Error in handler:", error);
    res.status(500).send("Internal Server Error");
  }
};

// Export the handler to make it available for Vercel
module.exports.handler = handler;
