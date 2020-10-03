import {
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
} from "@ionic/react";
import React, { useEffect, useState } from "react";
import { from, useMutation, useQuery } from "@apollo/client";
import { getMachineById } from "../types/getMachineById";
import { getMachines } from "../types/getMachines";
import HealthContainer from "../components/HealthContainer";
import "./Page.css";
import Heading from "../components/Heading";
import { Link } from "react-router-dom";
import { useParams } from "react-router";
import { GET_MACHINE_BY_ID, GET_MACHINES } from "../common/graphql/queries/machines";
import Error404 from "../components/ErrorMessage";
import { add } from "ionicons/icons";
import { ChangeNotificationsModal } from "./modals/ChangeNotificationsModal";
import { subscribeToMachine } from "../types/subscribeToMachine";
import { CREATE_USER, SUBSCRIBE_TO_MACHINE, UNSUBSCRIBE_FROM_MACHINE } from "../common/graphql/mutations/users";
import { GET_USER_BY_EMAIL, GET_USER_BY_ID } from "../common/graphql/queries/users";
import { unsubscribeFromMachine } from "../types/unsubscribeFromMachine";
import { useUserContext } from "../utils/useUserContext";
import { getUserByEmail } from "../types/getUserByEmail";
import { createUser } from "../types/createUser";
import { AddSensorModal } from "./modals/AddSensorModal";

const Sensors: React.FC = () => {
    const [addMachineOpen, setAddMachineOpen] = useState<boolean>(false);

    const { id } = useParams<{ id: string }>();
    const machine_data = useQuery<getMachineById>(GET_MACHINE_BY_ID, {
        variables: { id: id },
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

    let isSubscribed: boolean | null | undefined = null;

    isSubscribed = userQuery.data?.user_email?.machinesMaintaining?.some(function (machine) {
        console.log(String(machine?.id));
        console.log(id);
        return String(machine?.id) == id;
    });

    let subButtonMessage: string;
    const [unsubscribeMutation] = useMutation<unsubscribeFromMachine>(UNSUBSCRIBE_FROM_MACHINE);
    const [subscribeMutation] = useMutation<subscribeToMachine>(SUBSCRIBE_TO_MACHINE);
    if (isSubscribed) {
        subButtonMessage = "Unsubscribe from Machine";
    } else {
        subButtonMessage = "Subscribe to Machine";
    }

    const handleSubscribe = async () => {
        if (!userID) {
            const newUser = await createUserMutation({
                variables: {
                    email: userEmail,
                },
            });
            userID = newUser.data?.createUser?.user?.id;
            isSubscribed = false;
        }

        if (isSubscribed) {
            const result = await unsubscribeMutation({
                variables: {
                    userID: userID,
                    machineID: id,
                },
            });

            isSubscribed = false;
            subButtonMessage = "Subscribe to Machine";
        } else {
            const result = await subscribeMutation({
                variables: {
                    userID: userID,
                    machineID: id,
                },
            });

            isSubscribed = true;
            subButtonMessage = "Unsubscribe from Machine";
        }
    };
    const userEmails = userQuery.data?.user_email?.emails;
    const [subscribedEmails, setSubscribedEmails] = useState(machine_data.data?.machine?.subscribers);

    useEffect(() => {
        setSubscribedEmails(machine_data.data?.machine?.subscribers);
    }, [machine_data]);

    console.log(subscribedEmails);

    return (
        <IonPage>
            <AddSensorModal open={addMachineOpen} setOpen={setAddMachineOpen} machineId={id} />
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
                {machine_data.data?.machine ? (
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
                        <div className="pb-20">
                            {sensors ? (
                                sensors
                                    .slice()
                                    .sort((a, b) => stringCompare(a.healthStatus, b.healthStatus))
                                    .map((sensor) => (
                                        <div className="responsive-width grid grid-cols-1 m-auto p-3" key={sensor.id}>
                                            <Link to={`/machine/${id}/sensor/${sensor.id}`}>
                                                <div className="darken-on-hover">
                                                    <HealthContainer
                                                        name={sensor.name}
                                                        value={
                                                            sensor.sampleChunks.slice(-1)[0]?.samples.slice(-1)[0]
                                                                ?.value
                                                        }
                                                        health={sensor.healthStatus}
                                                    />
                                                </div>
                                            </Link>
                                        </div>
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
