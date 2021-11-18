import { Game } from ".prisma/client";
import { GameFormInput } from "../../../components/games/GameForm";
import getSelectedIds from "../../../lib/getSelectedIds";

const createGame = async (parent, args: GameFormInput, context, info) => {
  const game: Game = await context.prisma.game.create({
    data: {
      user: { connect: { id: context.token?.sub } },
      title: args.title,
      description: args.description,
      folders: { connect: getSelectedIds(args.folders) },
    },
  });
  return game;
};

export default createGame;
