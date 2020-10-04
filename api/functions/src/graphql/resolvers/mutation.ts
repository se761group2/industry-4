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
      args.input?.healthStatus,
      args.input?.notificationStatus,
      args.input?.image,
      args.input?.subscribers
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
    );

    const resp: any = {
      code: 'sensor_update/success',
      success: true,
      message: 'Sensor Updated Successfully.',
      sensor: sensor,
    };

    return resp;
  },

  createMachine: async (parent, args) => {
    const newMachine = await MachineStore.createMachine(args.name, args.image);

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
      sensor: newSensor,
    };

    return resp;
  },

  createUser: async (parent, args) => {
    const newUser = await MachineStore.createUser(args.email);

    const resp: any = {
      code: 'user_create/success',
      success: true,
      message: 'Sensor Created Successfully.',
      user: newUser,
    };

    return resp;
  },

  subscribeToMachine: async (parent, args) => {
    const user = await MachineStore.subscribeToMachine(
      args.userID,
      args.machineID
    );

    const resp: any = {
      code: 'user_subscribe/success',
      success: true,
      message: 'Machine Subscribed Successfully.',
      user: user,
    };

    return resp;
  },

  unsubscribeFromMachine: async (parent, args) => {
    const user = await MachineStore.unsubscribeFromMachine(
      args.userID,
      args.machineID
    );

    const resp: any = {
      code: 'user_unsubscribe/success',
      success: true,
      message: 'Machine Unsubscribed Successfully.',
      user: user,
    };

    return resp;
  },

  updateUserEmails: async (parent, args) => {
    const user = await MachineStore.updateUserEmails(args.userID, args.emails);

    const resp: any = {
      code: 'user_updateEmails/success',
      success: true,
      message: 'Emails successfully updated',
      user: user,
    };
    return resp;
  },
};
