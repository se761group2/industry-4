import { IonContent, IonPage, IonTitle } from "@ionic/react";
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
    return (
        <IonPage>
            <IonContent color="new">
                <div className=" h-full w-full items-center flex justify-center flex-col">
                    <div className="text-center my-4">
                        <link href="https://fonts.googleapis.com/css?family=Share Tech Mono" rel="stylesheet"></link>
                        <IonTitle className="text-5xl font-heading">Industry 4.0</IonTitle>
                        <h2 className="text-2xl text-gray-300 font-heading">
                            Monitor your machines like never before.
                        </h2>
                    </div>
                    <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
                </div>
            </IonContent>
        </IonPage>
    );
};
