/* read data from file, use fileReader */
// import *as csv from 'csv-parser';

import csvParser from 'csv-parser';
import fs from 'fs';
import { raw } from 'express';

csvParser();
// csvParser(['sensor value']); // this data label doesn't work for some reason

processInputDataFile('2004.02.12.10.32.39');
processInputDataFile('2004.02.16.09.02.39');

function processInputDataFile(fileName) {
  const results: any[] = [];
  const rawDataFirstColumn: number[] = [];

  fs.createReadStream(fileName)
    .pipe(csvParser({ separator: '\t', headers: false }))
    .on('data', (row) => results.push(row))
    .on('end', () => {
      for (let i = 0; i < results.length; i++) {
        // if (i < 1000) {
          // first 1000 values used to speed things up
          let singleValueFirstColumn = <string>results[i]['0'];
          // let firstRowItem = singleRow.split('\t')[0];
          let firstRowItemAsNum: number = +singleValueFirstColumn;
          rawDataFirstColumn.push(firstRowItemAsNum);
        // }
      }

      console.log('first column:');
      console.log(rawDataFirstColumn);

      let rmsValueFromFile = calculateRMS(rawDataFirstColumn);
      console.log(rmsValueFromFile);
      thresholdDetection(rmsValueFromFile);
    });
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

/*  threshold value for this data set is approx 0.8, will be updated with formula later
    Check if rms value is above or below threshold */
function thresholdDetection(rmsValue) {
  let thresholdValue = 0.08; //hardcoded rn
  if (rmsValue >= thresholdValue){
    console.log('Threshold met, notification being sent.');
    sendNotification();
  } else {
    console.log('Threshold not met');
  }
}

function sendNotification(){
  // do stuff, possibly provide data on the sensor & machine
}

/* if over threshold, run notification() function */
/* TODO add checker for notification frequency */
