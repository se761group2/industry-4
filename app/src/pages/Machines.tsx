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
import { useParams } from "react-router";
import MachineContainer from "../components/MachineContainer";
import "./Page.css";
import { from, useQuery } from "@apollo/client";
import { add, ellipsisHorizontal, ellipsisVertical, personCircle, search } from "ionicons/icons";
import Heading from "../components/Heading";
import { Status } from "../types/globalTypes";
import { getMachineById } from "../types/getMachineById";
import { getMachines } from "../types/getMachines";
import { GET_MACHINES } from "../common/graphql/queries/machines";
import { Link } from "react-router-dom";
import ColourKey from "../components/ColourKey";
import Error404 from "../components/ErrorMessage";
import { AddMachineModal } from "./modals/AddMachineModal";

const Machines: React.FC = () => {
    const machinesQuery = useQuery<getMachines>(GET_MACHINES);
    const [addMachineOpen, setAddMachineOpen] = useState<boolean>(false);
    // sort machines by health status
    // (critcal, moderate, nominal) happens to be alphabetical so currently just sorting alphabetically
    let machines = machinesQuery.data?.machines;
    machines = machines?.slice().sort((a, b) => (a.healthStatus! > b.healthStatus! ? 1 : -1));

    return (
        <IonPage>
            <AddMachineModal open={addMachineOpen} setOpen={setAddMachineOpen} />
            <Heading title="Industry 4.0" showBackButton={false} />

            <IonContent color="new">
                {machines ? (
                    <>
                        <div className="responsive-width m-auto p-3">
                            <ColourKey>Key</ColourKey>
                        </div>
                        <div className="responsive-width grid grid-cols-2 gap-5 m-auto pb-3">
                            {machines?.map(function (machine) {
                                return (
                                    <Link to={`/machine/${machine.id}`} key={machine.id}>
                                        <MachineContainer
                                            name={machine.name}
                                            health={machine.healthStatus}
                                            image={"random"}
                                        />
                                    </Link>
                                );
                            })}
                        </div>
                    </>
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
