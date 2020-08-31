import { AuthenticationError, UserInputError } from 'apollo-server-express';
import { UserRecord } from 'firebase-functions/lib/providers/auth';
import { firebaseApp } from '../../firebase';

const usersCollection = firebaseApp.firestore().collection('users');

export type FirebaseDocumentSnapshot =
  | FirebaseFirestore.DocumentSnapshot<FirebaseFirestore.DocumentData>
  | FirebaseFirestore.QueryDocumentSnapshot<FirebaseFirestore.DocumentData>;

export const addIdToDoc = (firestoreDoc: FirebaseDocumentSnapshot): any => {
  const data = firestoreDoc.data();
  if (!data || !firestoreDoc.exists) {
    return null;
  }
  data.id = firestoreDoc.id;
  return { onboardingComplete: false, ...data };
};

export async function verifyUser(userRecord: UserRecord) {
  if (!userRecord?.email) {
    throw new AuthenticationError('Unauthorised');
  }

  const userRef = usersCollection.doc(userRecord.uid);

  const userDoc = await userRef.get();

  if (!userDoc.exists) {
    throw new UserInputError(`No user document for ${userRecord.uid}`);
  }

  return { userRef, userDoc };
}
