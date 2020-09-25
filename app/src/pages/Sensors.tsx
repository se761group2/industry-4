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

const Sensors: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const machine_data = useQuery<getMachineById>(GET_MACHINE_BY_ID, {
        variables: { id: id },
    });
    // const machines = useQuery<getMachines>(GET_MACHINES);
    console.log(machine_data);
    console.log(machine_data.data);
    console.log(machine_data.data?.machine?.name);
    // console.log(machines);
    return (
        <IonPage>
            <link href="https://fonts.googleapis.com/css?family=Share Tech Mono" rel="stylesheet"></link>
            <Heading title={machine_data.data?.machine?.name} />

            <IonContent color="new">
                {machine_data.data?.machine ? (
                    <>
                        <Link to="/sensor/5">
                            <HealthContainer name={"Sensor 1"} value={19} threshold={20} />
                        </Link>
                        <div className="download text-center">
                            <IonButton shape="round" color="light" className="m-4 responsive-width text-lg normal-case">
                                Add Sensor
                            </IonButton>
                        </div>
                    </>
                ) : (
                    <div className="m6">This machine does not exist</div>
                )}
            </IonContent>
        </IonPage>
    );
};

export default Sensors;
