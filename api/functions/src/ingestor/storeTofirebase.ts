import admin from 'firebase-admin';
import Timestamp = admin.firestore.Timestamp;
import { samplesPerChunk } from './ingestor';

export const firebaseApp = admin.initializeApp({
  credential: admin.credential.applicationDefault(),
  databaseURL: 'https://industry4-uoa.firebaseio.com',
});

const firestore = firebaseApp.firestore();

interface SampleChunk {
  chunkNumber: number;
  samples: { timestamp: FirebaseFirestore.Timestamp; value: number }[];
}

export async function storeSingleRMSValue(
  rmsValue: number,
  timestampStr: string,
  machineId: string,
  sensorId: string
) {
  const chunkQuerySnap = await firestore
    .collection(`machines/${machineId}/sensors/${sensorId}/sampleChunks`)
    .orderBy('chunkNumber')
    .limitToLast(1)
    .get();

  let lastChunk: SampleChunk | null = null;
  let lastChunkId: string;
  if (chunkQuerySnap.size != 0) {
    const chunkDoc = chunkQuerySnap.docs[0];
    lastChunk = chunkDoc.data() as SampleChunk;
    lastChunkId = chunkDoc.id;
  }

  const timestamp = timestampFromFilename(timestampStr);

  // If there's no last chunk, we need to create the first one
  // likewise if the last chunk is full, we need to add another
  if (lastChunk == null || lastChunk.samples.length > samplesPerChunk) {
    const chunk: SampleChunk = {
      chunkNumber: 0,
      samples: [
        {
          timestamp,
          value: rmsValue,
        },
      ],
    };

    if (lastChunk != null) {
      chunk.chunkNumber = lastChunk!.chunkNumber + 1;
    }

    await firestore
      .collection(`machines/${machineId}/sensors/${sensorId}/sampleChunks`)
      .add(chunk)
      .then(() => {
        console.log('Document successfully written!');
      })
      .catch((error) => {
        console.error('Error writing document: ', error);
      });

    // otherwise, we can add a value onto the last chunk and push it
  } else {
    lastChunk.samples.push({
      timestamp,
      value: rmsValue,
    });

    await firestore
      .collection(`machines/${machineId}/sensors/${sensorId}/sampleChunks`)
      .doc(lastChunkId!)
      .set(lastChunk)
      .then(() => {
        console.log('Document successfully written!');
      })
      .catch((error) => {
        console.error('Error writing document: ', error);
      });
  }
}

function timestampFromFilename(timestampStr: string): Timestamp {
  const splitDateString: string[] = timestampStr.split('.');

  const date: Date = new Date();
  date.setFullYear(Number(splitDateString[0]));
  date.setMonth(Number(splitDateString[1]));
  date.setDate(Number(splitDateString[2]));
  date.setHours(Number(splitDateString[3]));
  date.setMinutes(Number(splitDateString[4]));
  date.setSeconds(39);

  return Timestamp.fromDate(date);
}
