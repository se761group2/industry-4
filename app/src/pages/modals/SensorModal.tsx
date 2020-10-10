import { FetchResult, MutationResult, useMutation } from "@apollo/client";
import { IonAlert } from "@ionic/react";
import React, { useState } from "react";
import { CREATE_SENSOR, UPDATE_SENSOR } from "../../common/graphql/mutations/sensors";
import { GET_MACHINE_BY_ID } from "../../common/graphql/queries/machines";
import { createSensor } from "../../types/createSensor";
import { updateSensor } from "../../types/updateSensor";

interface ModalProps {
    open: boolean;
    machineId: string;
    setOpen: (open: boolean) => void;
    onCompleted?: (res: FetchResult<any, Record<string, any>, Record<string, any>>) => void;
    action: string;
    name?: string;
    id?: string;
}

export const SensorModal: React.FC<ModalProps> = ({ open, setOpen, machineId, onCompleted, action, name, id }) => {
    const [disabled, setDisabled] = useState(false);

    const [createSensorMutation] = useMutation<createSensor>(CREATE_SENSOR, {
        refetchQueries: [{ query: GET_MACHINE_BY_ID, variables: { id: machineId } }],
    });

    const [updateSensorMutation] = useMutation<updateSensor>(UPDATE_SENSOR, {
        refetchQueries: [{ query: GET_MACHINE_BY_ID, variables: { id: machineId } }],
    });

    const handleAddSensor = async (alertData) => {
        const sensorName = alertData["sensorName"]?.trim();

        if (!sensorName) {
            return;
        }

        if (disabled) {
            return;
        }
        setDisabled(true);
        const result = await createSensorMutation({
            variables: {
                input: {
                    name: sensorName,
                    machineID: machineId,
                },
            },
        }).then(() => {
            setDisabled(false);
        });
    };

    const handleUpdateSensor = async (alertData) => {
        const sensorName = alertData["sensorName"]?.trim();

        if (!sensorName) {
            return;
        }
        const result = await updateSensorMutation({
            variables: {
                id: id,
                machineID: machineId,
                input: {
                    name: sensorName,
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
            header={action == "add" ? "Add a sensor" : "Update sensor: " + name}
            inputs={[
                {
                    name: "sensorName",
                    type: "text",
                    placeholder: "E.g. Sensor #2",
                },
            ]}
            buttons={
                action == "add"
                    ? [
                          {
                              text: "Cancel",
                              role: "cancel",
                          },
                          {
                              text: "Add",
                              handler: handleAddSensor,
                          },
                      ]
                    : [
                          {
                              text: "Cancel",
                              role: "cancel",
                          },
                          {
                              text: "Update",
                              handler: handleUpdateSensor,
                          },
                      ]
            }
        />
    );
};
