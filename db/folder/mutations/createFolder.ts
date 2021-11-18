import { Folder } from ".prisma/client";
import type { FolderFormInput } from "../../../components/folders/FolderForm";
import getSelectedIds from "../../../lib/getSelectedIds";

const createFolder = async (parent, args: FolderFormInput, context, info) => {
  const folder: Folder = await context.prisma.folder.create({
    data: {
      // Connect existing user
      user: {
        connect: { id: context.token?.sub },
      },
      name: args.name,
      //   Connect existing games
      games: {
        connect: getSelectedIds(args.games),
      },
    },
  });
  return folder;
};

export default createFolder;
