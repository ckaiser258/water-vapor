import { Game } from ".prisma/client";

const getGames = async (parent, args, context) => {
  const allGames: Game[] = await context.prisma.game.findMany();
  return allGames;
};

export default getGames;
