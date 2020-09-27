import React, { useContext, useState } from "react";
import {
    IonAlert,
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
import { ellipsisHorizontal, ellipsisVertical, logOut, personCircle, search } from "ionicons/icons";
import { useUserContext } from "../utils/useUserContext";
import { firebaseAuth } from "../services/firebase";

interface HeadingProps {
    title: string;
}

const Heading: React.FC<HeadingProps> = ({ title }) => {
    const userContext = useUserContext();
    const [showAlert, setShowAlert] = useState(false);

    return (
        <IonHeader>
            <IonAlert
                isOpen={showAlert}
                onDidDismiss={() => setShowAlert(false)}
                header={"Logout Confirmation"}
                message={"Are you sure you want to logout?"}
                buttons={[
                    {
                        text: "Cancel",
                        role: "cancel",
                        cssClass: "secondary",
                        handler: (blah) => {
                            setShowAlert(false);
                        },
                    },
                    {
                        text: "Okay",
                        handler: () => {
                            firebaseAuth.signOut();
                        },
                    },
                ]}
            />
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
                        <IonButton fill="clear" onClick={() => setShowAlert(true)}>
                            <IonIcon size="small" color="danger" slot="icon-only" icon={logOut} />
                        </IonButton>
                    </div>
                </div>
            </IonToolbar>
        </IonHeader>
    );
};

export default Heading;
