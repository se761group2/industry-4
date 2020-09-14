import React from "react";
import "./HealthContainer.css";

interface ContainerProps {
    name: string;
    value: number;
    threshold: number;
}

const HealthContainer: React.FC<ContainerProps> = ({ name, value, threshold }) => {
    let bg: string;
    if (value < threshold * 0.95) {
        // green
        bg = "#91bd3a";
    } else if (value <= threshold) {
        // orange
        bg = "#f5a31a";
    } else {
        // red
        bg = "#d32626";
    }
    return (
        <div className="container mx-auto flex items-center justify-center">
            <div className="w-4/5 max-w-md px-5 py-4 rounded-lg shadow-xl font-bold" style={{ background: bg }}>
                <div className="w-3/4 truncate text-left text-black float-left">{name}</div>
                <div className="text-right text-black float-right">{value}</div>
            </div>
        </div>
    );
};

export default HealthContainer;
