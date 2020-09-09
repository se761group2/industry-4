import { firebaseApp } from '../../firebase';
import { MachineResolvers } from '../../generated/graphql';
import { addIdToDoc } from './utils';

const firestore = firebaseApp.firestore();

export const machineResolvers: MachineResolvers = {
    sensors: async (parent, args) => {
        const sensorDocs =  (
            await firestore.collection(`machines/${parent.id}/sensors`).get())
            .docs.map(addIdToDoc);
            
          return sensorDocs;
    },
};