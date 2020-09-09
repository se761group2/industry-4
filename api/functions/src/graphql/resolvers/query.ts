import { firebaseApp } from '../../firebase';
import { QueryResolvers } from '../../generated/graphql';
import { addIdToDoc } from './utils';

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

    if(!machineData) {
      return undefined;
    }
    
    return {
      ...machineData,
    }
  },

  machines: async (parent, args) => {
    const machineDocs =  (
      await firestore.collection(`machines`).get())
      .docs.map(addIdToDoc);
      
    return machineDocs;
  },

  sensor: async (parent, args) => {
    const sensor = await firestore.doc(`sensors/${args.id}`).get();

    const sensorData = addIdToDoc(sensor);

    if(!sensorData) {
      return undefined;
    }

    return {
      ...sensorData,
    }
  },
};
