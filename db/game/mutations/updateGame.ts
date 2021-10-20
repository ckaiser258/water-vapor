import { Game } from ".prisma/client";
import { AppContext } from "../../../types";
import checkOwnership from "../../auth/checkOwnership";

const updateGame = async (parent, args, context: AppContext) => {
  const game = await context.prisma.game.findFirst({
    // Passing userId in 'where' forces authorization because game will be undefined if the userId doesn't match the token sub
    where: { id: args.id, userId: context.token?.sub },
  });

  checkOwnership(context, game);

  const updatedGame: Game = await context.prisma.game.update({
    where: { id: args.id },
    data: { title: args.title, description: args.description },
  });
  return updatedGame;
};

export default updateGame;
