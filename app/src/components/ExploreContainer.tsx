import React from "react";
import "./ExploreContainer.css";

interface ContainerProps {
    name: string;
}

const ExploreContainer: React.FC<ContainerProps> = ({ name }) => {
    return (
        <div className="container flex items-center justify-center bg-gray-300 h-full">
            <div className="shadow-xl bg-white max-w-sm px-16 py-4 rounded-full">
                <strong className="text-purple-700">{name}</strong>
                <p>
                    Explore{" "}
                    <a target="_blank" rel="noopener noreferrer" href="https://ionicframework.com/docs/components">
                        UI Components
                    </a>
                </p>
            </div>
        </div>
    );
};

export default ExploreContainer;
