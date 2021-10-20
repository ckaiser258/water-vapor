import { PrismaClient } from ".prisma/client";
import { JWT } from "next-auth/jwt";

export interface User {
  id: number;
  name: string;
  email: string;
  emailVerified: Date;
  image: String;
  games: Game[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Game {
  id: string;
  createdAt: Date;
  title: string;
  description: string;
  user?: User;
  userId?: number;
}

export interface AppContext {
  prisma: PrismaClient;
  token: JWT | null;
}
