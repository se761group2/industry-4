import { IonButton, IonContent, IonFab, IonFabButton, IonIcon, IonPage, IonSpinner } from "@ionic/react";
import React, { useEffect, useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { getMachineById } from "../types/getMachineById";
import HealthContainer from "../components/HealthContainer";
import "./Page.css";
import Heading from "../components/Heading";
import { useParams } from "react-router";
import { GET_MACHINE_BY_ID } from "../common/graphql/queries/machines";
import Error404 from "../components/ErrorMessage";
import { ChangeNotificationsModal } from "./modals/ChangeNotificationsModal";
import { subscribeToMachine } from "../types/subscribeToMachine";
import { CREATE_USER, SUBSCRIBE_TO_MACHINE, UNSUBSCRIBE_FROM_MACHINE } from "../common/graphql/mutations/users";
import { GET_USER_BY_EMAIL } from "../common/graphql/queries/users";
import { unsubscribeFromMachine } from "../types/unsubscribeFromMachine";
import { useUserContext } from "../utils/useUserContext";
import { getUserByEmail } from "../types/getUserByEmail";
import { createUser } from "../types/createUser";
import { UPDATE_MACHINE } from "../common/graphql/mutations/machines";
import NotificationContainer from "../components/NotificationContainer";
import { add } from "ionicons/icons";
import { SensorModal } from "./modals/SensorModal";

const Sensors: React.FC = () => {
    const [addMachineOpen, setAddMachineOpen] = useState<boolean>(false);
    const [disabled, setDisabled] = useState(false);
    const { id } = useParams<{ id: string }>();
    const [updateMachine] = useMutation(UPDATE_MACHINE);
    const machine_data = useQuery<getMachineById>(GET_MACHINE_BY_ID, {
        variables: { id: id },
        pollInterval: 1000,
    });
    const sensors = machine_data.data?.machine?.sensors;
    const stringCompare = (a: string | null, b: string | null) => {
        if (a == b) return 0;
        if (a == "Critical") return -1;
        if (b == "Critical") return 1;
        if (a == "Moderate") return -1;
        if (b == "Moderate") return 1;
        if (a == "Nominal") return -1;
        if (b == "Nominal") return 1;
        return 0;
    };

    const [changeNotificationsOpen, setChangeNotificationsOpen] = useState(false);
    const userContext = useUserContext();
    const userEmail = userContext.user?.email;
    const userQuery = useQuery<getUserByEmail>(GET_USER_BY_EMAIL, {
        variables: { email: userEmail },
    });
    let userID = userQuery.data?.user_email?.id;
    const [createUserMutation] = useMutation<createUser>(CREATE_USER);

    const [isSubscribed, setSubscribed] = useState(
        userQuery.data?.user_email?.machinesMaintaining?.some(function (machine) {
            return String(machine?.id) == id;
        }),
    );

    let subButtonMessage: string;
    const [unsubscribeMutation] = useMutation<unsubscribeFromMachine>(UNSUBSCRIBE_FROM_MACHINE);
    const [subscribeMutation] = useMutation<subscribeToMachine>(SUBSCRIBE_TO_MACHINE);
    if (isSubscribed) {
        subButtonMessage = "Unsubscribe from Machine";
    } else {
        subButtonMessage = "Subscribe to Machine";
    }

    const handleSubscribe = async () => {
        // Used to stop button spamming
        if (disabled) {
            return;
        }
        setDisabled(true);

        if (!userID) {
            const newUser = await createUserMutation({
                variables: {
                    email: userEmail,
                },
            });
            userID = newUser.data?.createUser?.user?.id;
            setSubscribed(false);
        }

        if (isSubscribed) {
            const result = await unsubscribeMutation({
                variables: {
                    userID: userID,
                    machineID: id,
                },
            }).then(() => {
                setDisabled(false);
            });

            setSubscribed(false);
            subButtonMessage = "Subscribe to Machine";
        } else {
            const result = await subscribeMutation({
                variables: {
                    userID: userID,
                    machineID: id,
                },
            }).then(() => {
                setDisabled(false);
            });

            setSubscribed(true);
            subButtonMessage = "Unsubscribe from Machine";
        }
    };
    const userEmails = userQuery.data?.user_email?.emails;
    const [subscribedEmails, setSubscribedEmails] = useState(machine_data.data?.machine?.subscribers);

    useEffect(() => {
        setSubscribedEmails(machine_data.data?.machine?.subscribers);
    }, [machine_data]);

    const [unacknowledged, setUnacknowledged] = useState(
        machine_data.data?.machine?.notificationStatus == "Unacknowledged",
    );
    const [acknowledged, setAcknowledged] = useState(machine_data.data?.machine?.notificationStatus == "Acknowledged");

    useEffect(() => {
        setUnacknowledged(machine_data.data?.machine?.notificationStatus == "Unacknowledged");
        setAcknowledged(machine_data.data?.machine?.notificationStatus == "Acknowledged");
    }, [machine_data]);

    function handleAcknowledgement() {
        setUnacknowledged(false);
        setAcknowledged(true);
    }

    function handleFixing() {
        updateMachine({ variables: { id: id, input: { notificationStatus: "Working" } } });
        setAcknowledged(false);
    }

    return (
        <IonPage>
            <SensorModal open={addMachineOpen} setOpen={setAddMachineOpen} machineId={id} action="add" />
            {userEmails && subscribedEmails && (
                <ChangeNotificationsModal
                    open={changeNotificationsOpen}
                    setOpen={setChangeNotificationsOpen}
                    userEmails={userEmails}
                    subscribedEmails={subscribedEmails}
                    machineID={id}
                    setSubscribedEmails={setSubscribedEmails}
                />
            )}
            <Heading title={machine_data.data?.machine?.name} />
            <IonContent color="new">
                {machine_data.loading ? (
                    <div className="flex w-full h-full justify-center items-center">
                        <IonSpinner className="w-16 h-16" color="light" />
                    </div>
                ) : machine_data.data?.machine ? (
                    <>
                        <div className="download text-center">
                            <IonButton
                                shape="round"
                                color="light"
                                className="responsive-width text-lg normal-case m-4"
                                onClick={() => handleSubscribe()}
                            >
                                {subButtonMessage}
                            </IonButton>
                        </div>
                        {unacknowledged && (
                            <NotificationContainer
                                type={"Acknowledgement"}
                                handleAcknowledge={handleAcknowledgement}
                                handleFixed={handleFixing}
                            />
                        )}
                        {acknowledged && (
                            <NotificationContainer
                                type={"Fixed"}
                                handleAcknowledge={handleAcknowledgement}
                                handleFixed={handleFixing}
                            />
                        )}
                        <div className="pb-20">
                            {sensors && sensors.length > 0 ? (
                                sensors
                                    .slice()
                                    .sort((a, b) => stringCompare(a.healthStatus, b.healthStatus))
                                    .map((sensor) => (
                                        <HealthContainer
                                            name={sensor.name}
                                            value={sensor.sampleChunks.slice(-1)[0]?.samples.slice(-1)[0]?.value}
                                            health={sensor.healthStatus}
                                            machineId={id}
                                            id={sensor.id}
                                            key={sensor.id}
                                        />
                                    ))
                            ) : (
                                <Error404 message="There are no sensors for this machine" />
                            )}
                        </div>
                        <IonFab vertical="bottom" horizontal="center" slot="fixed">
                            <IonFabButton color="light" onClick={() => setAddMachineOpen(true)}>
                                <IonIcon icon={add} />
                            </IonFabButton>
                        </IonFab>
                    </>
                ) : (
                    <Error404 message="This machine does not exist" />
                )}
                <div className="flex justify-center pb-20">
                    <IonButton className="text-center" onClick={() => setChangeNotificationsOpen(true)}>
                        Change Notification Settings
                    </IonButton>
                </div>
            </IonContent>
        </IonPage>
    );
};

export default Sensors;
