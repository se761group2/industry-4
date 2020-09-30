import { firebaseApp } from '../firebase';
import admin from 'firebase-admin';
import Timestamp = admin.firestore.Timestamp;

const firestore = firebaseApp.firestore();

interface SampleChunk {
  chunkNumber: number;
  samples: { timestamp: FirebaseFirestore.Timestamp; value: number }[];
}

const SAMPLES_PER_CHUNK = 1008; // (7 * 24 * 6) 10-minute periods in a week (usually)

export async function storeSingleRMSValue(
  rmsValue: number,
  timestampStr: string,
  machineId: string,
  sensorId: string
): Promise<Error | undefined> {
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
  if (timestamp === null) {
    const e = Error('Timestamp string is not a valid timestamp');
    e.name = 'Timestamp_Invalid';
    return e;
  }

  // If there's no last chunk, we need to create the first one
  // likewise if the last chunk is full, we need to add another
  if (lastChunk === null || lastChunk.samples.length > SAMPLES_PER_CHUNK) {
    const chunk: SampleChunk = {
      chunkNumber: 0,
      samples: [
        {
          timestamp,
          value: rmsValue,
        },
      ],
    };

    if (lastChunk !== null) {
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

    try {
      await firestore
        .collection(`machines/${machineId}/sensors/${sensorId}/sampleChunks`)
        .doc(lastChunkId!)
        .set(lastChunk);
    } catch (error) {
      return error;
    }
  }
  return;
}

export async function updateSensorNotificationStatus(machineId, sensorId) {
  await firestore
    .collection(`machines/${machineId}/sensors`)
    .doc(sensorId)
    .update({
      notificationStatus: 'Unacknowledged',
    });
}

function timestampFromFilename(timestampStr: string): Timestamp | null {
  const date: Date = new Date(timestampStr);

  if (isNaN(date.getTime())) {
    // date is not valid
    return null;
  } else {
    // date is valid
    return Timestamp.fromDate(date);
  }
}
