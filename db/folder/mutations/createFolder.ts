import { Folder } from ".prisma/client";

const createFolder = async (parent, args, context, info) => {
  const folder: Folder = await context.prisma.folder.create({
    data: {
      // Connect existing user
      user: {
        connect: { id: context.token?.sub },
      },
      name: args.name,
      //   Connect existing games
      games: {
        connect: args.games,
      },
    },
  });
  return folder;
};

export default createFolder;
