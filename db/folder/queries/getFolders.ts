import { Folder } from ".prisma/client";

const getFolders = async (parent, args, context) => {
  const folders: Folder[] = await context.prisma.folder.findMany({
    where: {
      userId: args.userId,
    },
    include: {
      games: true,
    },
  });
  return folders;
};

export default getFolders;
