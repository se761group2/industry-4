import { notifyUsers } from '../notifications/notificationService';
import { updateSensorNotificationStatus } from './storeTofirebase';

interface ThresholdDetectionState {
  thresholdValue: number;
  notified: boolean;
  processedFileCount: number;
  badReadingCounter;
  goodReadingCounter;
  rmsValues: number[];
}

const state: ThresholdDetectionState = {
  thresholdValue: 0,
  notified: false,
  processedFileCount: 0,
  badReadingCounter: 0,
  goodReadingCounter: 0,
  rmsValues: [],
};

export function doThresholdDetection(
  rmsValue: number,
  machineId: string,
  sensorId: string
) {
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
          ' met, Potential machine malfunction.'
      );
      state.badReadingCounter++;
      state.goodReadingCounter = 0;

      if (state.badReadingCounter >= 10) {
        // TODO: Update this section to set the corresponding sensor notificationStatus value to unacknowledged
        if (!state.notified) {
          updateSensorNotificationStatus(machineId, sensorId);
        }
        sendNotification(state.thresholdValue, rmsValue, machineId, sensorId);
      }
    } else {
      state.goodReadingCounter++;
      // 5 consecutive readings above the threshold resets the bad reading counter
      if (state.goodReadingCounter > 5) {
        state.badReadingCounter = 0;
      }
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

function sendNotification(
  thresholdValue: number,
  rmsValue: number,
  machineId: string,
  sensorId: string
) {
  /* TODO add checker for notification frequency (or do it somewhere else) 
       Currently this is done using a state.notified flag which ensures the email is only sent once,
       (for demo purposes)
    */
  // Update the db to reflect this issue.
  if (!state.notified) {
    // Hardcoded values for the sensor and machine ID were used, these will be changed
    // The values used for the IDs are not reflective of realistic IDs within the system.
    notifyUsers(thresholdValue, rmsValue, machineId, sensorId);
    state.notified = true;
  }
}
