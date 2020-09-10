import { firebaseApp } from '../../firebase';
import { MutationResolvers } from '../../generated/graphql';
import { addIdToDoc } from './utils';

const firestore = firebaseApp.firestore();

export const mutationResolvers: MutationResolvers = {
    updateMachine: async (args) => {
        return null;
    },

    updateSensor: async (args) => {
        return null;
    },

    createMachine: async (args) => {
        return null;
    },

    createSensor: async (args) => {
        return null;
    },
};