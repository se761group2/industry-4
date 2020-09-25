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
import { from, useQuery } from "@apollo/client";
import { getMachineById } from "../types/getMachineById";
import { getMachines } from "../types/getMachines";
import HealthContainer from "../components/HealthContainer";
import "./Page.css";
import Heading from "../components/Heading";
import { Link } from "react-router-dom";
import { useParams } from "react-router";
import { GET_MACHINE_BY_ID, GET_MACHINES } from "../common/graphql/queries/machines";
import Error404 from "../components/ErrorMessage";

const Sensors: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const machine_data = useQuery<getMachineById>(GET_MACHINE_BY_ID, {
        variables: { id: id },
    });
    // const machines = useQuery<getMachines>(GET_MACHINES);
    console.log(machine_data);
    console.log(machine_data.data);
    console.log(machine_data.data?.machine?.name);
    console.log(machine_data.data?.machine?.sensors);
    // console.log(machines);
    return (
        <IonPage>
            <link href="https://fonts.googleapis.com/css?family=Share Tech Mono" rel="stylesheet"></link>
            <Heading title={machine_data.data?.machine?.name} />

            <IonContent color="new">
                {machine_data.data?.machine ? (
                    <>
                        {machine_data.data.machine.sensors.length != 0 ? (
                            machine_data.data.machine.sensors.map((sensor) => (
                                <Link to="/sensor/5" key={sensor.name}>
                                    <HealthContainer name={sensor.name} value={19} threshold={20} />
                                </Link>
                            ))
                        ) : (
                            <Error404 message="There are no sensors for this machine" />
                        )}
                        <div className="download text-center">
                            <IonButton shape="round" color="light" className="m-4 responsive-width text-lg normal-case">
                                Add Sensor
                            </IonButton>
                        </div>
                    </>
                ) : (
                    <Error404 message="This machine does not exist" />
                )}
            </IonContent>
        </IonPage>
    );
};

export default Sensors;
