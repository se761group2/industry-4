import {
    IonBackButton,
    IonButton,
    IonButtons,
    IonContent,
    IonHeader,
    IonIcon,
    IonPage,
    IonTitle,
    IonToolbar,
} from "@ionic/react";
import React, { useState } from "react";
import { useParams } from "react-router";
import HealthContainer from "../components/HealthContainer";
import NotificationContainer from "../components/NotificationContainer";
import "./Page.css";
import { from, useQuery, useMutation } from "@apollo/client";
import { getSensorById } from "../types/getSensorById";
import Heading from "../components/Heading";
import LineGraph from "../components/LineGraph";
import { GET_SENSOR_BY_ID } from "../common/graphql/queries/sensors";
import { UPDATE_SENSOR } from "../common/graphql/mutations/sensors";
// import { QuerySensorArgs } from "../types/types";
// import { Scalars } from "../types/types";
import { getLinkForSensor } from "../services/download/download";

const Sensor: React.FC = () => {
    // const { machineId } = useParams<{ machineId: Scalars["ID"] }>();
    // const { id } = useParams<{ id: Scalars["ID"] }>();
    const { machineid } = useParams<{ machineid: string }>();
    const { id } = useParams<{ id: string }>();
    // const tmp: QuerySensorArgs = { id: id, machineId: machineId };
    const [updateSensor] = useMutation(UPDATE_SENSOR);
    const sensor_data = useQuery<getSensorById>(GET_SENSOR_BY_ID, {
        variables: { machineId: machineid, id: id },
    });
    const data = [
        { name: "1", value: 350 },
        { name: "2", value: 250 },
        { name: "3", value: 300 },
        { name: "4", value: 325 },
        { name: "5", value: 400 },
        { name: "6", value: 450 },
        { name: "7", value: 425 },
        { name: "8", value: 450 },
        { name: "9", value: 650 },
        { name: "10", value: 300 },
        { name: "11", value: 425 },
        { name: "12", value: 700 },
        { name: "13", value: 650 },
        { name: "14", value: 425 },
    ];
    const [functioning, setFunctioning] = useState(sensor_data.data?.sensor?.notificationStatus == "Working");
    const [acknowledged, setAcknowledged] = useState(sensor_data.data?.sensor?.notificationStatus == "Acknowledged");

    function handleAcknowledgement() {
        updateSensor({ variables: { id: id, machineID: machineid, input: { notificationStatus: "Acknowledged" } } });
        setAcknowledged(true);
    }

    function handleFixing() {
        updateSensor({ variables: { id: id, machineID: machineid, input: { notificationStatus: "Working" } } });
        setFunctioning(true);
    }

    return (
        <IonPage>
            <Heading title={sensor_data.data?.sensor?.name} />

            <IonContent color="new">
                <div className=" h-16">
                    <HealthContainer name={"Sensor name"} value={15} health={sensor_data.data?.sensor?.healthStatus} />
                </div>
                {!functioning && !acknowledged && (
                    <NotificationContainer
                        type={"Acknowledgement"}
                        handleAcknowledge={handleAcknowledgement}
                        handleFixed={handleFixing}
                    />
                )}
                {!functioning && acknowledged && (
                    <NotificationContainer
                        type={"Fixed"}
                        handleAcknowledge={handleAcknowledgement}
                        handleFixed={handleFixing}
                    />
                )}
                <div className="graph">
                    <LineGraph title="Sensor Values" redThreshold={600} yellowThreshold={400} data={data} />
                </div>
                <div className="download text-center">
                    <IonButton
                        shape="round"
                        color="light"
                        className="responsive-width text-lg normal-case"
                        download="sensor data"
                        href={getLinkForSensor(machineid || "", id || "")}
                    >
                        Download
                    </IonButton>
                </div>
            </IonContent>
        </IonPage>
    );
};

export default Sensor;
