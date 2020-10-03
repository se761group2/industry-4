import React from "react";

interface MessageProps {
    message: string;
}

const Error404: React.FC<MessageProps> = ({ message }) => {
    return (
        <div className="flex justify-center">
            <div className="font-bold text-lg text-center text-white m-16 ml-4">{message}</div>
        </div>
    );
};

export default Error404;
