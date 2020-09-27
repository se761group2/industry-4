import React from "react";

interface ContainerProps {
    name: string | undefined;
    value: number | undefined | null;
    health: string | undefined | null;
}

const HealthContainer: React.FC<ContainerProps> = ({ name, value, health }) => {
    let bg: string;
    if (health == "Nominal") {
        bg = "green";
    } else if (health == "Moderate") {
        bg = "yellow";
    } else if (health == "Critical") {
        bg = "red";
    } else {
        bg = "grey";
    }
    return (
        <div className="flex justify-center text-black">
            <div
                className={`rounded-lg shadow-xl font-bold text-lg responsive-width m-4 bg-${bg}-550`}
                // style={{ backgroundColor: "#bbbbbb" }}
            >
                <div className="truncate text-left text-black float-left m-2 ml-4">{name && name}</div>
                <div className="text-right text-black float-right m-2 mr-4">{value ? value : "unknown"}</div>
            </div>
        </div>
    );
};

export default HealthContainer;
