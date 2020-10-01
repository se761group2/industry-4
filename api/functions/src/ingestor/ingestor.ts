// This is the ingestor for the project.
// To run, navigate to the api\functions\src\ingestor directory in console,
// and enter 'ts-node ingestor.ts'.
// Authors: Alex Monk, Marc

import csvParser from 'csv-parser';
import fs from 'fs';
import os from 'os';
import { storeSingleRMSValue } from './storeTofirebase';
import { doThresholdDetection } from './thresholdDetection';

const MAX_LINES_TO_PROCESS_PER_FILE = 30000; // TODO remove this limitation gracefully
const MAX_FILES = 1000; // TODO remove this limitation gracefully (up to X files are processsed)
const DELAY_IN_MILLISECONDS = 1000;
const machineId = 'AD1AECvCTuMi29JF0WTC'; // TODO remove hardcode machineId and sensorId
const sensorId = 'cUq2QVLOQCqKil6eq0El';

const currentDir = __dirname;
let directory = '';
const isWindows = os.platform() === 'win32';
if (isWindows) {
  directory = currentDir + '\\..\\..\\..\\inputData\\';
} else {
  directory = currentDir + '/../../../inputData/';
}

const filePaths = findDataFileNamesInDir(directory);
processAllFiles(filePaths);

// script run-through ends here

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

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function processAllFiles(filePaths: string[]) {
  for (let i = 0; i < filePaths.length; i++) {
    // delay for getting "real-time" data
    await delay(DELAY_IN_MILLISECONDS);

    if (i < MAX_FILES) {
      await processInputDataFile(filePaths[i]);
    } else {
      console.log(
        'The maximum number of ' +
          MAX_FILES +
          ' files have been read. All async RMS calcs started...'
      );
      break;
    }
  }

  console.log('All files read. RMS calculations started...');
}

async function processInputDataFile(filePath: string) {
  let fileName = '';

  if (isWindows) {
    fileName = filePath.substr(
      filePath.lastIndexOf('\\') + 1,
      filePath.length - 1
    );
  } else {
    fileName = filePath.substr(
      filePath.lastIndexOf('/') + 1,
      filePath.length - 1
    );
  }

  const rawDataFirstColumn = await readInputDataFile(filePath);
  const rmsValueFromFile = calculateRMS(rawDataFirstColumn);
  console.log('RMS value for ' + fileName + ': ' + rmsValueFromFile);
  doThresholdDetection(rmsValueFromFile, machineId, sensorId);

  await storeSingleRMSValue(rmsValueFromFile, fileName, machineId, sensorId);
}

async function readInputDataFile(filePath: string): Promise<number[]> {
  const results: any[] = [];
  const rawDataFirstColumn: number[] = [];

  let singleValueFirstColumn = '';
  let firstRowItemAsNum = 0;

  const resultPromise = new Promise<number[]>((resolve) => {
    fs.createReadStream(filePath)
      .pipe(csvParser({ separator: '\t', headers: false }))
      .on('data', (row) => results.push(row))
      .on('end', async () => {
        for (let i = 0; i < results.length; i++) {
          if (i < MAX_LINES_TO_PROCESS_PER_FILE) {
            // first 1000 values used to speed things up  TODO remove this limitation
            singleValueFirstColumn = results[i]['0'] as string;
            // let firstRowItem = singleRow.split('\t')[0];
            firstRowItemAsNum = Number(singleValueFirstColumn);
            rawDataFirstColumn.push(firstRowItemAsNum);
          } else {
            break;
          }
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
