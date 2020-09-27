import React from "react";
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
import { ellipsisHorizontal, ellipsisVertical, personCircle, search } from "ionicons/icons";

interface HeadingProps {
    title: string | null | undefined;
}

const Heading: React.FC<HeadingProps> = ({ title }) => {
    return (
        <>
            <link href="https://fonts.googleapis.com/css?family=Share Tech Mono" rel="stylesheet"></link>
            <IonHeader>
                <IonToolbar color="dark">
                    <IonButtons slot="start">
                        <IonBackButton />
                    </IonButtons>
                    <IonButtons slot="secondary">
                        <IonButton>
                            <IonIcon slot="icon-only" icon={personCircle} />
                        </IonButton>
                    </IonButtons>
                    <IonTitle className="text-center text-2xl font-heading">{title ? title : "Industry 4.0"}</IonTitle>
                </IonToolbar>
            </IonHeader>
        </>
    );
};

export default Heading;
