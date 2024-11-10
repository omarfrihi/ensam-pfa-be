import { sign } from "jsonwebtoken";

export const generateToken = (user: object): string => {
  return sign(user, process.env.JWT_SECRET as string, {});
};
