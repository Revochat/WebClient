import React from "react";
import { FaSpinner } from "react-icons/fa";

export const DefaultLoader = () => {
    return (
        <div className="flex justify-center items-center">
            <FaSpinner className="animate-spin text-5xl text-white" />
        </div>
    );
}