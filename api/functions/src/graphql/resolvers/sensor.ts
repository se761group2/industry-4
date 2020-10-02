import { firebaseApp } from '../../firebase';
import { SensorResolvers } from '../../generated/graphql';
import { MachineStore } from '../MachineStore';

const firestore = firebaseApp.firestore();

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
