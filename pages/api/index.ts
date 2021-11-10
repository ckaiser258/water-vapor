import { ApolloServer } from "apollo-server-micro";
import { NextApiHandler } from "next";
import { PrismaClient } from "@prisma/client";
import { getToken } from "next-auth/jwt";
import cors from "micro-cors";
import fs from "fs";
import path from "path";
import createGame from "../../db/game/mutations/createGame";
import updateGame from "../../db/game/mutations/updateGame";
import deleteGame from "../../db/game/mutations/deleteGame";
import getGames from "../../db/game/queries/getGames";
import getGame from "../../db/game/queries/getGame";
import getGamesByUser from "../../db/game/queries/getGamesByUser";
import getFolder from "../../db/folder/queries/getFolder";
import getFolders from "../../db/folder/queries/getFolders";
import createFolder from "../../db/folder/mutations/createFolder";
import { AppContext } from "../../types";

const prisma = new PrismaClient();

const resolvers = {
  Query: {
    info: () => "This is the API of Water Vapor",
    feed: getGames,
    getGame,
    getGamesByUser,
    getFolders,
    getFolder,
  },
  Mutation: {
    createGame,
    updateGame,
    deleteGame,
    createFolder,
  },
  Game: {
    user: (parent, args, context: AppContext) => {
      // Prevent an error from being thrown if the game isn't associated with a user
      if (!parent.userId) return;
      // Else return the user associated with the game
      const user = context.prisma.game
        .findUnique({
          where: { id: parent.id },
        })
        .user();
      return user;
    },
    folders: async (parent, args, context: AppContext) => {
      const game = await context.prisma.game.findUnique({
        where: { id: parent.id },
        include: { folders: true },
      });
      return game.folders;
    },
  },
  Folder: {
    games: async (parent, args, context: AppContext) => {
      const folder = await context.prisma.folder.findUnique({
        where: { id: parent.id },
        include: { games: true, user: true },
      });
      return folder.games;
    },
  },
};

export const config = {
  api: {
    bodyParser: false,
  },
};

const server = new ApolloServer({
  typeDefs: fs.readFileSync(
    path.join(path.resolve(process.cwd()), "schema.graphql"),
    "utf8"
  ),
  resolvers,
  context: async (session) => {
    return {
      prisma,
      token: await getToken({
        req: session.req,
        secret: process.env.JWT_SECRET,
      }),
    };
  },
});

let apolloServerHandler: NextApiHandler;

async function getApolloServerHandler() {
  if (!apolloServerHandler) {
    await server.start();

    apolloServerHandler = server.createHandler({
      path: "/api",
    });
  }

  return apolloServerHandler;
}

const handler: NextApiHandler = async (req, res) => {
  const apolloServerHandler = await getApolloServerHandler();
  if (req.method === "OPTIONS") {
    res.end();
    return;
  }

  return apolloServerHandler(req, res);
};

export default cors()(handler);
