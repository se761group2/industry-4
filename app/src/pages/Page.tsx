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
import "./Page.css";
import { from, useQuery } from "@apollo/client";
import { GetUserById } from "../types/GetUserById";
import { GET_USER_BY_ID } from "../common/graphql/queries/users";
import { ellipsisHorizontal, ellipsisVertical, personCircle, search } from "ionicons/icons";

import { CartesianGrid, Line, LineChart, Tooltip, XAxis, YAxis } from "recharts";

const Page: React.FC = () => {
    const { name } = useParams<{ name: string }>();
    const dummyUserQuery = useQuery<GetUserById>(GET_USER_BY_ID, {
        variables: { id: "dummy" },
    });
    const data = [
        { name: "Page A", uv: 400 },
        { name: "Page B", uv: 650 },
        { name: "Page C", uv: 300 },
        { name: "Page D", uv: 225 },
        { name: "Page E", uv: 700 },
        { name: "Page F", uv: 650 },
        { name: "Page G", uv: 425 },
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
                <div className="statusBar"></div>
                <div className="graph"></div>
                <div className="download" style={{ textAlign: "center", margin: "20%" }}>
                    <LineChart width={600} height={300} data={data} margin={{ top: 20, right: 30, bottom: 5, left: 0 }}>
                        <Line type="monotone" dataKey="uv" stroke="#8884d8" />
                        <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                    </LineChart>
                    {/* <LineChart width={400} height={400} data={data} margin={{ top: 20, right: 20, left: 10, bottom: 5 }}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <CartesianGrid stroke="#f5f5f5" />
            <Line type="monotone" dataKey="value" stroke="#2273ff" yAxisId={0} activeDot={{ r: 8 }} />
        </LineChart> */}
                    <IonButton
                        shape="round"
                        color="light"
                        style={{
                            textAlign: "center",
                            textTransform: "none",
                            fontSize: "18px",
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
