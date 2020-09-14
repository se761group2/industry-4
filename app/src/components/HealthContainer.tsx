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
        <div
            className="rounded-lg shadow-xl font-bold text-lg"
            style={{ background: bg, maxWidth: "600px", width: "44%", height: "40px", margin: "25px auto" }}
        >
            <div
                className="truncate text-left text-black float-left"
                style={{ marginLeft: "15px", marginTop: "5px", marginBottom: "5px" }}
            >
                {name}
            </div>
            <div
                className="text-right text-black float-right"
                style={{ marginRight: "15px", marginTop: "5px", marginBottom: "5px" }}
            >
                {value}
            </div>
        </div>
    );
};

export default HealthContainer;
