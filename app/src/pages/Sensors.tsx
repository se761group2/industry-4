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
import HealthContainer from "../components/HealthContainer";
import "./Page.css";
import Heading from "../components/Heading";
import { Link } from "react-router-dom";

const Sensors: React.FC = () => {
    return (
        <IonPage>
            <link href="https://fonts.googleapis.com/css?family=Share Tech Mono" rel="stylesheet"></link>
            <Heading title="Industry 4.0" />

            <IonContent color="new">
                <Link to="/machine/sensor/5">
                    <HealthContainer name={"Sensor 1"} value={19} threshold={20} />
                </Link>
                <HealthContainer name={"Sensor 2"} value={18} threshold={20} />
                <HealthContainer name={"Sensor 3"} value={22} threshold={20} />
                <HealthContainer name={"Sensor 4"} value={16} threshold={20} />
                <div className="download text-center">
                    <IonButton shape="round" color="light" className="m-4 responsive-width text-lg normal-case">
                        Add Sensor
                    </IonButton>
                </div>
            </IonContent>
        </IonPage>
    );
};

export default Sensors;
