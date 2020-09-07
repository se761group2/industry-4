import React from "react";
import "./ExploreContainer.css";

interface ContainerProps {
    name: string;
}

const ExploreContainer: React.FC<ContainerProps> = ({ name }) => {
    return (
        <div className="container bg-gray-400 h-full flex items-center justify-center">
            <div className="bg-white max-w-sm px-16 py-4 rounded-full shadow-xl">
                <strong className="text-purple-600">{name}</strong>
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
