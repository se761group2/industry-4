import React from "react";
import "./Component.css";
import { Status } from "../types/globalTypes";
import { statusColour } from "../common/StatusColour";
import { IonFab, IonFabButton, IonIcon } from "@ionic/react";
import { add, create } from "ionicons/icons";

interface ContainerProps {
    name: string | undefined;
    health: Status | null | undefined;
    image: string | undefined;
}

const MachineContainer: React.FC<ContainerProps> = ({ name, health, image }) => {
    const bg: string = statusColour(health);

    return (
        <div className={`machine-container-1 rounded-lg shadow-xl m-auto bg-${bg}-550 darken-on-hover`}>
            <div className={"machine-container-2 rounded flex flex-col justify-between text-center bg-white"}>
                <img className="machine-image rounded" src={image} alt="Machine image" />
                <div>
                    <div className="text-black font-bold text-lg mt-3">{name}</div>
                    <IonFabButton color="light" className="mr-auto ml-auto mt-5 mb-3" onClick={() => alert("hello")}>
                        <IonIcon icon={create} />
                    </IonFabButton>
                </div>
            </div>
        </div>
    );
};

export default MachineContainer;
