import React, { useContext } from "react";
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
import { useUserContext } from "../utils/useUserContext";

interface HeadingProps {
    title: string;
}

const Heading: React.FC<HeadingProps> = ({ title }) => {
    const userContext = useUserContext();
    return (
        <IonHeader>
            <IonToolbar color="dark">
                <div className="w-full flex justify-between items-center">
                    <IonBackButton />
                    <div className="block">
                        <IonTitle className="text-center text-2xl font-heading">
                            {title ? title : "Industry 4.0"}
                        </IonTitle>
                    </div>
                    <div className="flex flex-row items-center">
                        <IonIcon slot="start" icon={personCircle} />
                        <p className="mx-2 hidden md:block">{userContext.user && userContext.user!.email}</p>
                    </div>
                </div>
            </IonToolbar>
        </IonHeader>
    );
};

export default Heading;
