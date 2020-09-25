import {
    IonAlert,
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
import "./Page.css";
import { from, useQuery } from "@apollo/client";
import { GetUserById } from "../types/GetUserById";
import { GET_USER_BY_ID } from "../common/graphql/queries/users";
import Heading from "../components/Heading";
import LineGraph from "../components/LineGraph";
import { addCircle } from "ionicons/icons";
import { AddMachineModal } from "./modals/AddMachineModal";

const Page: React.FC = () => {
    const { name } = useParams<{ name: string }>();
    const [addMachineOpen, setAddMachineOpen] = useState<boolean>(false);

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
            <Heading title="Industry 4.0" />

            <AddMachineModal open={addMachineOpen} setOpen={setAddMachineOpen} />
            <IonContent color="new">
                <div className="w-full flex justify-center">
                    <div className="max-w-xl flex flex-grow flex-col justify-center justify-items-center p-6">
                        <div className="w-full h-16">
                            <HealthContainer name={"Sensor name"} value={15} threshold={20} />
                        </div>
                        <div className="w-full">
                            <LineGraph title="Sensor Values" redThreshold={600} yellowThreshold={400} data={data} />
                        </div>
                        <div className="flex w-auto justify-between my-4 ">
                            <IonButton shape="round" color="light" className="text-lg normal-case">
                                Download
                            </IonButton>
                            <IonButton
                                color="light"
                                fill="clear"
                                onClick={() => {
                                    setAddMachineOpen(true);
                                }}
                            >
                                <IonIcon color="light" slot="start" icon={addCircle}></IonIcon>
                                <strong> New Machine</strong>
                            </IonButton>
                        </div>
                    </div>
                </div>
            </IonContent>
        </IonPage>
    );
};

export default Page;
