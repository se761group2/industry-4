import { firebaseApp } from '../firebase';
import { FirebaseDocumentSnapshot, addIdToDoc } from './resolvers/utils'

const firestore = firebaseApp.firestore();

const getMachine = async (id): Promise<any> => {
    const machine = await firestore.doc(`machines/${id}`).get();

    const machineData = addIdToDoc(machine);

    return machineData;
}

const getMachines = async (): Promise<any> => {
    return (await firestore.collection(`machines`).get())
        .docs.map(addIdToDoc);
}

const getSensor = async (machineId, id): Promise<any> => {
    const sensor = await firestore.doc(`machines/${machineId}/sensors/${id}`).get();

    return addIdToDoc(sensor);
}

const getSensors = async (machineId): Promise<any> => {
    return (await firestore.collection(`machines/${machineId}/sensors`).get())
    .docs.map((sensor) => {
        return {
            ...addIdToDoc(sensor),
            machineId: machineId
        };
    });
}

const getSignals = async (machineId, sensorId): Promise<any> => {
    return (
        await firestore.collection(`machines/${machineId}/sensors/${sensorId}/signals`).get())
        .docs.map((sensor) => {
            return {
                ...addIdToDoc(sensor),
                machineId:machineId,
                sensorId: sensorId
            }; 
            
        });
}

const getSampleChunks = async (machineId, sensorId, signalId): Promise<any> => {
    return (await firestore
        .collection(`machines/${machineId}/sensors/${sensorId}/signals/${signalId}/sampleChunks`)
        .get())
        .docs
        .map(addIdToDoc);
}

const createMachine = async (machineId, machineName): Promise<any> => {
    return await firestore.doc(`machines/`).create({
        id: machineId,
        name: machineName,
        healthStatus: "Nominal",
        sensors: []
    })
}

const updateMachine = async (machineId, name, healthStatus, sensors): Promise<any> => {
    const machine = getMachine(machineId);

}


export const MachineStore = {
    getMachine,
    getMachines,
    getSensor,
    getSensors,
    getSignals,
    getSampleChunks,
    createMachine,
    updateMachine
}