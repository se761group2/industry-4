import { firebaseApp } from '../../firebase';
import { MutationResolvers } from '../../generated/graphql';
import { MachineStore } from '../MachineStore';

const firestore = firebaseApp.firestore();

export const mutationResolvers: MutationResolvers = {
    updateUser: async (parent, args) => {
        return null;
    },

    updateMachine: async (parent, args) => {
        
        const machine = MachineStore.updateMachine(args.id, args.input?.name, args.input?.healthStatus, args.input?.sensors);

        return null;
    },

    updateSensor: async (parent, args) => {
        return null;
    },

    createMachine: async (parent, args) => {
        const newMachine = MachineStore.createMachine(args.id, args.name);

        const resp: any = {
            code: 'machine_create/success',
            success: true,
            message: 'Machine Created Successfully.',
            deck: MachineStore.getMachine(args.id)
        }

        return resp;
    },

    createSensor: async (parent, args) => {

        const newSensor = MachineStore.createSensor();

        const resp: any = {
            code: 'machine_create/success',
            success: true,
            message: 'Machine Created Successfully.',
            deck: MachineStore.getSensor(args.input?.machineID, args.id)
        }
        return null;
    },
};