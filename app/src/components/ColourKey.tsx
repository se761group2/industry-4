import React from "react";
import "./Component.css";
import { statusColour } from "../common/StatusColour";

const ColourKey: React.FC = () => {
    const statuses: string[] = ["Nominal", "Moderate", "Critical"];
    let colour: string;
    return (
        <div className="flex flex-row justify-evenly m-auto">
            {statuses?.map(function (status) {
                colour = statusColour(status);
                return (
                    <div key={colour} className="flex flex-col text-center">
                        <div className="m-auto">
                            <div className={`square bg-${colour}-550`} />
                        </div>
                        {status}
                    </div>
                );
            })}
        </div>
    );
};

export default ColourKey;
