import { MachineStore } from '../graphql/MachineStore';

export const generateSensorDataCSV = async (
  machineId: string,
  sensorId: string
): Promise<string> => {
  // const sampleChunks = await MachineStore.getSampleChunks(machineId, sensorId);
  return 'signal1\n0.8';
};
