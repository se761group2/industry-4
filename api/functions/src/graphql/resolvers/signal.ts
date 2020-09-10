import { firebaseApp } from '../../firebase';
import { SignalResolvers, Signal } from '../../generated/graphql';
import { addIdToDoc } from './utils';

const firestore = firebaseApp.firestore();

export const signalResolvers: SignalResolvers = {
    values: async (parent, args) => {
        const valuesDocs = (await firestore.collection(`machines/${parent.machineId}/sensors/${parent.sensorId}/signals/${parent.id}/sampleChunks`).get())
        .docs.map(addIdToDoc);
        
      return valuesDocs;
    },
};