import {
    IonAvatar,
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
import { useUserContext } from "../utils/useUserContext";

const Profile: React.FC = () => {
    const userContext = useUserContext();

    return (
        <IonPage>
            <Heading title="Industry 4.0" showProfile={false} />

            <IonContent color="new">
                <div className="responsive-width mt-10 ml-auto mr-auto py-5 h-38 bg-white rounded-lg">
                    <div className="responsive-width m-auto   items-center flex justify-center flex-col">
                        <IonAvatar className="w-32 h-32 ">
                            <img src={userContext.user?.photoURL || ""} />
                        </IonAvatar>
                        <p className="text-black mt-3">{userContext.user && userContext.user!.displayName}</p>
                        <p className="text-black">{userContext.user && userContext.user!.email}</p>
                    </div>
                </div>
            </IonContent>
        </IonPage>
    );
};

export default Profile;
