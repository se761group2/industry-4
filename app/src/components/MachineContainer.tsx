import React from "react";
import "./Component.css";
import img1 from "../images/1.jpg";
import img2 from "../images/2.jpg";
import img3 from "../images/3.jpg";
import img4 from "../images/4.jpg";
import img5 from "../images/5.jpg";
import { Status } from "../types/globalTypes";

interface ContainerProps {
    name: string;
    health: Status | null;
    image: string;
}

const MachineContainer: React.FC<ContainerProps> = ({ name, health, image }) => {
    let bg: string;
    if (health == "Nominal") {
        bg = "green";
    } else if (health == "Moderate") {
        bg = "yellow";
    } else {
        bg = "red";
    }

    const images: string[] = [img1, img2, img3, img4, img5];
    if (image == "random") {
        image = images[Math.floor(Math.random() * images.length)];
    }

    return (
        <div className={`container-1 rounded-lg shadow-xl m-auto bg-${bg}-550`}>
            <div className={"container-2 rounded flex flex-col justify-between text-center bg-white"}>
                <img className="machine-image rounded" src={image} alt="Machine image" />
                <div className="text-black font-bold text-lg">{name}</div>
            </div>
        </div>
    );
};

export default MachineContainer;
