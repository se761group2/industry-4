import { notifyUsers } from '../sendgrid/sendgrid';

interface ThresholdDetectionState {
  thresholdValue: number;
  notified: boolean;
  processedFileCount: number;
  rmsValues: number[];
}

const state: ThresholdDetectionState = {
  thresholdValue: 0,
  notified: false,
  processedFileCount: 0,
  rmsValues: [],
};

export function doThresholdDetection(rmsValue: number) {
  state.rmsValues.push(rmsValue);
  state.processedFileCount += 1;

  // first 200 values are used to determine the threshold, and as such
  // are not checked against a threshold
  if (state.processedFileCount == 199) {
    state.thresholdValue = calculateThreshold();
  } else if (state.processedFileCount > 199) {
    if (rmsValue >= state.thresholdValue) {
      console.log(
        'Record number ' +
          state.processedFileCount +
          ': Threshold of ' +
          state.thresholdValue +
          ' met, notification being sent.'
      );
      sendNotification(state.thresholdValue, rmsValue);
    } else {
      console.log(
        'Record number ' +
          state.processedFileCount +
          ': Threshold of ' +
          state.thresholdValue +
          ' NOT met.'
      );
    }
  } else {
    console.log(
      'Record number ' +
        state.processedFileCount +
        ' is being used to determine the threshold (first 200 records).'
    );
  }
}

function calculateThreshold() {
  // Expects 200 rms values
  // Threshold is the mean plus 6 times standard deviation
  let total = 0;
  for (let i = 0; i < state.rmsValues.length; i++) {
    total += state.rmsValues[i];
  }
  const rmsMean = total / state.rmsValues.length;

  total = 0;
  for (let i = 0; i < state.rmsValues.length; i++) {
    total += Math.pow(state.rmsValues[i] - rmsMean, 2);
  }
  const squaredDifferencesMean = total / state.rmsValues.length;

  const standardDeviation = Math.sqrt(squaredDifferencesMean);

  return rmsMean + 6 * standardDeviation;
}

function sendNotification(thresholdValue: number, rmsValue: number) {
  /* TODO add checker for notification frequency (or do it somewhere else) 
       Currently this is done using a state.notified flag which ensures the email is only sent once,
       (for demo purposes)
    */
  if (!state.notified) {
    // Hardcoded values for the sensor and machine ID were used, these will be changed
    // The values used for the IDs are not reflective of realistic IDs within the system.
    notifyUsers(thresholdValue, rmsValue, 'A1', 'B2');
    state.notified = true;
  }
}
