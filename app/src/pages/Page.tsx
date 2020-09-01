import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar } from "@ionic/react";
import React from "react";
import { useParams } from "react-router";
import ExploreContainer from "../components/ExploreContainer";
import "./Page.css";
import { useQuery } from "@apollo/client";
import { GetUserById } from "../types/GetUserById";
import { GET_USER_BY_ID } from "../common/graphql/queries/users";

const Page: React.FC = () => {
    const { name } = useParams<{ name: string }>();
    const dummyUserQuery = useQuery<GetUserById>(GET_USER_BY_ID, { variables: { id: "dummy" } });

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonMenuButton />
                    </IonButtons>
                    <IonTitle>{name}</IonTitle>
                </IonToolbar>
            </IonHeader>

            <IonContent fullscreen>
                <IonHeader collapse="condense">
                    <IonToolbar>
                        <IonTitle size="large">{name}</IonTitle>
                    </IonToolbar>
                </IonHeader>
                <ExploreContainer
                    name={dummyUserQuery.loading ? "Loading..." : dummyUserQuery.data?.user?.email || "??"}
                />
            </IonContent>
        </IonPage>
    );
};

export default Page;
