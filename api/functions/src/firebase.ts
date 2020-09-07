import admin from 'firebase-admin';

export const firebaseApp = admin.initializeApp({
  credential: admin.credential.applicationDefault(),
  databaseURL: 'https://industry4-uoa.firebaseio.com',
});

export const FieldValue = admin.firestore.FieldValue;
export const Timestamp = admin.firestore.Timestamp;
