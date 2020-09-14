import { firebaseApp } from '../../firebase';
import { MachineResolvers } from '../../generated/graphql';
import { MachineStore } from '../MachineStore';

const firestore = firebaseApp.firestore();

export const machineResolvers: MachineResolvers = {
  // Retrieves sensors when a machine is queried
  sensors: async (parent, args) => {
    const sensorDocs = MachineStore.getSensors(parent.id);

    return sensorDocs;
  },
};
