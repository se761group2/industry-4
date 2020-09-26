import {
    IonBackButton,
    IonButton,
    IonButtons,
    IonContent,
    IonFooter,
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
import graph from "./images/graph.png";
const HomePage: React.FC = () => {
    return (
        <IonPage>
            <link href="https://fonts.googleapis.com/css?family=Share Tech Mono" rel="stylesheet"></link>
            <IonContent color="new" style={{ width: "100%" }}>
                <div className="text-center">
                    <IonTitle className="text-center text-5xl font-heading ion-margin">Industry 4.0</IonTitle>
                    <div className="info ion-margin" style={{ display: "block" }}>
                        <div className="graphInfo">
                            <div
                                className="ion-text-start text-lg responsive-width"
                                style={{ width: "90%", marginLeft: "auto", marginRight: "auto" }}
                            >
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque id fringilla metus.
                                Aenean eget commodo elit, nec elementum enim.
                            </div>
                            <div
                                className="info responsive-width ion-margin"
                                style={{ marginLeft: "auto", marginRight: "auto" }}
                            >
                                <IonImg src={graph}></IonImg>
                            </div>
                        </div>

                        <div className="graphInfo">
                            <div
                                className="ion-text-start text-lg responsive-width"
                                style={{ width: "90%", marginLeft: "auto", marginRight: "auto" }}
                            >
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque id fringilla metus.
                                Aenean eget commodo elit, nec elementum enim. Aenean id tincidunt orci, eu malesuada
                                diam.
                            </div>
                            <div
                                className="info responsive-width ion-margin"
                                style={{ marginLeft: "auto", marginRight: "auto" }}
                            >
                                <IonImg src={graph}></IonImg>
                            </div>
                        </div>
                    </div>
                </div>
            </IonContent>
            <IonFooter>
                <IonToolbar color="dark">
                    <div className="text-center ">
                        <IonButton shape="round" color="light" className="text-2xl normal-case ion-margin-end">
                            Login
                        </IonButton>
                        <IonButton shape="round" color="light" className="text-2xl normal-case">
                            Register
                        </IonButton>
                    </div>
                </IonToolbar>
            </IonFooter>
        </IonPage>
    );
};

export default HomePage;
