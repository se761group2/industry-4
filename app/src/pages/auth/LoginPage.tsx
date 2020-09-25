import { IonContent, IonPage } from "@ionic/react";
import firebase from "firebase";
import React from "react";
import { StyledFirebaseAuth } from "react-firebaseui";

const uiConfig: firebaseui.auth.Config = {
    signInFlow: "popup",
    callbacks: {
        signInSuccessWithAuthResult: (authResult) => {
            console.log(authResult);

            return true;
        },
    },
    signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID],
    signInSuccessUrl: "/",
};

export const LoginPage: React.FC<any> = () => {
    console.log("Rendering page");
    return (
        <IonPage>
            <IonContent>
                <div className="bg-gray-400 h-full w-full items-center flex justify-center flex-col">
                    <h1 className="text-3xl font-bold my-4">Industry 4.0</h1>
                    <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
                </div>
            </IonContent>
        </IonPage>
    );
};
