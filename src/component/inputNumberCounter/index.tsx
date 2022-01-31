import React from "react";

interface InputNumberCounterProps {
    onChange: (n: number) => void;
    className?: string
}

const InputNumberCounter = (props: InputNumberCounterProps) => {
    const [value, setValue] = React.useState(1);

    const onChangeHandler = (type: string) => {
        if (type === 'add') {
            props.onChange && props.onChange(value + 1)
            setValue(value + 1);
        }
        if (type === 'minus' && value > 1) {
            props.onChange && props.onChange(value - 1)
            setValue(value - 1);
        }

    }

    return (
        <div className={`flex flex-row border h-6 w-16 rounded-lg border-gray-400 relative ${props.className}`}>
            <button onClick={()=> onChangeHandler('minus')} className="font-semibold border-r bg-red-700 hover:bg-red-600 text-white border-gray-400 h-full w-20 flex rounded-l focus:outline-none cursor-pointer">
                <span className="m-auto">-</span>
            </button>
            <input type="hidden" className="md:p-2 p-1 text-xs md:text-base border-gray-400 focus:outline-none text-center" readOnly name="custom-input-number" />
            <div className="bg-white w-24 text-xs md:text-base flex items-center justify-center cursor-default">
                <span>{value}</span>
            </div>
            <button   onClick={()=> onChangeHandler('add')} className="font-semibold border-l  bg-blue-700 hover:bg-blue-600 text-white border-gray-400 h-full w-20 flex rounded-r focus:outline-none cursor-pointer">
                <span className="m-auto">+</span>
            </button>
        </div>
    );
}

export default InputNumberCounter;