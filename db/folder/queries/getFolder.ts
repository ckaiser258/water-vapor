import { Folder } from ".prisma/client";

const getFolder = async (parent, args, context) => {
  const folder: Folder = await context.prisma.folder.findUnique({
    where: { id: args.id },
    include: {
      games: true,
    },
  });
  return folder;
};

export default getFolder;
