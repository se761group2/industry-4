// This is the ingestor for the project.
// To run, navigate to the api\functions\src\ingestor directory in console,
// and enter 'ts-node ingestor.ts'.
// Authors: Alex Monk, Marc

import csvParser from 'csv-parser';
import { storeSingleRMSValue } from './storeTofirebase';
import { doThresholdDetection } from './thresholdDetection';
import streamifier from 'streamifier';

export default async function processDataFromBuffer(
  timestampStr: string,
  machineId: string,
  sensorId: string,
  buffer: Buffer
) {
  const rawDataFirstColumn = await readDataFromBuffer(buffer);

  const rmsValueFromFile = calculateRMS(rawDataFirstColumn);
  await doThresholdDetection(rmsValueFromFile, machineId, sensorId);

  await storeSingleRMSValue(
    rmsValueFromFile,
    timestampStr,
    machineId,
    sensorId
  );
}

async function readDataFromBuffer(buffer: Buffer) {
  const results: any[] = [];
  const rawDataFirstColumn: number[] = [];

  let singleValueFirstColumn = '';
  let firstRowItemAsNum = 0;

  const resultPromise = new Promise<number[]>((resolve) => {
    streamifier
      .createReadStream(buffer)
      .pipe(csvParser({ separator: '\t', headers: false }))
      .on('data', (row) => results.push(row))
      .on('end', async () => {
        for (let i = 0; i < results.length; i++) {
          singleValueFirstColumn = results[i]['0'] as string;
          firstRowItemAsNum = Number(singleValueFirstColumn);
          rawDataFirstColumn.push(firstRowItemAsNum);
        }

        resolve(rawDataFirstColumn);
      });
  });
  return resultPromise;
}

/* calculate rms value. see 4.1.2 of the full research doc (pg 9) for info on how this is calculated*/
function calculateRMS(values: number[]): number {
  let currentTotal = 0;

  // square
  for (let i = 0; i < values.length; i++) {
    currentTotal = currentTotal + Math.pow(values[i], 2);
  }

  // mean
  currentTotal = currentTotal / values.length;

  // root
  currentTotal = Math.sqrt(currentTotal);

  return currentTotal;
}
