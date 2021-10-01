import { Game } from ".prisma/client";

const updateGame = async (parent, args, context) => {
  const updatedGame: Game = await context.prisma.game.update({
    where: { id: args.id },
    data: { title: args.title, description: args.description },
  });
  return updatedGame;
};

export default updateGame;
