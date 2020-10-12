import { IonAlert, IonButton, IonContent, IonPage, IonSpinner } from "@ionic/react";
import React, { useState } from "react";
import { useParams } from "react-router";
import HealthContainer from "../components/HealthContainer";
import NotificationContainer from "../components/NotificationContainer";
import "./Page.css";
import { useQuery, useMutation } from "@apollo/client";
import { getSensorById } from "../types/getSensorById";
import Heading from "../components/Heading";
import LineGraph from "../components/LineGraph";
import { GET_SENSOR_BY_ID } from "../common/graphql/queries/sensors";
import { UPDATE_SENSOR } from "../common/graphql/mutations/sensors";
import { getLinkForSensor } from "../services/download/download";
import { DownloadModal } from "./modals/DownloadModal";
import Error404 from "../components/ErrorMessage";

const Sensor: React.FC = () => {
    const [open, setOpen] = useState(false);
    const { machineid } = useParams<{ machineid: string }>();
    const { id } = useParams<{ id: string }>();
    const sensorQuery = useQuery<getSensorById>(GET_SENSOR_BY_ID, {
        variables: { machineId: machineid, id: id },
        fetchPolicy: "network-only",
    });
    const sensor = sensorQuery.data?.sensor;

    const getTime = (unix_timestamp: number) => {
        if (!unix_timestamp) return "unknown";
        const datetime = new Date(unix_timestamp * 1000);
        const hours = datetime.getHours();
        const minutes = "0" + datetime.getMinutes();
        return hours + ":" + minutes.substr(-2);
    };
    const getDate = (unix_timestamp: number) => {
        if (!unix_timestamp) return "unknown";
        const datetime = new Date(unix_timestamp * 1000);
        const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        const year = datetime.getFullYear();
        const month = months[datetime.getMonth()];
        const date = datetime.getDate();
        return date + " " + month + " " + year;
    };

    const samples = sensor?.sampleChunks[0]?.samples.slice(-20);
    const currentValue = sensor?.sampleChunks.slice(-1)[0]?.samples.slice(-1)[0];

    let data: { name: any; value: number }[];
    data = [];

    if (samples) {
        data = samples.map((sample) => {
            return { name: getTime(sample.timestamp?._seconds), value: sample.value };
        });
    }

    return (
        <IonPage>
            <DownloadModal open={open} setOpen={setOpen} />
            <link href="https://fonts.googleapis.com/css?family=Share Tech Mono" rel="stylesheet"></link>
            <Heading title={sensor?.name} />
            <IonContent color="new">
                {sensorQuery.loading ? (
                    <div className="flex w-full h-full justify-center items-center">
                        <IonSpinner className="w-16 h-16" color="light" />
                    </div>
                ) : sensor ? (
                    <>
                        <div className="responsive-width m-auto py-5 h-16">
                            <HealthContainer
                                name={sensor.name}
                                value={currentValue?.value}
                                health={sensor.healthStatus}
                                machineId={machineid}
                                id={id}
                            />
                        </div>
                        {data ? (
                            <LineGraph
                                title={`Sensor Values ~ ${getDate(currentValue?.timestamp?._seconds)}`}
                                redThreshold={sensor?.threshold}
                                data={data}
                            />
                        ) : (
                            <Error404 message="There is no data for this sensor" />
                        )}
                        <div className="download text-center">
                            <IonButton
                                shape="round"
                                color="light"
                                className="responsive-width text-lg normal-case m-4"
                                onClick={() => setOpen(true)}
                            >
                                Download
                            </IonButton>
                        </div>
                    </>
                ) : (
                    <Error404 message="Couldn't find the sensor you were looking for" />
                )}
            </IonContent>
        </IonPage>
    );
};

export default Sensor;
