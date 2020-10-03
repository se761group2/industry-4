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
    IonModal,
    IonList,
    IonInput,
    IonItem,
} from "@ionic/react";
import React, { useState } from "react";
import { useParams } from "react-router";
import MachineContainer from "../components/MachineContainer";
import "./Profile.css";
import { from, useQuery } from "@apollo/client";
import { add, ellipsisHorizontal, ellipsisVertical, personCircle, search, trash } from "ionicons/icons";
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
    const [showModal, setShowModal] = useState(false);
    const userContext = useUserContext();
    const [newEmail, setNewEmail] = useState("");
    const [emails, setEmails] = useState(["gmce822@aucklanduni.ac.nz", "georgeedwinmcerlean@gmail.com"]);

    function changeNewEmail(emailAddress) {
        setNewEmail(emailAddress);
    }

    function addNewEmail() {
        setEmails([...emails, newEmail]);
        setNewEmail("");
    }

    function removeEmail(index) {
        const removedEmail = emails[index];
        setEmails(
            emails.filter((email) => {
                return email != removedEmail;
            }),
        );
        console.log(emails);
    }

    return (
        <IonPage>
            <Heading title="Industry 4.0" showProfile={false} />

            <IonContent color="new">
                <div className="responsive-width mt-10 ml-auto mr-auto py-5 h-38 bg-white rounded-lg">
                    <div className="responsive-width m-auto items-center flex justify-center flex-col">
                        <IonAvatar className="w-32 h-32 ">
                            <img src={userContext.user?.photoURL || ""} />
                        </IonAvatar>
                        <p className="text-black mt-3">{userContext.user && userContext.user!.displayName}</p>
                        <p className="text-black">{userContext.user && userContext.user!.email}</p>
                    </div>
                </div>
                <div className="m-6">
                    <IonButton
                        className="responsive-width m-auto flex items-center justify-center"
                        onClick={() => setShowModal(true)}
                    >
                        Configure Email Addresses
                    </IonButton>
                </div>
                <IonModal onDidDismiss={() => setShowModal(false)} isOpen={showModal} cssClass="ion-modal">
                    <IonContent className="p-3 flex justify-center flex-col">
                        <div className="p-3 flex justify-center flex-col">
                            <IonList>
                                {emails.map((email, index) => (
                                    <IonItem key={index}>
                                        <IonInput className="ion-input" value={email}></IonInput>
                                        <IonButton className="remove-button pl-3" onClick={() => removeEmail(index)}>
                                            <IonIcon slot="icon-only" icon={trash} />
                                        </IonButton>
                                    </IonItem>
                                ))}
                                <IonItem>
                                    <IonInput
                                        className="ion-input"
                                        onIonChange={(e) => changeNewEmail((e.target as HTMLInputElement).value)}
                                        placeholder="Enter a new Email address"
                                        value={newEmail}
                                    ></IonInput>
                                    <IonButton className="remove-button pl-3" onClick={() => addNewEmail()}>
                                        <IonIcon slot="icon-only" icon={add} />
                                    </IonButton>
                                </IonItem>
                            </IonList>
                            <IonButton className="Justify" onClick={() => setShowModal(false)}>
                                Close Modal
                            </IonButton>
                        </div>
                    </IonContent>
                </IonModal>
            </IonContent>
        </IonPage>
    );
};

export default Profile;
