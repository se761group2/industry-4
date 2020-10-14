import { notifyUsers } from '../notifications/notificationService';
import { updateMachineNotificationStatus } from './storeTofirebase';
import { firebaseApp } from '../firebase';

const firestore = firebaseApp.firestore();

interface ThresholdDetectionState {
  thresholdValue: number;
  notified: boolean;
  processedFileCount: number;
  badReadingCounter;
  goodReadingCounter;
  rmsValues: number[];
}

let state: ThresholdDetectionState = {
  thresholdValue: 0,
  notified: false,
  processedFileCount: 0,
  badReadingCounter: 0,
  goodReadingCounter: 0,
  rmsValues: [],
};

export async function doThresholdDetection(
  rmsValue: number,
  machineId: string,
  sensorId: string
) {
  await retrieveSensorState(machineId, sensorId);

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
        await updateMachineNotificationStatus(machineId);
        notifyUsers(state.thresholdValue, rmsValue, machineId, sensorId);
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
  await pushState(machineId, sensorId);
}

async function retrieveSensorState(
  machineId: string,
  sensorId: string
): Promise<ThresholdDetectionState> {
  const sensorRef = firestore
    .collection(`machines/${machineId}/sensors`)
    .doc(sensorId);
  const sensor = await sensorRef.get();

  if (sensor == null || sensor == undefined) {
    console.error(`There was an issue retrieving the sensor data \
      for sensor ${sensorId} of machine ${machineId}`);
    throw new Error('No sensor found');
  } else {
    // retrieve existing sensor state
    // only set the state with existing state if it is found in firestore
    if (sensor.get('state') == null || sensor.get('state') == undefined) {
      // do nothing, we'll use the one defined at the top of the file
    } else {
      state = sensor.get('state');
    }
  }
  return state;
}

async function pushState(machineId: string, sensorId: string) {
  await firestore
    .collection(`machines/${machineId}/sensors`)
    .doc(sensorId)
    .update({
      state: state,
    });
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
