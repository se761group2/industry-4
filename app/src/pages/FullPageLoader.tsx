import { IonSpinner, IonPage } from "@ionic/react";
import React from "react";

export const FullPageLoader: React.FC = () => {
    return (
        <IonPage>
            <div className=" new  flex w-full h-full items-center justify-center">
                <div className="flex-grow-0 flex">
                    <IonSpinner className=" text-gray-100 w-20 h-20 place-self-center align-middle" />
                </div>
            </div>
        </IonPage>
    );
};
