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
    
    const resp: any = {
      code: 'machine_update/success',
      success: true,
      message: 'Machine Updated Successfully.',
      machine: machine,
    };

    return resp;
  },

  updateSensor: async (parent, args) => {
    const sensor = await MachineStore.updateSensor(
      args.machineID,
      args.id,
      args.input?.name,
      args.input?.healthStatus,
      args.input?.threshold,
      args.input?.unit
    )

    const resp: any = {
      code: 'sensor_update/success',
      success: true,
      message: 'Sensor Updated Successfully.',
      sensor: sensor,
    };

    return resp;
  },

  createMachine: async (parent, args) => {
    const newMachine = await MachineStore.createMachine(args.name);

    const resp: any = {
      code: 'machine_create/success',
      success: true,
      message: 'Machine Created Successfully.',
      machine: newMachine,
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
