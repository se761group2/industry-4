import { calendarFormat } from 'moment';
import { firebaseApp } from '../firebase';
import { Machine, Sensor, Unit, User } from '../generated/graphql';
import { addIdToDoc } from './resolvers/utils';

const firestore = firebaseApp.firestore();
import admin from 'firebase-admin';

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

const createMachine = async (machineName, imageURL): Promise<Machine> => {
  const machineDoc = await firestore.collection('machines').add({
    name: machineName,
    healthStatus: 'Nominal',
    image: imageURL,
  });

  return addIdToDoc(await machineDoc.get()) as Machine;
};

const updateMachine = async (
  machineId,
  name: string | null | undefined,
  healthStatus: string | null | undefined,
  subscribers: (string | null)[] | null | undefined,
  image: string | null | undefined
): Promise<Machine> => {
  const machineDoc = await firestore.doc(`machines/${machineId}`);
  // Filter out any null or undefined parameters, so that they are not persisted
  const toUpdate = Object.entries({
    name,
    healthStatus,
    image,
    subscribers,
  }).filter(([_, v]) => v !== null && v !== undefined);

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
  machineID,
  id,
  name: string | null | undefined,
  healthStatus: string | null | undefined,
  notificationStatus: string | null | undefined,
  threshold: number | null | undefined,
  unit: string | null | undefined
): Promise<Sensor> => {
  const sensorDoc = await firestore.doc(`machines/${machineID}/sensors/${id}`);
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

const getUserByEmail = async (email): Promise<any> => {
  const userQuery = await firestore
    .collection('users')
    .where('email', '==', email)
    .get();

  let userData;
  if (!userQuery.empty) {
    const snapshot = userQuery.docs[0];
    userData = addIdToDoc(snapshot);
  } else {
    userData = null;
  }

  return userData;
};

const getUserByID = async (id): Promise<any> => {
  const user = await firestore.doc(`users/${id}`).get();

  const userData = addIdToDoc(user);

  return userData;
};

const createUser = async (email): Promise<User> => {
  const userDoc = await firestore.collection('users').add({
    email: email,
    emails: [email],
  });

  return addIdToDoc(await userDoc.get()) as User;
};

const subscribeToMachine = async (userID, machineId): Promise<User> => {
  const userDoc = await firestore.doc(`users/${userID}`);
  const machineReference = await firestore.doc(`machines/${machineId}`);
  await userDoc.update({
    machinesMaintaining: admin.firestore.FieldValue.arrayUnion(
      machineReference
    ),
  });

  return addIdToDoc(await userDoc.get()) as User;
};

const unsubscribeFromMachine = async (userID, machineId): Promise<User> => {
  const userDoc = await firestore.doc(`users/${userID}`);
  const machineReference = await firestore.doc(`machines/${machineId}`);
  await userDoc.update({
    machinesMaintaining: admin.firestore.FieldValue.arrayRemove(
      machineReference
    ),
  });

  return addIdToDoc(await userDoc.get()) as User;
};

const updateUserEmails = async (userID, updatedEmails): Promise<User> => {
  const userDoc = await firestore.doc(`users/${userID}`);
  await userDoc.update({
    emails: updatedEmails,
  });

  return addIdToDoc(await userDoc.get()) as User;
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
  getUserByEmail,
  getUserByID,
  createUser,
  subscribeToMachine,
  unsubscribeFromMachine,
  updateUserEmails,
};
