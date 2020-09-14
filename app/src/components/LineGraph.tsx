import React from "react";
import "./ExploreContainer.css";
import { CartesianGrid, DotProps, Legend, Line, LineChart, Tooltip, XAxis, YAxis } from "recharts";

type CustomDotProps = DotProps & { value?: number; redThreshold: number; yellowThreshold: number };

const DotType: React.FC<CustomDotProps> = (props: CustomDotProps) => {
    const { cx, cy, value, redThreshold, yellowThreshold } = props;

    if (value && value > redThreshold) {
        return (
            <svg x={(cx || 0) - 10} y={(cy || 0) - 14} height="20" width="20">
                <polygon points="10,0 20,20 0,20" style={{ fill: "red" }} />
                <text fill="#ffffff" fontSize="12" fontFamily="Verdana" x="8" y="17">
                    !
                </text>
            </svg>
        );
    }

    if (value && value > yellowThreshold) {
        return (
            <svg x={(cx || 0) - 10} y={(cy || 0) - 14} height="20" width="20">
                <polygon points="10,0 20,20 0,20" style={{ fill: "orange" }} />
                <text fill="#ffffff" fontSize="12" fontFamily="Verdana" x="8" y="17">
                    !
                </text>
            </svg>
        );
    }

    return (
        <svg x={(cx || 0) - 10} y={(cy || 0) - 10} width={20} height={20}>
            <circle cx="10" cy="10" r="6" stroke="#8884df" strokeWidth="2" fill="white" />
        </svg>
    );
};

interface LineGraphProps {
    title: string;
    data: { name: string; value: number }[];
    redThreshold: number;
    yellowThreshold: number;
}

const LineGraph: React.FC<LineGraphProps> = ({ title, data, redThreshold, yellowThreshold }) => {
    return (
        <div className="container flex items-center justify-center">
            <div className="bg-white pt-4 pb-4">
                <h1 className="text-xl leading-normal">{title}</h1>
                {/* <br></br> */}
                <LineChart width={600} height={300} data={data} margin={{ top: 20, right: 30, bottom: 5, left: 0 }}>
                    <Line
                        type="monotone"
                        dataKey="value"
                        stroke="#8884df"
                        isAnimationActive={false} // allows hollow dots to appear for unkown reason
                        activeDot={{ r: 8 }}
                        dot={<DotType redThreshold={redThreshold} yellowThreshold={yellowThreshold} />}
                    />
                    <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                </LineChart>
            </div>
        </div>
    );
};

export default LineGraph;
