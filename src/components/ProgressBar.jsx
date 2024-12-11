import React from 'react';

const ProgressBar = ({ progress }) => {
    return (
        <div className="w-full  bg-gray-800 rounded-full h-4 overflow-hidden">
            <div
                className="bg-green-500 h-full transition-all"
                style={{ width: `${progress}%` }}
            />
        </div>
    );
};

export default ProgressBar;
