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
import { UPDATE_MACHINE } from "../../common/graphql/mutations/machines";
import { useMutation } from "@apollo/client";

interface ModalProps {
    open: boolean;
    setOpen: (open: boolean) => void;
    userEmails: Array<string | null>;
    subscribedEmails: Array<string | null>;
    machineID: any;
    setSubscribedEmails: any;
}

export const ChangeNotificationsModal: React.FC<ModalProps> = ({
    open,
    setOpen,
    userEmails,
    subscribedEmails,
    machineID,
    setSubscribedEmails,
}) => {
    const [selected, setSelected] = useState<Array<string | null>>(subscribedEmails);
    const [updateMachine] = useMutation(UPDATE_MACHINE);

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

    function saveSubscribedEmails() {
        updateMachine({ variables: { id: machineID, input: { subscribers: selected } } });
        setSubscribedEmails(selected);
        setOpen(false);
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
                            userEmails.map(
                                (email, index) =>
                                    email && (
                                        <IonItem key={index} className="notification-ion-item">
                                            <IonLabel>{email}</IonLabel>
                                            {isChecked(email) ? (
                                                <IonCheckbox
                                                    onIonChange={(e) => boxChecked(email)}
                                                    checked
                                                ></IonCheckbox>
                                            ) : (
                                                <IonCheckbox onIonChange={(e) => boxChecked(email)}></IonCheckbox>
                                            )}
                                        </IonItem>
                                    ),
                            )}
                    </IonList>
                </div>
                <IonGrid>
                    <IonRow>
                        <IonCol col-6>
                            <div className="flex justify-center">
                                <IonButton className="notification-ion-button" onClick={() => setOpen(false)}>
                                    Cancel
                                </IonButton>
                            </div>
                        </IonCol>
                        <IonCol col-6>
                            <div className="flex justify-center">
                                <IonButton className="notification-ion-button" onClick={() => saveSubscribedEmails()}>
                                    Save
                                </IonButton>
                            </div>
                        </IonCol>
                    </IonRow>
                </IonGrid>
            </IonContent>
        </IonModal>
    );
};
