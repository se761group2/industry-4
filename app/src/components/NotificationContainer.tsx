import React from "react";

interface ContainerProps {
    type: string;
    handleAcknowledge: any;
    handleFixed: any;
}

const NotificationContainer: React.FC<ContainerProps> = ({ type, handleAcknowledge, handleFixed }) => {
    return (
        <div className="flex justify-center text-white m-1 break-words pre">
            <div className="text-center rounded-lg shadow-xl text-lg responsive-width m-6 bg-white pre border-4 border-red-500">
                {type == "Acknowledgement" && (
                    <>
                        <div className="text-left text-black float-left m-2 ml-4 break-words pre">
                            This sensor has crossed its threshold indicating the machine needs servicing.
                        </div>
                        <button
                            className="bg-red-500 hover:bg-red-700 text-white font-bold mb-3 py-2 px-4 rounded"
                            onClick={handleAcknowledge}
                        >
                            Acknowledge
                        </button>
                    </>
                )}
                {type == "Fixed" && (
                    <>
                        <div className="text-left text-black float-left m-2 ml-4 break-words pre">
                            This machine is malfunctioning. Please fix the machine then indicate below that it has been
                            fixed to turn notifications back on.
                        </div>
                        <button
                            className="bg-red-500 hover:bg-red-700 text-white font-bold mb-3 py-2 px-4 rounded"
                            onClick={handleFixed}
                        >
                            Mark as Fixed
                        </button>
                    </>
                )}
            </div>
        </div>
    );
};

export default NotificationContainer;
