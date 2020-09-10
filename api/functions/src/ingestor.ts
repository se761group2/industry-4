/* read data from file, use fileReader */
// import *as csv from 'csv-parser';

import csvParser from 'csv-parser';
import fs from 'fs';

const results: any[] = [];

fs.createReadStream('2004.02.12.10.32.39')
  .pipe(csvParser())
  .on('data', (data) => results.push(data))
  .on('end', () => {
    console.log(results);
    // [
    //   { NAME: 'Daffy Duck', AGE: '24' },
    //   { NAME: 'Bugs Bunny', AGE: '22' }
    // ]
  });

/* calculate rms value. see 4.1.2 of the full research doc (pg 9) for info on how this is calculated*/

/*  threshold value for this data set is 542
    Check if rms value is above or below threshold */

/* if over threshold, run notification() function */
/* TODO add checker for notification frequency */
