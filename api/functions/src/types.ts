import { ExpressContext } from 'apollo-server-express/dist/ApolloServer';
import express from 'express';
import { UserRecord } from 'firebase-functions/lib/providers/auth';

export interface GraphQLContext extends ExpressContext {
  req: express.Request & { user: UserRecord };
}
