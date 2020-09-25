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
import { from, useQuery } from "@apollo/client";
import { GetUserById } from "../types/GetUserById";
import { GET_USER_BY_ID } from "../common/graphql/queries/users";
import Heading from "../components/Heading";
import LineGraph from "../components/LineGraph";

const Page: React.FC = () => {
    const { name } = useParams<{ name: string }>();
    const dummyUserQuery = useQuery<GetUserById>(GET_USER_BY_ID, {
        variables: { id: "dummy" },
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
    const [functioning, setFunctioning] = useState(false);
    const [acknowledged, setAcknowledged] = useState(false);

    function handleAcknowledgement() {
        setAcknowledged(true);
    }

    function handleFixing() {
        setFunctioning(true);
    }

    return (
        <IonPage>
            <link href="https://fonts.googleapis.com/css?family=Share Tech Mono" rel="stylesheet"></link>
            <Heading title="Industry 4.0" />

            <IonContent color="new">
                <div className="statusBar h-16">
                    <HealthContainer name={"Sensor name"} value={15} threshold={20} />
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
                    <IonButton shape="round" color="light" className="responsive-width text-lg normal-case">
                        Download
                    </IonButton>
                </div>
            </IonContent>
        </IonPage>
    );
};

export default Page;
