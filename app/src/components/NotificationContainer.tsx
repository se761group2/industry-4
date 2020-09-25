import React from "react";

interface ContainerProps {
    type: string;
    handleAcknowledge: any;
    handleFixed: any;
}

const NotificationContainer: React.FC<ContainerProps> = ({ type, handleAcknowledge, handleFixed }) => {
    return (
        <div className="flex justify-center text-white m-1 break-words pre">
            <div className="text-center rounded-lg shadow-xl text-lg responsive-width m-6 bg-white pre">
                {type == "Acknowledgement" && (
                    <>
                        <div className="text-left text-black float-left m-2 ml-4 break-words pre">
                            This sensor has crossed its threshold indicating the machine needs servicing.
                        </div>
                        <button className="text-center text-black float-none m-2 mr-4" onClick={handleAcknowledge}>
                            Acknowledge
                        </button>
                    </>
                )}
                {type == "Fixed" && (
                    <>
                        <div className="text-left text-black float-left m-2 ml-4 break-words">
                            This machine/sensor is currently malfunctioning please fix the machine then mark it as fixed
                            to turn notifications back on.
                        </div>
                        <button className="text-right text-black float-right m-2 mr-4" onClick={handleFixed}>
                            Mark as Fixed
                        </button>
                    </>
                )}
            </div>
        </div>
    );
};

export default NotificationContainer;
