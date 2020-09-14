import { firestore } from 'firebase-functions';
import { firebaseApp, Timestamp } from './../firebase';

const fireStoreInstantiation = firebaseApp.firestore();
interface sampleChunk {
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

  // Add data to a new chunk (page)
  const splitDateString: string[] = timestampStr.split('.');
  const date: Date = new Date();
  date.setFullYear(Number(splitDateString[0]));
  date.setMonth(Number(splitDateString[1]));
  date.setDate(Number(splitDateString[2]));
  date.setHours(Number(splitDateString[3]));
  date.setMinutes(Number(splitDateString[4]));

  const timestamp = Timestamp.fromDate(date);

  fireStoreInstantiation
    .collection(`machines/${machineId}/sensors/${sensorId}/sampleChunks`)
    .doc(timestampStr)
    .set({
      samples: [{ timestamp: timestamp, value: rmsValue }],
      machineId: machineId,
      sensorId: sensorId,
    })
    .then(function () {
      console.log('Document successfully written!');
    })
    .catch(function (error) {
      console.error('Error writing document: ', error);
    });
}
