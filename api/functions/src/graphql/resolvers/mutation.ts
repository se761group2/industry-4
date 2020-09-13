import { firebaseApp } from '../../firebase';
import { MutationResolvers } from '../../generated/graphql';
import { MachineStore } from '../MachineStore';

const firestore = firebaseApp.firestore();

export const mutationResolvers: MutationResolvers = {
  updateUser: async (parent, args) => {
    return null;
  },

  updateMachine: async (parent, args) => {
    const machine = await MachineStore.updateMachine(
      args.id,
      args.input?.name,
      args.input?.healthStatus
    );

    return null;
  },

  updateSensor: async (parent, args) => {
    return null;
  },

  createMachine: async (parent, args) => {
    await MachineStore.createMachine(args.id, args.name);

    const resp: any = {
      code: 'machine_create/success',
      success: true,
      message: 'Machine Created Successfully.',
      deck: await MachineStore.getMachine(args.id),
    };

    return resp;
  },

  createSensor: async (parent, args) => {
    const newSensor = await MachineStore.createSensor(
      args.input?.machineID,
      args.input?.name
    );

    const resp: any = {
      code: 'sensor_create/success',
      success: true,
      message: 'Sensor Created Successfully.',
      sensor: newSensor
    };

    return resp;
  },
};
