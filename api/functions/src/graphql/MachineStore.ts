import { firebaseApp } from '../firebase';
import { Sensor, Unit } from '../generated/graphql';
import { addIdToDoc } from './resolvers/utils';

const firestore = firebaseApp.firestore();

const getMachine = async (id): Promise<any> => {
  const machine = await firestore.doc(`machines/${id}`).get();

  const machineData = addIdToDoc(machine);

  return machineData;
};

const getMachines = async (): Promise<any> => {
  return (await firestore.collection(`machines`).get()).docs.map(addIdToDoc);
};

const getSensor = async (machineId, id): Promise<any> => {
  const sensor = await firestore
    .doc(`machines/${machineId}/sensors/${id}`)
    .get();

  return addIdToDoc(sensor);
};

const getSensors = async (machineId): Promise<any> => {
  return (
    await firestore.collection(`machines/${machineId}/sensors`).get()
  ).docs.map((sensor) => {
    return {
      ...addIdToDoc(sensor),
      machineId: machineId,
    };
  });
};

const getSampleChunks = async (machineId, sensorId): Promise<any> => {
  return (
    await firestore
      .collection(
        `machines/${machineId}/sensors/${sensorId}/sampleChunks`
      )
      .get()
  ).docs.map(addIdToDoc);
};

const createMachine = async (
  machineId,
  machineName
): Promise<FirebaseFirestore.WriteResult> => {
  return await firestore.doc(`machines/`).create({
    id: machineId,
    name: machineName,
    healthStatus: 'Nominal',
    sensors: [],
  });
};

const updateMachine = async (
  machineId,
  name,
  healthStatus
): Promise<any> => {
  const machine = getMachine(machineId);
};

const createSensor = async (machineId, sensorName): Promise<Sensor> => {
  const sensorDoc = await firestore
    .collection('machines')
    .doc(machineId)
    .collection('sensors')
    .add({
      name: sensorName,
      healthStatus: 'Nominal',
      threshold: null,
      unit: Unit.Mps2Rms,
    });

  await sensorDoc.collection('/sampleChunks').add({
    samples: [],
  });

  return addIdToDoc(await sensorDoc.get()) as Sensor;
};

export const MachineStore = {
  getMachine,
  getMachines,
  getSensor,
  getSensors,
  getSampleChunks,
  createMachine,
  updateMachine,
  createSensor,
};
