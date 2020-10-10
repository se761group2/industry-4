import React, { useState } from "react";
import "./Component.css";
import { statusColour } from "../common/StatusColour";
import { Link } from "react-router-dom";
import { IonButton, IonFabButton, IonIcon } from "@ionic/react";
import { create } from "ionicons/icons";
import { SensorModal } from "../pages/modals/SensorModal";

interface ContainerProps {
    name: string | undefined;
    value: number | undefined | null;
    health: string | undefined | null;
    machineId: string;
    id: string;
}

const HealthContainer: React.FC<ContainerProps> = ({ name, value, health, machineId, id }) => {
    const [updateSensorOpen, setUpdateSensorOpen] = useState<boolean>(false);
    const bg: string = statusColour(health);
    return (
        <div className="responsive-width grid grid-cols-1 m-auto p-3">
            <SensorModal
                open={updateSensorOpen}
                setOpen={setUpdateSensorOpen}
                machineId={machineId}
                action="update"
                name={name}
                id={id}
            />
            <button
                className={`absolute ml-2 mt-1 mb-2 bg-${bg}-550 darken-on-hover`}
                onClick={() => setUpdateSensorOpen(true)}
            >
                <IonIcon color="dark" icon={create} className="h-8 w-8 shadow-none  " />
            </button>
            <Link to={`/machine/${machineId}/sensor/${id}`}>
                <div className={`health-container-1 rounded-lg shadow-xl font-bold text-lg m-auto bg-${bg}-550`}>
                    <div className="truncate text-left text-black float-left m-auto ml-12">{name && name}</div>
                    <div className="text-right text-black float-right m-auto mr-4">{value ? value : "unknown"}</div>
                </div>
            </Link>
        </div>
    );
};

export default HealthContainer;
