import React, { useState } from "react";
import "./Component.css";
import { Status } from "../types/globalTypes";
import { statusColour } from "../common/StatusColour";
import { IonFabButton, IonIcon } from "@ionic/react";
import { create } from "ionicons/icons";
import { Link } from "react-router-dom";
import { MachineModal } from "../pages/modals/MachineModal";

interface ContainerProps {
    name: string;
    health: Status | null;
    image: string;
    id: string;
}

const MachineContainer: React.FC<ContainerProps> = ({ name, health, image, id }) => {
    const bg: string = statusColour(health);
    const [addMachineOpen, setAddMachineOpen] = useState<boolean>(false);
    const [showAll, setShow] = useState(true);

    const machineUpdateInput = {
        name: name,
        health: health,
        image: image,
    };

    return (
        <div>
            <MachineModal
                open={addMachineOpen}
                setOpen={setAddMachineOpen}
                setShow={setShow}
                action="update"
                id={id}
                machineUpdateInput={machineUpdateInput}
                showAll={true}
            />
            <IonFabButton
                color="light"
                className="absolute m-5 w-12 h-12 darken-on-hover"
                onClick={() => setAddMachineOpen(true)}
            >
                <IonIcon icon={create} />
            </IonFabButton>
            <Link to={`/machine/${id}`}>
                <div className={`h-full p-3 rounded-lg shadow-xl m-auto bg-${bg}-550`}>
                    <div className={"w-full h-full p-3 rounded flex flex-col justify-between text-center bg-white"}>
                        <img className="machine-image rounded" src={image} alt="Machine image" />
                        <div>
                            <div className="text-black font-bold text-lg mt-3">{name}</div>
                        </div>
                    </div>
                </div>
            </Link>
        </div>
    );
};

export default MachineContainer;
