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
import { arrowBack, ellipsisHorizontal, ellipsisVertical, logOut, personCircle, search } from "ionicons/icons";
import { useUserContext } from "../utils/useUserContext";
import { firebaseAuth } from "../services/firebase";
import { useHistory } from "react-router";

interface HeadingProps {
    title: string | null | undefined;
    showBackButton?: boolean;
}

const Heading: React.FC<HeadingProps> = ({ title, showBackButton = true }) => {
    const userContext = useUserContext();
    const [showAlert, setShowAlert] = useState(false);
    const history = useHistory();

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
                <div className="w-full flex  items-center">
                    <IonButton
                        fill="clear"
                        onClick={() => history.goBack()}
                        className={!showBackButton ? "hidden" : ""}
                        color="light"
                    >
                        <IonIcon slot="icon-only" icon={arrowBack}></IonIcon>
                    </IonButton>
                    <div className="block flex-grow">
                        <link href="https://fonts.googleapis.com/css?family=Share Tech Mono" rel="stylesheet"></link>
                        <IonTitle className="text-2xl font-heading">{title ? title : "Industry 4.0"}</IonTitle>
                    </div>
                    <div className="flex flex-row justify-self-end items-center">
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
