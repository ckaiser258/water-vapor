import { Game } from ".prisma/client";

const createGame = async (parent, args, context, info) => {
  const game: Game = await context.prisma.game.create({
    data: {
      userId: args.userId,
      title: args.title,
      description: args.description,
    },
  });
  return game;
};

export default createGame;
