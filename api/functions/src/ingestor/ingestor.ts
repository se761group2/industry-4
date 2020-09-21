// This is the ingestor for the project.
// To run, navigate to the api\functions\src\ingestor directory in console,
// and enter 'ts-node ingestor.ts'.
// Authors: Alex Monk

import csvParser from 'csv-parser';
import fs from 'fs';
import { storeSingleRMSValue } from './storeTofirebase';
import { thresholdDetection } from './thresholdDetection';

const currentDir = __dirname;

// TODO remove this limitation gracefully
const maxLinesToProcessPerFile = 30000;
// TODO remove this limitation gracefully (up to X files are processsed)
const maxFiles = 1000;
export const samplesPerChunk = 1008; // (7 * 24 * 6) 10-minute periods in a week (usually)

// TODO remove hardcode machineId and sensorId
const machineId = 'AD1AECvCTuMi29JF0WTC';
const sensorId = 'cUq2QVLOQCqKil6eq0El';

const fileNames = findDataFileNamesInDir(currentDir + '\\..\\..\\inputData\\');
processAllFiles(fileNames);

function findDataFileNamesInDir(absoluteDir: string): string[] {
  const fileNamesArray: string[] = [];

  let i = 0;
  fs.readdirSync(absoluteDir).forEach((file) => {
    i += 1;
    fileNamesArray.push(absoluteDir + file);
  });
  console.log(i + ' files found');

  return fileNamesArray;
}

async function processAllFiles(fileNames: string[]) {
  for (let i = 0; i < fileNames.length; i++) {
    if (i < maxFiles) {
      await processInputDataFile(fileNames[i], i);
    } else {
      console.log(
        'The maximum number of ' +
          maxFiles +
          ' files have been read. All async RMS calcs started...'
      );
      break;
    }
  }

  console.log('All files read. RMS calculations started...');
}

async function processInputDataFile(
  fileName: string,
  processedFileCount: number
) {
  const results: any[] = [];
  const rawDataFirstColumn: number[] = [];
  const rmsValues: number[] = [];

  let singleValueFirstColumn = '';
  let firstRowItemAsNum = 0;
  let rmsValueFromFile = 0;

  const resultPromise = new Promise<void>((resolve, reject) => {
    fs.createReadStream(fileName)
      .pipe(csvParser({ separator: '\t', headers: false }))
      .on('data', (row) => results.push(row))
      .on('end', async () => {
        for (let i = 0; i < results.length; i++) {
          if (i < maxLinesToProcessPerFile) {
            // first 1000 values used to speed things up  TODO remove this limitation
            singleValueFirstColumn = <string>results[i]['0'];
            // let firstRowItem = singleRow.split('\t')[0];
            firstRowItemAsNum = +singleValueFirstColumn;
            rawDataFirstColumn.push(firstRowItemAsNum);
          } else {
            break;
          }
        }
        rmsValueFromFile = calculateRMS(rawDataFirstColumn);
        rmsValues.push(rmsValueFromFile);
        console.log('RMS value for this file: ' + rmsValueFromFile);
        thresholdDetection(rmsValueFromFile, rmsValues, processedFileCount);
        await storeSingleRMSValue(
          rmsValueFromFile,
          fileName.substr(fileName.lastIndexOf('/') + 1, fileName.length - 1),
          machineId,
          sensorId
        );

        resolve();
      });

    storeSingleRMSValue(rmsValueFromFile, fileName, machineId, sensorId);
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
