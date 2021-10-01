import { Game } from ".prisma/client";

const getGamesByUser = async (parent, args, context, info) => {
  const userGames: Game[] = await context.prisma.game.findMany({
    where: { userId: args.userId },
  });
  return userGames;
};

export default getGamesByUser;
