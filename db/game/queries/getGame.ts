import { Game } from ".prisma/client";

const getGame = async (parent, args, context) => {
  const game: Game = await context.prisma.game.findUnique({
    where: { id: args.id },
  });
  return game;
};

export default getGame;
