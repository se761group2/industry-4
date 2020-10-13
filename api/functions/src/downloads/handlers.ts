import { Response } from 'express';
import { MachineStore } from '../graphql/MachineStore';
import { firebaseApp } from '../firebase';

const storage = firebaseApp.storage();

export const generateSensorDataCSV = async (
  machineId: string,
  sensorId: string
): Promise<string> => {
  const sampleChunks = (await MachineStore.getSampleChunks(
    machineId,
    sensorId
  )) as {
    samples: {
      timestamp: FirebaseFirestore.Timestamp;
      value: number;
    }[];
  }[];

  let fileString = 'timestamp, value\n';

  // iterate over every sample of every sampleChunk and add it to the CSV as a row
  sampleChunks.forEach((value) => {
    value.samples.forEach((value) => {
      fileString =
        fileString +
        `${value.timestamp.toDate().toISOString()}, ${value.value}\n`;
    });
  });

  return fileString;
};

export const streamRawFiles = async (
  res: Response<any>,
  machineId: string,
  sensorId: string,
  startTime: Date | null,
  endTime: Date | null
) => {
  const bucket = storage.bucket(firebaseApp.options.storageBucket);

  const files = await bucket.getFiles({
    directory: `sensorData/${machineId}/${sensorId}`,
  });

  for (const f of files) {
    
  }

  function write(data, cb) {
    if (!res.write(data)) {
      res.once('drain', cb);
    } else {
      process.nextTick(cb);
    }
  }

  return;
};
