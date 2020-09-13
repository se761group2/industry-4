import { firebaseApp } from '../../firebase';
import { QueryResolvers } from '../../generated/graphql';
import { addIdToDoc } from './utils';
import { MachineStore } from '../MachineStore';

const firestore = firebaseApp.firestore();

export const queryResolvers: QueryResolvers = {
  user: async (parent, args) => {
    const user = await firestore.doc(`users/${args.id}`).get();

    const userData = addIdToDoc(user);

    if (!userData) {
      return undefined;
    }

    return {
      ...userData,
    };
  },

  machine: async (parent, args) => {
    const machine = await firestore.doc(`machines/${args.id}`).get();

    const machineData = addIdToDoc(machine);

    if (!machineData) {
      return undefined;
    }

    return {
      ...machineData,
    };
  },

  machines: async (parent, args) => {
    const machineDocs = MachineStore.getMachines();

    return machineDocs;
  },

  sensor: async (parent, args) => {
    const sensorData = MachineStore.getSensor(args.machineId, args.id);

    if (!sensorData) {
      return undefined;
    }

    return {
      ...sensorData,
      machineId: args.machineId,
    };
  },
};
