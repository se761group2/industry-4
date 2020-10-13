import {
    IonAvatar,
    IonButton,
    IonContent,
    IonIcon,
    IonPage,
    IonModal,
    IonList,
    IonInput,
    IonItem,
    IonGrid,
    IonCol,
    IonRow,
} from "@ionic/react";
import React, { useEffect, useState } from "react";
import "./Profile.css";
import { useMutation, useQuery } from "@apollo/client";
import { add, trash } from "ionicons/icons";
import Heading from "../components/Heading";
import { useUserContext } from "../utils/useUserContext";
import { UPDATE_USER_EMAILS } from "../common/graphql/mutations/users";
import { getUserByEmail } from "../types/getUserByEmail";
import { GET_USER_BY_EMAIL } from "../common/graphql/queries/users";

const Profile: React.FC = () => {
    const [showModal, setShowModal] = useState(false);
    const userContext = useUserContext();
    const [newEmail, setNewEmail] = useState("");
    const [updateUserEmails] = useMutation(UPDATE_USER_EMAILS);
    const userEmail = userContext.user?.email;
    const userQuery = useQuery<getUserByEmail>(GET_USER_BY_EMAIL, {
        variables: { email: userEmail },
    });

    const [emails, setEmails] = useState(userQuery.data?.user_email?.emails!);

    const userID = userQuery.data?.user_email?.id;

    useEffect(() => {
        setEmails(userQuery.data?.user_email?.emails!);
    }, [userQuery]);

    console.log(userQuery.data?.user_email);
    console.log(emails);

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

    function saveEmailChanges() {
        updateUserEmails({ variables: { userID: userID, emails: emails } });
        setShowModal(false);
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
                        className="responsive-width m-auto flex items-center justify-center profile-ion-button"
                        onClick={() => setShowModal(true)}
                    >
                        Configure Email Addresses
                    </IonButton>
                </div>
                {emails && (
                    <IonModal
                        backdrop-dismis
                        backdropDismiss={true}
                        onDidDismiss={() => setShowModal(false)}
                        isOpen={showModal}
                        cssClass="profile-ion-modal"
                    >
                        <IonContent className="p-3 flex justify-center flex-col">
                            <div className="p-3 flex justify-center flex-col">
                                <IonList>
                                    {emails.map((email, index) => (
                                        <IonItem key={index}>
                                            <IonInput className="profile-ion-input" value={email}></IonInput>
                                            <IonButton
                                                className="remove-button pl-3"
                                                onClick={() => removeEmail(index)}
                                            >
                                                <IonIcon slot="icon-only" icon={trash} />
                                            </IonButton>
                                        </IonItem>
                                    ))}
                                    <IonItem>
                                        <IonInput
                                            className="profile-ion-input"
                                            onIonChange={(e) => changeNewEmail((e.target as HTMLInputElement).value)}
                                            placeholder="Enter a new Email address"
                                            value={newEmail}
                                        ></IonInput>
                                        <IonButton className="remove-button pl-3" onClick={() => addNewEmail()}>
                                            <IonIcon slot="icon-only" icon={add} />
                                        </IonButton>
                                    </IonItem>
                                </IonList>
                            </div>
                            <IonGrid>
                                <IonRow>
                                    <IonCol col-6>
                                        <div className="flex justify-center">
                                            <IonButton
                                                className="profile-ion-button"
                                                onClick={() => setShowModal(false)}
                                            >
                                                Cancel
                                            </IonButton>
                                        </div>
                                    </IonCol>
                                    <IonCol col-6>
                                        <div className="flex justify-center">
                                            <IonButton
                                                className="profile-ion-button"
                                                onClick={() => saveEmailChanges()}
                                            >
                                                Save
                                            </IonButton>
                                        </div>
                                    </IonCol>
                                </IonRow>
                            </IonGrid>
                        </IonContent>
                    </IonModal>
                )}
            </IonContent>
        </IonPage>
    );
};

export default Profile;
