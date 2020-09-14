import { firestore } from 'firebase-functions';
import { firebaseApp } from './../firebase';

// the number of samples per chunk (1 sample = 1 RMS value representing a input data file)
const maxChunkSize = 144;

const firestore = firebaseApp.firestore();
interface sampleChunk {
  samples: { timestamp: FirebaseFirestore.Timestamp; value: number }[];
}


export async function storeSingleRMSValue(
  rmsValue: number,
  timestamp: string,
  machineId: string,
  sensorId: string
) {
  const chunks = await firestore
    .collection(`machines/${machineId}/sensors/${sensorId}/sampleChunks`)
    .listDocuments();
  const lastChunk = chunks[chunks.length - 1];
  const retrievedChunk = await lastChunk.get();
  const chunkData = retrievedChunk.data() as sampleChunk;
  const lastChunkId = retrievedChunk.id;

  const samplesArrayLength = chunkData.samples.length;

  if (samplesArrayLength >= maxChunkSize) {
    FromDateTime(DateTime dateTime)

    firestore
      .collection(`machines/${machineId}/sensors/${sensorId}/sampleChunks`)
      .doc((Number(lastChunkId) + 1).toString())
      .set({
      samples:  [{timestamp: FromDateTime(DateTime dateTime), value: rmsValue}],
  machineId: string,
  sensorId: string
      })
      .then(function () {
        console.log('Document successfully written!');
      })
      .catch(function (error) {
        console.error('Error writing document: ', error);
      });
  }
}
