import React from "react";

interface ContainerProps {
    name: string;
    value: number;
    threshold: number;
}

const HealthContainer: React.FC<ContainerProps> = ({ name, value, threshold }) => {
    let bg: string;
    if (value < threshold * 0.95) {
        bg = "green";
    } else if (value <= threshold) {
        bg = "yellow";
    } else {
        bg = "red";
    }
    return (
        <div className="flex w-full text-black">
            <div className={`rounded-lg shadow-xl font-bold text-lg w-full flex-grow bg-${bg}-550`}>
                <div className="truncate text-left text-black float-left m-2 ml-4">{name}</div>
                <div className="text-right text-black float-right m-2 mr-4">{value}</div>
            </div>
        </div>
    );
};

export default HealthContainer;
