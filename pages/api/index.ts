import { ApolloServer } from "apollo-server-micro";
import { NextApiHandler } from "next";
import cors from "micro-cors";

const typeDefs = `
type Query {
    info: String!
}
`;

const resolvers = {
  Query: {
    info: () => null,
  },
};

export const config = {
  api: {
    bodyParser: false,
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

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
