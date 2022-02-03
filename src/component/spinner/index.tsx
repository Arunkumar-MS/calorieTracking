import React from "react";

interface SpinnerProps {
    className?: string;
}
const Spinner = (props: SpinnerProps) => {
    return (
        <div className={`flex items-center justify-center ${props.className}`} data-test-id="spinner" >
            <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full" role="status">
                <span className="visually-hidden">..</span>
            </div>
        </div>
    )
}

export default Spinner;