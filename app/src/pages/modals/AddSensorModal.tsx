import { FetchResult, MutationResult, useMutation } from "@apollo/client";
import { IonAlert } from "@ionic/react";
import React, { useState } from "react";
import { CREATE_SENSOR } from "../../common/graphql/mutations/sensors";
import { GET_MACHINE_BY_ID } from "../../common/graphql/queries/machines";
import { createSensor } from "../../types/createSensor";

interface ModalProps {
    open: boolean;
    machineId: string;
    setOpen: (open: boolean) => void;
    onCompleted?: (res: FetchResult<any, Record<string, any>, Record<string, any>>) => void;
}

export const AddSensorModal: React.FC<ModalProps> = ({ open, setOpen, machineId, onCompleted }) => {
    const [createSensorMutation] = useMutation<createSensor>(CREATE_SENSOR, {
        refetchQueries: [{ query: GET_MACHINE_BY_ID, variables: { id: machineId } }],
    });

    const handleAddSensor = async (alertData) => {
        const sensorName = alertData["sensorName"]?.trim();

        if (!sensorName) {
            return;
        }

        const result = await createSensorMutation({
            variables: {
                input: {
                    name: sensorName,
                    machineID: machineId,
                },
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
            header={"Add a sensor"}
            inputs={[
                {
                    name: "sensorName",
                    type: "text",
                    placeholder: "E.g. Sensor #2",
                },
            ]}
            buttons={[
                {
                    text: "Cancel",
                    role: "cancel",
                },
                {
                    text: "Add",
                    handler: handleAddSensor,
                },
            ]}
        />
    );
};
