import React from "react";
import { statusColour } from "../common/StatusColour";

interface ContainerProps {
    name: string;
    value: number | undefined | null;
    health: string | undefined | null;
}

const HealthContainer: React.FC<ContainerProps> = ({ name, value, health }) => {
    const bg: string = statusColour(health);
    return (
        <div className="flex justify-center text-black">
            <div className={`rounded-lg shadow-xl font-bold text-lg responsive-width m-4  bg-${bg}-550`}>
                <div className="truncate text-left text-black float-left m-2 ml-4">{name}</div>
                <div className="text-right text-black float-right m-2 mr-4">{value ? value : "unknown"}</div>
            </div>
        </div>
    );
};

export default HealthContainer;
