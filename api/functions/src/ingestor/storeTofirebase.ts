import admin from 'firebase-admin';

export const firebaseApp = admin.initializeApp({
  credential: admin.credential.applicationDefault(),
  databaseURL: 'https://industry4-uoa.firebaseio.com',
});

export const Timestamp = admin.firestore.Timestamp;

// var config = {
//   authDomain: "",
//   databaseURL: "",
//   projectId: "",
//   storageBucket: "firestore-demos.appspot.com"
// }

const fireStoreInstantiation = firebaseApp.firestore();

interface SampleChunk {
  samples: { timestamp: FirebaseFirestore.Timestamp; value: number }[];
}

export async function storeSingleRMSValue(
  rmsValue: number,
  timestampStr: string,
  machineId: string,
  sensorId: string
) {
  const chunks = await fireStoreInstantiation
    .collection(`machines/${machineId}/sensors/${sensorId}/sampleChunks`)
    .listDocuments();
  const lastChunk = chunks[chunks.length - 1];
  const retrievedChunk = await lastChunk.get();
  const lastChunkId = retrievedChunk.id;

  const chunk = retrievedChunk.data() as SampleChunk;

  // Add data to a new chunk (page)
  const splitDateString: string[] = timestampStr.split('.');

  const date: Date = new Date();
  date.setFullYear(Number(splitDateString[0]));
  date.setMonth(Number(splitDateString[1]));
  date.setDate(Number(splitDateString[2]));
  date.setHours(Number(splitDateString[3]));
  date.setMinutes(Number(splitDateString[4]));
  date.setSeconds(39);

  const timestamp = Timestamp.fromDate(date);
  console.log('firebase timestamp successfully created');

  chunk.samples.push({
    timestamp,
    value: rmsValue,
  });

  await fireStoreInstantiation
    .collection(`machines/${machineId}/sensors/${sensorId}/sampleChunks`)
    .doc(lastChunkId)
    .set(chunk)
    .then(function () {
      console.log('Document successfully written!');
    })
    .catch(function (error) {
      console.error('Error writing document: ', error);
    });
}
