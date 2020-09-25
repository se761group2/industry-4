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
import MachineContainer from "../components/MachineContainer";
import "./Page.css";
import { from, useQuery } from "@apollo/client";
import { ellipsisHorizontal, ellipsisVertical, personCircle, search } from "ionicons/icons";

const Machines: React.FC = () => {
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
            <IonHeader>
                <IonToolbar color="dark">
                    <IonButtons slot="secondary">
                        <IonButton>
                            <IonIcon slot="icon-only" icon={personCircle} />
                        </IonButton>
                    </IonButtons>
                    <IonTitle className="text-center text-2xl font-heading">Machines</IonTitle>
                </IonToolbar>
            </IonHeader>

            <IonContent color="new">
                <div className="statusBar h-16">
                    <MachineContainer name={"Sensor name"} health={1} />
                </div>
            </IonContent>
        </IonPage>
    );
};

export default Machines;
