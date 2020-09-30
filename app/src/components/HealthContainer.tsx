import React from "react";
import "./Component.css";
import { statusColour } from "../common/StatusColour";

interface ContainerProps {
    name: string | undefined;
    value: number | undefined | null;
    health: string | undefined | null;
}

const HealthContainer: React.FC<ContainerProps> = ({ name, value, health }) => {
    const bg: string = statusColour(health);
    return (
        <div className={`health-container-1 rounded-lg shadow-xl font-bold text-lg m-auto bg-${bg}-550`}>
            <div className="truncate text-left text-black float-left m-auto ml-4">{name && name}</div>
            <div className="text-right text-black float-right m-auto mr-4">{value ? value : "unknown"}</div>
        </div>
    );
};

export default HealthContainer;
