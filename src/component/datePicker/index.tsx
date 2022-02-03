import React, { useState } from "react";
import dynamic from "next/dynamic";
const Picker = dynamic(() => import("react-datepicker"));
import "react-datepicker/dist/react-datepicker.css";

interface DatePickerProps {
    onSelect: (date: Date) => void;
    defaultDate?: Date;
    className?: string;
}

const DatePicker = (props: DatePickerProps) => {
    
    const [startDate, setStartDate] = useState(props.defaultDate || new Date());

    const onSelectHandler = (date: Date) => {
        setStartDate(date);
        props.onSelect && props.onSelect(date);
    }

    return (
        <Picker
            className={`max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md ${props.className}`}
            selected={startDate}
            onChange={onSelectHandler}
            showTimeSelect
            maxDate={new Date()}
            dateFormat="MMMM d, yyyy hh:mm:ss"
            popperPlacement="top"
        />
    );
}

export default DatePicker;