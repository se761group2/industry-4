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
import React, { useEffect, useState } from "react";
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
import { getLinkForSensor } from "../services/download/download";
import Error404 from "../components/ErrorMessage";

const Sensor: React.FC = () => {
    const { machineid } = useParams<{ machineid: string }>();
    const { id } = useParams<{ id: string }>();
    const [updateSensor] = useMutation(UPDATE_SENSOR);
    const sensor_data = useQuery<getSensorById>(GET_SENSOR_BY_ID, {
        variables: { machineId: machineid, id: id },
        fetchPolicy: "network-only",
    });

    const formatTime = (unix_timestamp: number) => {
        if (!unix_timestamp) return "unknown";
        const datetime = new Date(unix_timestamp * 1000);
        const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        const month = months[datetime.getMonth()];
        const date = datetime.getDate();
        const hours = datetime.getHours();
        const minutes = "0" + datetime.getMinutes();
        // return date + " " + month + " " + hours + ":" + minutes.substr(-2);
        return hours + ":" + minutes.substr(-2);
    };

    console.log("sensor_data", sensor_data);
    console.log("sensor", sensor_data.data?.sensor);
    console.log("sample chunks", sensor_data.data?.sensor?.sampleChunks[0]);
    console.log("samples", sensor_data.data?.sensor?.sampleChunks[0]?.samples.slice(-20, -1));
    const samples = sensor_data.data?.sensor?.sampleChunks[0]?.samples.slice(-20, -1);

    let data: { name: any; value: number }[];
    data = [];

    if (samples) {
        data = samples.map((sample) => {
            return { name: formatTime(sample.timestamp?._seconds), value: sample.value };
        });
    }

    const [updated, setUpdated] = useState(false);
    const [unacknowledged, setUnacknowledged] = useState(
        sensor_data.data?.sensor?.notificationStatus == "Unacknowledged",
    );
    const [acknowledged, setAcknowledged] = useState(sensor_data.data?.sensor?.notificationStatus == "Acknowledged");

    function handleAcknowledgement() {
        updateSensor({ variables: { id: id, machineID: machineid, input: { notificationStatus: "Acknowledged" } } });
        setUnacknowledged(false);
        setAcknowledged(true);
        setUpdated(true);
    }

    function handleFixing() {
        updateSensor({ variables: { id: id, machineID: machineid, input: { notificationStatus: "Working" } } });
        setAcknowledged(false);
        setUpdated(true);
    }

    return (
        <IonPage>
            <Heading title={sensor_data.data?.sensor?.name} />

            <IonContent color="new">
                <div className=" h-16">
                    <HealthContainer
                        name={sensor_data.data?.sensor?.name}
                        value={sensor_data.data?.sensor?.sampleChunks.slice(-1)[0]?.samples.slice(-1)[0]?.value}
                        health={sensor_data.data?.sensor?.healthStatus}
                    />
                </div>
                {((!updated && sensor_data.data?.sensor?.notificationStatus == "Unacknowledged") || unacknowledged) && (
                    <NotificationContainer
                        type={"Acknowledgement"}
                        handleAcknowledge={handleAcknowledgement}
                        handleFixed={handleFixing}
                    />
                )}
                {((!updated && sensor_data.data?.sensor?.notificationStatus == "Acknowledged") || acknowledged) && (
                    <NotificationContainer
                        type={"Fixed"}
                        handleAcknowledge={handleAcknowledgement}
                        handleFixed={handleFixing}
                    />
                )}
                {sensor_data.data?.sensor?.sampleChunks.slice(-1)[0]?.samples.slice(-1)[0] ? (
                    <div className="graph">
                        <LineGraph
                            title="Sensor Values"
                            redThreshold={sensor_data.data?.sensor?.threshold}
                            data={data}
                        />
                    </div>
                ) : (
                    <Error404 message="There is no data for this sensor" />
                )}
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
