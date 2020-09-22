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
    title: string;
}

const Heading: React.FC<HeadingProps> = ({ title }) => {
    return (
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
    );
};

export default Heading;
