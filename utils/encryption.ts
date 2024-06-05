import { hash } from "argon2";
import * as dotenv from "dotenv";
import { sign } from "jsonwebtoken";

dotenv.config();

const jsonwebtokenKey = process.env.JSONWEBTOKEN_KEY || "";

export const argon2Hash = (password: string) => {
  return hash(password, { timeCost: 2, parallelism: 1, memoryCost: 19456 });
};

export const jsonwebtokenSign = (uuid: string, expiresIn = "1 week") => {
  return sign({ uuid }, jsonwebtokenKey, { expiresIn });
};
