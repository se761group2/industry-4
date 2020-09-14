import { MachineStore } from '../graphql/MachineStore';

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
