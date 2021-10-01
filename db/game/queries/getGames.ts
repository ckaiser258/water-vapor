import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const getGames = async () => {
  const allGames = await prisma.game.findMany();
  return allGames;
};

export default getGames;
