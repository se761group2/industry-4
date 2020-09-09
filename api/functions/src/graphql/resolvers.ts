import { Resolvers } from '../generated/graphql';
import { queryResolvers } from './resolvers/query';
import { machineResolvers } from './resolvers/machine';
import { sensorResolvers } from './resolvers/sensor';

export const resolvers: Resolvers = {
  Query: queryResolvers,
  Machine: machineResolvers,
  Sensor: sensorResolvers,
};
