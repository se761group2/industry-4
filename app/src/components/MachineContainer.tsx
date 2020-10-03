import React, { useState } from "react";
import "./Component.css";
import { Status } from "../types/globalTypes";
import { statusColour } from "../common/StatusColour";
import { IonFab, IonFabButton, IonIcon } from "@ionic/react";
import { add, create } from "ionicons/icons";
import { Link } from "react-router-dom";
import { AddMachineModal } from "../pages/modals/AddMachineModal";

interface ContainerProps {
<<<<<<< HEAD
    name: string | undefined;
    health: Status | null | undefined;
    image: string | undefined;
=======
    name: string;
    health: Status | null;
    image: string;
    id: string;
>>>>>>> Pass in machine id to machines component
}

const MachineContainer: React.FC<ContainerProps> = ({ name, health, image, id }) => {
    const bg: string = statusColour(health);
    const [addMachineOpen, setAddMachineOpen] = useState<boolean>(false);

    return (
        <div>
            <AddMachineModal open={addMachineOpen} setOpen={setAddMachineOpen} />
            <IonFabButton color="light" className="absolute m-5" onClick={() => setAddMachineOpen(true)}>
                <IonIcon icon={create} />
            </IonFabButton>
            <Link to={`/machine`}>
                <div className={`machine-container-1 rounded-lg shadow-xl m-auto bg-${bg}-550`}>
                    <div className={"machine-container-2 rounded flex flex-col justify-between text-center bg-white"}>
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
