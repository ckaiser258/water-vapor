import { ApolloServer } from "apollo-server-micro";
import { NextApiHandler } from "next";
import { PrismaClient } from "@prisma/client";
import cors from "micro-cors";
import fs from "fs";
import path from "path";
import { User } from "../../types";
import createGame from "../../db/game/mutations/createGame";
import updateGame from "../../db/game/mutations/updateGame";
import deleteGame from "../../db/game/mutations/deleteGame";
import getGames from "../../db/game/queries/getGames";
import getGame from "../../db/game/queries/getGame";
import getGamesByUser from "../../db/game/queries/getGamesByUser";

const prisma = new PrismaClient();

const resolvers = {
  Query: {
    info: () => "This is the API of Water Vapor",
    feed: getGames,
    getGame,
    getGamesByUser,
  },
  Mutation: {
    createGame,
    updateGame,
    deleteGame,
  },
  Game: {
    user: (parent, args, context) => {
      // Prevent an error from being thrown if the game isn't associated with a user
      if (!parent.userId) return;
      // Else return the user associated with the game
      const user: User = context.prisma.game
        .findUnique({
          where: { id: parent.id },
        })
        .user();
      return user;
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
  context: {
    prisma,
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
