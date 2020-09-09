import { firebaseApp } from '../../firebase';
import { SensorResolvers } from '../../generated/graphql';
import { addIdToDoc } from './utils';

const firestore = firebaseApp.firestore();

export const sensorResolvers: SensorResolvers = {
    signals: async (parent, args) => {
        const signalDocs =  (
            await firestore.collection(`sensors/${parent.id}/signals`).get())
            .docs.map(addIdToDoc);
            
          return signalDocs;
    },
};