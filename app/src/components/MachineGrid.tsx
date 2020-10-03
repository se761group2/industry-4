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
            {subscribedMachines.length || showAll ? (
                <div className="responsive-width grid grid-cols-2 gap-5 m-auto pb-20">
                    {machines?.map(function (machine) {
                        return (
                            <Link to={`/machine/${machine?.id}`} key={machine?.id}>
                                <MachineContainer
                                    name={machine?.name}
                                    health={machine?.healthStatus}
                                    image={machine?.image || "random"} // random is a placeholder right now, as not all machines have images
                                />
                            </Link>
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
