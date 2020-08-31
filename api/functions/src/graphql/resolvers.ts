import { Resolvers } from '../generated/graphql';
import { queryResolvers } from './resolvers/query';

export const resolvers: Resolvers = {
  Query: queryResolvers,
};
