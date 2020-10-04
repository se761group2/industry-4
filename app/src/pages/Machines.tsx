import {
    IonBackButton,
    IonButton,
    IonButtons,
    IonContent,
    IonFab,
    IonFabButton,
    IonHeader,
    IonIcon,
    IonLabel,
    IonPage,
    IonSegment,
    IonSegmentButton,
    IonSpinner,
    IonTitle,
    IonToolbar,
} from "@ionic/react";
import React, { useState } from "react";
import { useParams } from "react-router";
import MachineContainer from "../components/MachineContainer";
import "./Page.css";
import { from, useQuery } from "@apollo/client";
import { add, ellipsisHorizontal, ellipsisVertical, personCircle, search } from "ionicons/icons";
import Heading from "../components/Heading";
import { Status } from "../types/globalTypes";
import { getMachineById, getMachineById_machine } from "../types/getMachineById";
import { getMachines, getMachines_machines } from "../types/getMachines";
import { GET_MACHINES, GET_MACHINE_BY_ID } from "../common/graphql/queries/machines";
import { Link } from "react-router-dom";
import ColourKey from "../components/ColourKey";
import Error404 from "../components/ErrorMessage";
import { AddMachineModal } from "./modals/AddMachineModal";
import { useUserContext } from "../utils/useUserContext";
import { GET_USER_BY_EMAIL } from "../common/graphql/queries/users";
import { getUserByEmail } from "../types/getUserByEmail";
import { render } from "react-dom";
import MachineGrid from "../components/MachineGrid";

const Machines: React.FC = () => {
    const machinesQuery = useQuery<getMachines>(GET_MACHINES);
    const [addMachineOpen, setAddMachineOpen] = useState<boolean>(false);
    const [showAll, setShow] = useState(false);
    const [selectedValue, setSelectedValue] = useState("subscribed");

    // sort machines by health status
    // (critical, moderate, nominal) happens to be alphabetical so currently just sorting alphabetically
    let allMachines = machinesQuery.data?.machines;
    allMachines = allMachines?.slice().sort((a, b) => (a.healthStatus! > b.healthStatus! ? 1 : -1));

    const userContext = useUserContext();
    const userEmail = userContext.user?.email;
    const userQuery = useQuery<getUserByEmail>(GET_USER_BY_EMAIL, {
        variables: { email: userEmail },
    });

    // const [subscribedMachineRefs, setSubscribedMachineRefs] = useState(userQuery.data?.user_email?.machinesMaintaining);
    let subscribedMachineRefs = userQuery.data?.user_email?.machinesMaintaining;

    // let subscribedMachines: (getMachines_machines | null | undefined)[] = [];

    const changeMachinesShown = (segment) => {
        setSelectedValue(String(segment));
        if (String(segment) == "all") {
            setShow(true);
        } else if (String(segment) == "subscribed") {
            setShow(false);
        }
    };

    const populateSubscribedMachines = () => {
        // populating subscribed machines array with the real data from the actual machines
        // since the reference obtained via the user only contains the ID data of the relevant machine
        userQuery.refetch();
        subscribedMachineRefs = userQuery.data?.user_email?.machinesMaintaining;
        const populatingArray: any[] = [];
        allMachines?.forEach(function (machine) {
            subscribedMachineRefs?.findIndex(function (subMachine) {
                if (subMachine && String(machine?.id) == String(subMachine?.id)) {
                    populatingArray.push(machine);
                }
            });
        });
        return populatingArray;
    };

    return (
        <IonPage>
            <AddMachineModal open={addMachineOpen} setOpen={setAddMachineOpen} setShow={setShow} showAll={showAll} />
            <Heading title="Industry 4.0" showBackButton={false} />

            <IonContent color="new">
                {machinesQuery.loading ? (
                    <div className="flex w-full h-full justify-center items-center">
                        <IonSpinner className="w-16 h-16" color="light" />
                    </div>
                ) : allMachines && allMachines.length > 0 ? (
                    <div>
                        <div className="responsive-width m-auto p-3">
                            <ColourKey />
                        </div>
                        <div className="py-3">
                            <IonSegment
                                mode="ios"
                                color="primary"
                                className="ion-segment"
                                onIonChange={(e) => changeMachinesShown(e.detail.value)}
                                value={selectedValue}
                            >
                                <IonSegmentButton className="ion-segment-button" value={"subscribed"}>
                                    <IonLabel color="dark">Subscribed Machines</IonLabel>
                                </IonSegmentButton>
                                <IonSegmentButton className="ion-segment-button" value={"all"}>
                                    <IonLabel color="dark">All Machines</IonLabel>
                                </IonSegmentButton>
                            </IonSegment>
                        </div>
                        <MachineGrid
                            allMachines={allMachines}
                            subscribedMachines={populateSubscribedMachines()}
                            showAll={showAll}
                        />
                    </div>
                ) : (
                    <Error404 message="There are no machines." />
                )}
                <IonFab vertical="bottom" horizontal="center" slot="fixed">
                    <IonFabButton color="light" onClick={() => setAddMachineOpen(true)}>
                        <IonIcon icon={add} />
                    </IonFabButton>
                </IonFab>
            </IonContent>
        </IonPage>
    );
};

export default Machines;
