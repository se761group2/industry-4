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
import React, { useState } from "react";
import { from, useQuery } from "@apollo/client";
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

const Sensors: React.FC = () => {
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
    const [userEmails, setUserEmails] = useState(["gmce822@aucklanduni.ac.nz", "email@fake.com"]);
    const [subscribedEmails, setSubscribedEmails] = useState(["gmce822@aucklanduni.ac.nz", "happy@email.com"]);

    return (
        <IonPage>
            <ChangeNotificationsModal
                open={changeNotificationsOpen}
                setOpen={setChangeNotificationsOpen}
                userEmails={userEmails}
                subscribedEmails={subscribedEmails}
            />
            <Heading title={machine_data.data?.machine?.name} />
            <IonContent color="new">
                {machine_data.data?.machine ? (
                    <>
                        <div className="pb-5">
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
                            <IonFabButton color="light">
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
