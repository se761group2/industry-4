import React from "react";
import "./Component.css";
import img1 from "../images/1.jpg";
import img2 from "../images/2.jpg";
import img3 from "../images/3.jpg";
import img4 from "../images/4.jpg";
import img5 from "../images/5.jpg";
import { Status } from "../types/globalTypes";
import { statusColour } from "../common/StatusColour";

interface ContainerProps {
    name: string | undefined;
    health: Status | null | undefined;
    image: string | undefined;
}

const MachineContainer: React.FC<ContainerProps> = ({ name, health, image }) => {
    const bg: string = statusColour(health);

    const images: string[] = [img1, img2, img3, img4, img5];
    if (image == "random") {
        image = images[Math.floor(Math.random() * images.length)];
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
