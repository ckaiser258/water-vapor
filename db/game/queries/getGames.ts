import { Game } from ".prisma/client";

const getGames = async (parent, args, context) => {
  console.log(context.token);
  const allGames: Game[] = await context.prisma.game.findMany();
  return allGames;
};

export default getGames;
