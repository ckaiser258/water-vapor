import { ApolloServer } from "apollo-server-micro";
import { NextApiHandler } from "next";
import cors from "micro-cors";
import fs from "fs";
import path from "path";
import { v4 as uuidv4 } from "uuid";
import { PrismaClient } from "@prisma/client";

type Game = {
  id: string;
  title: string;
  description: string;
};

const prisma = new PrismaClient();

const resolvers = {
  Query: {
    info: () => "This is the API of Water Vapor",
    feed: async (parent, args, context) => context.prisma.game.findMany(),
    game: (parent, args, context) =>
      context.prisma.game.findUnique({ where: { id: args.id } }),
  },
  Mutation: {
    postGame: async (parent, args, context, info) => {
      const game: Game = await context.prisma.game.create({
        data: {
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
