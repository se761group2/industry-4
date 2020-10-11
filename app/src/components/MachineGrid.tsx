import { render } from "react-dom";
import React from "react";
import { Link } from "react-router-dom";
import { getMachines_machines } from "../types/getMachines";
import MachineContainer from "./MachineContainer";
import Error404 from "./ErrorMessage";

interface GridProps {
    allMachines: getMachines_machines[] | null | undefined;
    subscribedMachines: (getMachines_machines | null | undefined)[];
    showAll: boolean | null | undefined;
}

const MachineGrid: React.FC<GridProps> = ({ allMachines, subscribedMachines, showAll }) => {
    let machines: any[] | null | undefined;
    if (showAll) {
        machines = allMachines;
    } else {
        machines = subscribedMachines;
    }
    return (
        <div>
            {subscribedMachines.length > 0 || showAll ? (
                <div className="responsive-width grid grid-cols-2 gap-5 m-auto pb-20">
                    {machines?.map(function (machine) {
                        return (
                            <MachineContainer
                                key={machine.id}
                                name={machine.name}
                                health={machine.healthStatus}
                                image={machine.image}
                                id={machine.id}
                            />
                        );
                    })}
                </div>
            ) : (
                <Error404 message="You are not subscribed to any machines." />
            )}
        </div>
    );
};

export default MachineGrid;
