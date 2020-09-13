import { Resolvers } from '../generated/graphql';
import { queryResolvers } from './resolvers/query';
import { machineResolvers } from './resolvers/machine';
import { sensorResolvers } from './resolvers/sensor';
import { signalResolvers } from './resolvers/signal';
import { mutationResolvers } from './resolvers/mutation';

export const resolvers: Resolvers = {
  Query: queryResolvers,
  Machine: machineResolvers,
  Sensor: sensorResolvers,
  Signal: signalResolvers,
  Mutation: mutationResolvers,
};
