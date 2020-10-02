import { calendarFormat } from 'moment';
import { firebaseApp } from '../firebase';
import { Machine, Sensor, Unit } from '../generated/graphql';
import { addIdToDoc } from './resolvers/utils';

const firestore = firebaseApp.firestore();

// This is a helper class, which helps us call different database functions for both querying and mutating

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
      .collection(`machines/${machineId}/sensors/${sensorId}/sampleChunks`)
      .get()
  ).docs.map(addIdToDoc);
};

const createMachine = async (machineName): Promise<Machine> => {
  const machineDoc = await firestore.collection('machines').add({
    name: machineName,
    healthStatus: 'Nominal',
  });

  return addIdToDoc(await machineDoc.get()) as Machine;
};

const updateMachine = async (
  machineId,
  name: string | null | undefined,
  healthStatus: string | null | undefined
): Promise<Machine> => {
  const machineDoc = await firestore.doc(`machines/${machineId}`);

  // Filter out any null or undefined parameters, so that they are not persisted
  const toUpdate = Object.entries({ name, healthStatus }).filter(
    ([_, v]) => v !== null && v !== undefined
  );

  await machineDoc.update(Object.fromEntries(toUpdate));

  return addIdToDoc(await machineDoc.get()) as Machine;
};

const createSensor = async (machineId, sensorName): Promise<Sensor> => {
  const sensorDoc = await firestore
    .collection('machines')
    .doc(machineId)
    .collection('sensors')
    .add({
      name: sensorName,
      healthStatus: 'Nominal',
      notificationStatus: 'Working',
      threshold: null,
      unit: Unit.Mps2Rms,
    });

  await sensorDoc.collection('/sampleChunks').add({
    chunkNumber: 0,
    samples: [],
  });

  return addIdToDoc(await sensorDoc.get()) as Sensor;
};

const updateSensor = async (
  machineId,
  sensorId,
  name: string | null | undefined,
  healthStatus: string | null | undefined,
  notificationStatus: string | null | undefined,
  threshold: number | null | undefined,
  unit: string | null | undefined
): Promise<Sensor> => {
  const sensorDoc = await firestore.doc(
    `machines/${machineId}/sensors/${sensorId}`
  );

  // Filter out any null or undefined parameters, so that they are not persisted
  const toUpdate = Object.entries({
    name,
    healthStatus,
    notificationStatus,
    threshold,
    unit,
  }).filter(([_, v]) => v !== null && v !== undefined);

  await sensorDoc.update(Object.fromEntries(toUpdate));

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
  updateSensor,
};
