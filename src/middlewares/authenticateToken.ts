import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
export const authenticateToken = (
  req: Request & { user: object },
  res: Response,
  next: NextFunction
) => {
  const token = req.headers["authorization"]?.split(" ")[1];

  if (!token) return res.sendStatus(401);
  verify(token, process.env.JWT_SECRET as string, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};
