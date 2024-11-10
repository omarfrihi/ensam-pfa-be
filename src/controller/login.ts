import { compare } from "bcrypt";
import { Request, Response } from "express";
import { getManager } from "typeorm";
import { User } from "../entity/User";
import { generateToken } from "../utils/generateToken";

export async function login(request: Request, response: Response) {
  try {
    const { username, password } = request.body;

    if (!username)
      return response.status(500).json({ message: "user is required" });
    if (!password)
      return response.status(500).json({ message: "password is required" });

    const user = await getManager()
      .getRepository(User)
      .findOne({ where: { username } });

    if (!user) return response.status(401).json({ message: "user not found" });
    const isPasswordMatch = await compare(password, user?.password);
    if (!isPasswordMatch)
      return response.status(401).json({ message: "password not match" });

    const token = generateToken({ id: user.id });

    response.status(200).json({ message: "Login successful", token });
  } catch (e) {
    response.status(500).json({ message: e.message });
  }
}
