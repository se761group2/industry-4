import { firebaseApp } from '../../firebase';
import { SensorResolvers } from '../../generated/graphql';
import { MachineStore } from '../MachineStore';

const firestore = firebaseApp.firestore();

export const sensorResolvers: SensorResolvers = {
    signals: async (parent, args) => {
        const signalDocs =  MachineStore.getSignals(parent.machineId, parent.id);
        return signalDocs;
    },
};