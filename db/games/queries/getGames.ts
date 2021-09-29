import { PrismaClient } from "@prisma/client";
import { Game } from "../../../types";

const prisma = new PrismaClient();

const getGames = async (): Promise<Game[]> => {
  const allGames = await prisma.game.findMany();
  return allGames;
};

export default getGames;
