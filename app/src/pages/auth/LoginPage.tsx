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
                <div className="bg-gray-900 h-full w-full items-center flex justify-center flex-col">
                    <div className="text-center my-4">
                        <h1 className="text-4xl text-gray-100 font-bold ">Industry 4.0</h1>
                        <h2 className="text-2xl text-gray-300">
                            <em>Monitor your machines like never before.</em>
                        </h2>
                    </div>
                    <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
                </div>
            </IonContent>
        </IonPage>
    );
};
