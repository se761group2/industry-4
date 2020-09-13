import { firebaseApp } from '../../firebase';
import { SignalResolvers, Signal } from '../../generated/graphql';
import { MachineStore } from '../MachineStore';

const firestore = firebaseApp.firestore();

export const signalResolvers: SignalResolvers = {
  values: async (parent, args) => {
    const valuesDocs = MachineStore.getSampleChunks(
      parent.machineId,
      parent.sensorId,
      parent.id
    );

    return valuesDocs;
  },
};
