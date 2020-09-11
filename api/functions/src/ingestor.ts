/* read data from file, use fileReader */
// import *as csv from 'csv-parser';

import csvParser from 'csv-parser';
import fs from 'fs';
import { raw } from 'express';

const results: any[] = [];
const rawDataFirstColumn: string[] = [];

csvParser({ separator: '\t', headers: false });
// csvParser(['sensor value']);
fs.createReadStream('2004.02.12.10.32.39')
  .pipe(csvParser())
  .on('data', (row) => results.push(row))
  .on('end', () => {
    console.log(results);

    let singleRow = '';
    for (let i = 0; i < results.length; i++) {
      singleRow = <string>results[i]['-0.049\t-0.071\t-0.132\t-0.010'];
      let firstRowItem = singleRow.split('\t')[0];
      rawDataFirstColumn.push(firstRowItem);
    }

    let firstRow = results[0]['-0.049\t-0.071\t-0.132\t-0.010'];

    console.log('first row:');
    console.log(firstRow);
    console.log('first column:');
    console.log(rawDataFirstColumn);

    // console.log('raw data from first column:');
    // console.log(rawDataFirstColumn);
    // [
    //   '-0.049\t-0.071\t-0.132\t-0.010': '-0.042\t-0.073\t-0.007\t-0.105'
    //   '-0.049\t-0.071\t-0.132\t-0.010': '0.015\t0.000\t0.007\t0.000'
    //    First column is just the first entry. Is currently getting ignored.
    // ]
  });

/* calculate rms value. see 4.1.2 of the full research doc (pg 9) for info on how this is calculated*/

/*  threshold value for this data set is 542
    Check if rms value is above or below threshold */

/* if over threshold, run notification() function */
/* TODO add checker for notification frequency */
