import { ApolloServer, gql } from 'apollo-server-express';
import cors from 'cors';
import express from 'express';
import fs from 'fs';
import path from 'path';
const schema = fs.readFileSync(
  path.resolve(__dirname, './schema.graphql'),
  'utf8'
);

export function ConstructGraphQLServer() {
  const app = express();
  app.use(cors());
  app.options('*');

  const apolloServer = new ApolloServer({
    // typeDefs: schema as any,
    // resolvers,
    context: (ctx) => {
      // Debug the request context here if needed.
      return ctx;
    },
    formatError: (err) => {
      // don't expose implementation details to the client
      if (err.message.startsWith('FirebaseError: ')) {
        console.error(err);
        return new Error('Internal Server Error');
      }

      return err;
    },
  });

  apolloServer.applyMiddleware({ app, path: '/', cors: true });

  return app;
}
