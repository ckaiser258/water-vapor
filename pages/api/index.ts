import { ApolloServer } from "apollo-server-micro";
import { NextApiHandler } from "next";
import cors from "micro-cors";
import fs from "fs";
import path from "path";
import { v4 as uuidv4 } from "uuid";
import { PrismaClient } from "@prisma/client";
import { Game } from "../../types";

const prisma = new PrismaClient();

// TODO: Extract all of these into separate files
const resolvers = {
  Query: {
    info: () => "This is the API of Water Vapor",
    feed: async (parent, args, context) => context.prisma.game.findMany(),
    game: (parent, args, context) =>
      context.prisma.game.findUnique({ where: { id: args.id } }),
  },
  Game: {
    user: (parent, args, context) => {
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
  },
  Mutation: {
    postGame: async (parent, args, context, info) => {
      const game: Game = await context.prisma.game.create({
        data: {
          userId: args.userId,
          title: args.title,
          description: args.description,
        } as Game,
      });
      return game;
    },
    updateGame: async (parent, args, context) => {
      const updatedGame: Game = await context.prisma.game.update({
        where: { id: args.id },
        data: { title: args.title, description: args.description },
      });
      return updatedGame;
    },
    deleteGame: (parent, args, context) => {
      const deletedGame: Game = context.prisma.game.delete({
        where: { id: args.id },
      });
      return deletedGame;
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
