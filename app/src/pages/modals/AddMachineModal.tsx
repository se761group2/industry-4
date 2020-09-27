import { FetchResult, MutationResult, useMutation } from "@apollo/client";
import { IonAlert } from "@ionic/react";
import React, { useState } from "react";
import { CREATE_MACHINE } from "../../common/graphql/mutations/machines";
import { GET_MACHINES } from "../../common/graphql/queries/machines";
import { createMachine } from "../../types/createMachine";

interface ModalProps {
    open: boolean;
    setOpen: (open: boolean) => void;
    onCompleted?: (res: FetchResult<any, Record<string, any>, Record<string, any>>) => void;
}

export const AddMachineModal: React.FC<ModalProps> = ({ open, setOpen, onCompleted }) => {
    const [createMachineMutation] = useMutation<createMachine>(CREATE_MACHINE, {
        refetchQueries: [{ query: GET_MACHINES }],
    });

    const handleAddMachine = async (alertData) => {
        const machineName = alertData["machineName"]?.trim();

        if (!machineName) {
            return;
        }

        const result = await createMachineMutation({
            variables: {
                name: alertData["machineName"],
            },
        });

        if (onCompleted) {
            onCompleted(result);
        }
    };

    return (
        <IonAlert
            isOpen={open}
            onDidDismiss={() => setOpen(false)}
            header={"Add a machine"}
            inputs={[
                {
                    name: "machineName",
                    type: "text",
                    placeholder: "E.g. Machine #4",
                },
            ]}
            buttons={[
                {
                    text: "Cancel",
                    role: "cancel",
                },
                {
                    text: "Add",
                    handler: handleAddMachine,
                },
            ]}
        />
    );
};
