import { notifyUsers } from '../sendgrid/sendgrid';

let thresholdValue; //hardcoded rn
let notified = false;

export function thresholdDetection(
  rmsValue: number,
  rmsValues: number[],
  processedFileCount: number
) {
  // first 200 values are used to determine the threshold, and as such
  // are not checked against a threshold
  if (processedFileCount == 199) {
    thresholdValue = calculateThreshold(rmsValues);
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

function calculateThreshold(rmsValues: number[]) {
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
    // notifyUsers(thresholdValue, rmsValue, 'A1', 'B2');
    notified = true;
  }
}
