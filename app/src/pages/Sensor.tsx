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
import React from "react";
import { useParams } from "react-router";
import HealthContainer from "../components/HealthContainer";
import "./Page.css";
import { from, useQuery } from "@apollo/client";
import { getSensorById } from "../types/getSensorById";
import Heading from "../components/Heading";
import LineGraph from "../components/LineGraph";
import { GET_SENSOR_BY_ID } from "../common/graphql/queries/sensors";
import Error404 from "../components/ErrorMessage";

const Sensor: React.FC = () => {
    const { machineId } = useParams<{ machineId: string }>();
    const { id } = useParams<{ id: string }>();
    const sensor_data = useQuery<getSensorById>(GET_SENSOR_BY_ID, {
        variables: { machineId: machineId, id: id },
    });
    console.log(sensor_data);
    console.log(sensor_data.data?.sensor);
    console.log(sensor_data.data?.sensor?.sampleChunks[0]);
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

    return (
        <IonPage>
            <link href="https://fonts.googleapis.com/css?family=Share Tech Mono" rel="stylesheet"></link>
            <Heading title={sensor_data.data?.sensor?.name} />

            <IonContent color="new">
                <div className=" h-16">
                    <HealthContainer
                        name={sensor_data.data?.sensor?.name}
                        value={sensor_data.data?.sensor?.sampleChunks.slice(-1)[0]?.samples.slice(-1)[0]?.value}
                        health={sensor_data.data?.sensor?.healthStatus}
                    />
                </div>
                {sensor_data.data?.sensor?.sampleChunks.slice(-1)[0]?.samples.slice(-1)[0] ? (
                    <div className="graph">
                        <LineGraph title="Sensor Values" redThreshold={600} yellowThreshold={400} data={data} />
                    </div>
                ) : (
                    <Error404 message="There is no data for this sensor" />
                )}
                <div className="download text-center">
                    <IonButton shape="round" color="light" className="responsive-width text-lg normal-case">
                        Download
                    </IonButton>
                </div>
            </IonContent>
        </IonPage>
    );
};

export default Sensor;
