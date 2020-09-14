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
// import LineGraph from "../components/LineGraph";

import { ellipsisHorizontal, ellipsisVertical, personCircle, search } from "ionicons/icons";

import { CartesianGrid, DotProps, Line, LineChart, Tooltip, XAxis, YAxis } from "recharts";

type CustomDotProps = DotProps & { value?: number };

const Dot: React.FC<CustomDotProps> = (props: CustomDotProps) => {
    const { cx, cy, value } = props;

    if (value && value > 500) {
        return (
            <svg x={(cx || 0) - 10} y={(cy || 0) - 14} height="20" width="20">
                <polygon points="10,0 20,20 0,20" style={{ fill: "red" }} />
                <text fill="#ffffff" fontSize="12" fontFamily="Verdana" x="8" y="17">
                    !
                </text>
            </svg>
        );
    }

    if (value && value > 400) {
        return (
            <svg x={(cx || 0) - 10} y={(cy || 0) - 14} height="20" width="20">
                <polygon points="10,0 20,20 0,20" style={{ fill: "orange" }} />
                <text fill="#ffffff" fontSize="12" fontFamily="Verdana" x="8" y="17">
                    !
                </text>
            </svg>
        );
    }

    return (
        <svg x={(cx || 0) - 10} y={(cy || 0) - 10} width={20} height={20}>
            <circle cx="10" cy="10" r="6" stroke="#8884df" strokeWidth="2" fill="white" />
        </svg>
    );
};

const Page: React.FC = () => {
    const { name } = useParams<{ name: string }>();
    const dummyUserQuery = useQuery<GetUserById>(GET_USER_BY_ID, {
        variables: { id: "dummy" },
    });
    const data = [
        { name: "Page A", value: 450 },
        { name: "Page B", value: 650 },
        { name: "Page C", value: 300 },
        { name: "Page D", value: 225 },
        { name: "Page E", value: 700 },
        { name: "Page F", value: 650 },
        { name: "Page G", value: 425 },
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
                <div className="graph">
                    <LineChart
                        width={600}
                        height={300}
                        data={data}
                        margin={{ top: 20, right: 30, bottom: 5, left: 0 }}
                        style={{ backgroundColor: "white" }}
                    >
                        <Line
                            type="monotone"
                            dataKey="uv"
                            stroke="#8884df"
                            isAnimationActive={false} // allows hollow dots to appear for unkown reason
                            activeDot={{ r: 8 }}
                            dot={<Dot />}
                        />
                        <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                    </LineChart>
                </div>
                <div className="download" style={{ textAlign: "center", margin: "20%" }}>
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
