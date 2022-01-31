import React from "react";

interface SpinnerProps {
    className?: string;
}
const Spinner = (props: SpinnerProps) => {
    return (
        <div className={`flex justify-center items-center ${props.className}`}>
            <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full" role="status">
            </div>
        </div>
    )
}

export default Spinner;