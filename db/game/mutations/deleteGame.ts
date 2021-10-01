import { Game } from ".prisma/client";

const deleteGame = (parent, args, context) => {
  const deletedGame: Game = context.prisma.game.delete({
    where: { id: args.id },
  });
  return deletedGame;
};

export default deleteGame;
