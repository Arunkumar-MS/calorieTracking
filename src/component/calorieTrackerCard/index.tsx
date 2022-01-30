import React from "react";
import { PlusCircle } from "src/svgs/plusCircle.svg";

export const CalorieTrackerCard = () => {
    const circumference = 30 * 2 * Math.PI;
    return (
        <div className='p-2 flex items-center bg-white shadow justify-between md:flex-col flex-row'>
            <div className='flex items-center md:flex-col flex-row'>
                <div className="flex items-center justify-center md:flex-col flex-row">
                    <svg className="w-20 h-20">
                        <circle className="text-gray-300" strokeWidth={5} stroke="#80808040" fill="transparent" r={30} cx={40} cy={40} />
                        <circle className="text-blue-600" strokeWidth={5} stroke="#ffa500" strokeDasharray={circumference} strokeDashoffset={circumference - 30 / 100 * circumference} strokeLinecap="round" fill="transparent" r={30} cx={40} cy={40} />
                    </svg>
                    <img className="absolute h-8 w-8" src="./cutlery.svg" alt="cutlery" />
                </div>
                <div>Eat upto 2100 Cal</div>
            </div>
            <div className='flex items-center md:mt-3'>
                <PlusCircle className="h-8 w-8" />
            </div>
        </div>
    )
}