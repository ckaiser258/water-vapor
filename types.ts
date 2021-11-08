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
  updatedAt: Date;
  title: string;
  description: string;
  folders: Folder[];
  user?: User;
  userId?: number;
}

export interface Folder {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  name: string;
  games: Game[];
  user: User;
  userId: string;
}

export interface AppContext {
  prisma: PrismaClient;
  token: JWT | null;
}
