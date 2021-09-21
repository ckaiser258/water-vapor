import { PrismaClient } from "@prisma/client";
import { NextApiHandler } from "next";

const prisma = new PrismaClient();

const getGames: NextApiHandler = async (req, res) => {
  const allGames = await prisma.game.findMany();
  res.json(allGames);
};

export default getGames;
