import { Game } from ".prisma/client";

const createGame = async (parent, args, context, info) => {
  const game: Game = await context.prisma.game.create({
    data: {
      user: { connect: { id: context.token?.sub } },
      title: args.title,
      description: args.description,
      folders: { connect: args.folders },
    },
  });
  return game;
};

export default createGame;
