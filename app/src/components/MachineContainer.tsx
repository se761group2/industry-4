import React from "react";

interface ContainerProps {
    name: string;
    health: number;
}

const MachineContainer: React.FC<ContainerProps> = ({ name, health }) => {
    let bg: string;
    // health background colour
    if (health == 1) {
        bg = "green";
    } else if (health == 2) {
        bg = "yellow";
    } else {
        bg = "red";
    }

    //
    return (
        <div className="flex justify-center text-black">
            <div className={`rounded-lg shadow-xl font-bold text-lg responsive-width m-6 bg-${bg}-550`}>
                <div className={"flex justify-center w-2/3 bg-white"}>
                    <div className="truncate text-left text-black float-left m-2 ml-4">{name}</div>
                </div>
            </div>
        </div>
    );
};

export default MachineContainer;
