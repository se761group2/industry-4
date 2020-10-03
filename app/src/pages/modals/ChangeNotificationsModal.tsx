import React, { useState } from "react";
import {
    IonButton,
    IonModal,
    IonContent,
    IonList,
    IonItem,
    IonLabel,
    IonCheckbox,
    IonHeader,
    IonTitle,
    IonListHeader,
    IonGrid,
    IonCol,
    IonRow,
} from "@ionic/react";
import "./ChangeNotificationsModal.css";

interface ModalProps {
    open: boolean;
    setOpen: (open: boolean) => void;
    userEmails: Array<string>;
    subscribedEmails: Array<string>;
}

export const ChangeNotificationsModal: React.FC<ModalProps> = ({ open, setOpen, userEmails, subscribedEmails }) => {
    const [selected, setSelected] = useState<Array<string>>(subscribedEmails);

    function isChecked(email: string): boolean {
        if (selected.includes(email)) {
            return true;
        } else {
            return false;
        }
    }

    function boxChecked(checkedEmail: string) {
        if (selected.includes(checkedEmail)) {
            setSelected(
                selected.filter((email) => {
                    return email != checkedEmail;
                }),
            );
        } else {
            setSelected([...selected, checkedEmail]);
        }
        console.log(selected);
    }

    return (
        <IonModal isOpen={open} onDidDismiss={() => setOpen(false)} cssClass="notification-ion-modal">
            <IonContent className="p-3 flex justify-center flex-col">
                <div className="p-3 flex justify-center flex-col">
                    <IonListHeader>
                        <IonLabel className="text-lg">Select Emails to Notify</IonLabel>
                    </IonListHeader>
                    <IonList>
                        {userEmails &&
                            userEmails.map((email, index) => (
                                <IonItem key={index} className="notification-ion-item">
                                    <IonLabel>{email}</IonLabel>
                                    {isChecked(email) ? (
                                        <IonCheckbox onIonChange={(e) => boxChecked(email)} checked></IonCheckbox>
                                    ) : (
                                        <IonCheckbox onIonChange={(e) => boxChecked(email)}></IonCheckbox>
                                    )}
                                </IonItem>
                            ))}
                    </IonList>
                </div>
                <IonGrid>
                    <IonRow>
                        <IonCol col-6>
                            <div className="flex justify-center">
                                <IonButton className="notification-ion-button">Cancel</IonButton>
                            </div>
                        </IonCol>
                        <IonCol col-6>
                            <div className="flex justify-center">
                                <IonButton className="notification-ion-button">Save</IonButton>
                            </div>
                        </IonCol>
                    </IonRow>
                </IonGrid>
            </IonContent>
        </IonModal>
    );
};
