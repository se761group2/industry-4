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
};
