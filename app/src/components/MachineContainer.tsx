import React from "react";
import "./Component.css";
import { Status } from "../types/globalTypes";
import { statusColour } from "../common/StatusColour";

interface ContainerProps {
    name: string | undefined;
    health: Status | null | undefined;
    image: string | undefined;
}

const MachineContainer: React.FC<ContainerProps> = ({ name, health, image }) => {
    const bg: string = statusColour(health);

    if (!image) {
        image = undefined;
        // image = images[Math.floor(Math.random() * images.length)];
    }

    return (
        <div className={`machine-container-1 rounded-lg shadow-xl m-auto bg-${bg}-550 darken-on-hover`}>
            <div className={"machine-container-2 rounded flex flex-col justify-between text-center bg-white"}>
                <img className="machine-image rounded" src={image} alt="Machine image" />
                <div className="text-black font-bold text-lg">{name}</div>
            </div>
        </div>
    );
};

export default MachineContainer;
