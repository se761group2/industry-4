import { firebaseApp } from '../../firebase';
import { MachineResolvers } from '../../generated/graphql';
import { MachineStore } from '../MachineStore';

const firestore = firebaseApp.firestore();

export const machineResolvers: MachineResolvers = {
    sensors: async (parent, args) => {
        const sensorDocs = MachineStore.getSensors(parent.id);
            
        return sensorDocs;
    },
};