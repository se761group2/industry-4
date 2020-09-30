import {
    IonBackButton,
    IonButton,
    IonButtons,
    IonContent,
    IonFab,
    IonFabButton,
    IonHeader,
    IonIcon,
    IonPage,
    IonTitle,
    IonToolbar,
} from "@ionic/react";
import React, { useState } from "react";
import { useParams } from "react-router";
import MachineContainer from "../components/MachineContainer";
import "./Page.css";
import { from, useQuery } from "@apollo/client";
import { add, ellipsisHorizontal, ellipsisVertical, personCircle, search } from "ionicons/icons";
import Heading from "../components/Heading";
import { Status } from "../types/globalTypes";
import { getMachineById } from "../types/getMachineById";
import { getMachines } from "../types/getMachines";
import { GET_MACHINES } from "../common/graphql/queries/machines";
import { Link } from "react-router-dom";
import ColourKey from "../components/ColourKey";
import Error404 from "../components/ErrorMessage";
import { AddMachineModal } from "./modals/AddMachineModal";

const Profile: React.FC = () => {
    return (
        <IonPage>
            <Heading title="Industry 4.0" showBackButton={false} />

            <IonContent color="new"></IonContent>
        </IonPage>
    );
};

export default Profile;
