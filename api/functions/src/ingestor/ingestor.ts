// This is the ingestor for the project.
// To run, navigate to the api\functions\src\ingestor directory in console,
// and enter 'ts-node ingestor.ts'.
// Authors: Alex Monk

import csvParser from 'csv-parser';
import fs from 'fs';
import { notifyUsers } from '../sendgrid/sendgrid';

csvParser();
// csvParser(['sensor value']); // this data label doesn't work for some reason

const currentDir = __dirname;
const fileNames: string[] = [];
let thresholdValue; //hardcoded rn
const rmsValues: number[] = [];

// TODO remove this limitation gracefully
const maxLinesToProcessPerFile = 30000;
// TODO remove this limitation gracefully (up to X files are processsed)
const maxFiles = 1000;

let notified = false;

findDataFileNamesInDir(currentDir + '\\..\\..\\inputData\\', fileNames);
processAllFiles();

async function processAllFiles() {
  for (let i = 0; i < fileNames.length; i++) {
    if (i < maxFiles) {
      await processInputDataFile(fileNames[i], i); // THIS SHOULD BE ASYNC
    } else {
      console.log(
        'The maximum number of ' +
          maxFiles +
          ' files have been read. All async RMS calcs started...'
      );
      break;
    }
  }
  // TODO remove this hardcoded check once heap overflow is fixed
  // processInputDataFile(fileNames[650], 650);

  console.log('All files read. RMS calculations started...');
}

function findDataFileNamesInDir(absoluteDir, fileNamesArray) {
  let i = 0;
  fs.readdirSync(absoluteDir).forEach((file) => {
    i += 1;
    fileNamesArray.push(absoluteDir + file);
  });
  console.log(i + ' files found');
}

async function processInputDataFile(fileName, processedFileCount) {
  const results: any[] = [];
  const rawDataFirstColumn: number[] = [];
  let singleValueFirstColumn = '';
  let firstRowItemAsNum = 0;
  let rmsValueFromFile = 0;

  const resultPromise = new Promise<void>((resolve, reject) => {
    fs.createReadStream(fileName)
      .pipe(csvParser({ separator: '\t', headers: false }))
      .on('data', (row) => results.push(row))
      .on('end', () => {
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
        thresholdDetection(rmsValueFromFile, processedFileCount);
        resolve();
      });
  });

  return resultPromise;
}
/* calculate rms value. see 4.1.2 of the full research doc (pg 9) for info on how this is calculated*/
function calculateRMS(values) {
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

function thresholdDetection(rmsValue, processedFileCount) {
  // first 200 values are used to determine the threshold, and as such
  // are not checked against a threshold
  if (processedFileCount == 199) {
    thresholdValue = calculateThreshold();
  } else if (processedFileCount > 199) {
    if (rmsValue >= thresholdValue) {
      console.log(
        'Record number ' +
          processedFileCount +
          ': Threshold of ' +
          thresholdValue +
          ' met, notification being sent.'
      );
      sendNotification(thresholdValue, rmsValue);
    } else {
      console.log(
        'Record number ' +
          processedFileCount +
          ': Threshold of ' +
          thresholdValue +
          ' NOT met.'
      );
    }
  } else {
    console.log(
      'Record number ' +
        processedFileCount +
        ' is being used to determine the threshold (first 200 records).'
    );
  }
}

function calculateThreshold() {
  // Expects 200 rms values
  // Threshold is the mean plus 6 times standard deviation
  let total = 0;
  for (let i = 0; i < rmsValues.length; i++) {
    total += rmsValues[i];
  }
  const rmsMean = total / rmsValues.length;

  total = 0;
  for (let i = 0; i < rmsValues.length; i++) {
    total += Math.pow(rmsValues[i] - rmsMean, 2);
  }
  const squaredDifferencesMean = total / rmsValues.length;

  const standardDeviation = Math.sqrt(squaredDifferencesMean);

  return rmsMean + 6 * standardDeviation;
}

function sendNotification(thresholdValue, rmsValue) {
  /* TODO add checker for notification frequency (or do it somewhere else) 
     Currently this is done using a notified flag which ensures the email is only sent once,
     (for demo purposes)
  */
  if (!notified) {
    // Hardcoded values for the sensor and machine ID were used, these will be changed
    // The values used for the IDs are not reflective of realistic IDs within the system.
    notifyUsers(thresholdValue, rmsValue, 'A1', 'B2');
    notified = true;
  }
}
