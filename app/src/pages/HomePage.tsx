import {
    IonBackButton,
    IonButton,
    IonButtons,
    IonContent,
    IonHeader,
    IonIcon,
    IonImg,
    IonPage,
    IonTitle,
    IonToolbar,
} from "@ionic/react";
import React from "react";
import "./Pages.css";
import gearsBg from "./images/gears-bg.jpg";
const HomePage: React.FC = () => {
    return (
        <IonPage>
            <link href="https://fonts.googleapis.com/css?family=Share Tech Mono" rel="stylesheet"></link>
            <IonContent color="new">
                <div className="ion-text-center"></div>
            </IonContent>
        </IonPage>
    );
};

export default HomePage;
