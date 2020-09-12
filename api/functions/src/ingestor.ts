/* read data from file, use fileReader */
// import *as csv from 'csv-parser';

import csvParser from 'csv-parser';
import fs from 'fs';
import { raw } from 'express';

const results: any[] = [];
const rawDataFirstColumn: number[] = [];

csvParser({ separator: '\t', headers: false });
// csvParser(['sensor value']);
fs.createReadStream('2004.02.12.10.32.39')
  .pipe(csvParser())
  .on('data', (row) => results.push(row))
  .on('end', () => {
    // [
    //   '-0.049\t-0.071\t-0.132\t-0.010': '-0.042\t-0.073\t-0.007\t-0.105'
    //   '-0.049\t-0.071\t-0.132\t-0.010': '0.015\t0.000\t0.007\t0.000'
    //    First column is just the first entry. Is currently getting ignored.
    // ]

    let singleRow = '';
    for (let i = 0; i < results.length; i++) {
      if (i < 1000) {
        singleRow = <string>results[i]['-0.049\t-0.071\t-0.132\t-0.010'];
        let firstRowItem = singleRow.split('\t')[0];
        let firstRowItemAsNum: number = +firstRowItem;
        rawDataFirstColumn.push(firstRowItemAsNum);
      }
    }

    console.log('first column:');
    console.log(rawDataFirstColumn);

    let rmsValueFromFile = calculateRMS(rawDataFirstColumn);
    console.log(rmsValueFromFile);
    thresholdDetection(rmsValueFromFile);
  });

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

/*  threshold value for this data set is 542, will be updated with formula later
    Check if rms value is above or below threshold */
function thresholdDetection(rmsValue) {
  let thresholdValue = 542; //hardcoded rn
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
