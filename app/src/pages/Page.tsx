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
import ExploreContainer from "../components/ExploreContainer";
import HealthContainer from "../components/HealthContainer";
import "./Page.css";
import { from, useQuery } from "@apollo/client";
import { GetUserById } from "../types/GetUserById";
import { GET_USER_BY_ID } from "../common/graphql/queries/users";
import { ellipsisHorizontal, ellipsisVertical, personCircle, search } from "ionicons/icons";
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
                    <IonTitle
                        style={{
                            textAlign: "center",
                            fontFamily: "Share Tech Mono",
                            fontSize: "24px",
                        }}
                    >
                        Industry 4.0
                    </IonTitle>
                </IonToolbar>
            </IonHeader>

            <IonContent color="new">
                <div className="statusBar" style={{ height: "65px" }}>
                    <HealthContainer name={"Sensor name"} value={15} threshold={20} />
                </div>
                <div className="graph">
                    <LineGraph title="Sensor Values" redThreshold={600} yellowThreshold={400} data={data} />
                </div>
                <div className="download" style={{ height: "65px" }}>
                    <IonButton
                        shape="round"
                        color="light"
                        style={{
                            textAlign: "center",
                            textTransform: "none",
                            fontSize: "18px",
                            margin: "25px 55.5%",
                            width: "200px",
                        }}
                    >
                        Download
                    </IonButton>
                </div>
            </IonContent>
        </IonPage>
    );
};

export default Page;
