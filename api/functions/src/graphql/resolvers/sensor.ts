import { SensorResolvers } from '../../generated/graphql';
import { MachineStore } from '../MachineStore';

export const sensorResolvers: SensorResolvers = {
  // Retrieves sample chunks when sensors are queried
  sampleChunks: async (parent, args) => {
    const sampleDocs = MachineStore.getSampleChunks(
      parent.machineId,
      parent.id
    );
    return sampleDocs;
  },
};
