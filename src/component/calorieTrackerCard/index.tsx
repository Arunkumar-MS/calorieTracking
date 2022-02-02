import FoodEntry from "@Component/foodEntry/foodEntry";
import React from "react";
import { PlusCircle } from "src/svgs/plusCircle.svg";
import { useAppSelector } from "@Store/hooks";
import { selectTodaysEntryList } from "@Reducers/foodDetailsSlice/foodDetailsSlice";
import { selectCalorieLimit } from "@Reducers/userSlice/userSlice";

const circumference = 30 * 2 * Math.PI;

interface CalorieTrackerCardProps {
    className?: string;
}



export const CalorieTrackerCard = (props: CalorieTrackerCardProps) => {
    const [openFoodModal, setOpenFoodModal] = React.useState(false);
    const todayuserEntry = useAppSelector(selectTodaysEntryList);
    const userCalorieLimit = useAppSelector(selectCalorieLimit);
    const totalCaloreConsumedToday = React.useMemo(() => todayuserEntry.reduce((result, item) => {
        return Number((item as any)?.consumedCalories) + result;
    }, 0), [todayuserEntry]);
    const consumedCalorePersentage = (totalCaloreConsumedToday && (totalCaloreConsumedToday / userCalorieLimit) * 100) || 0;
    const isLimitReached = consumedCalorePersentage >= 100;


    return (
        <>
            <div className={`p-2 flex items-center bg-white shadow justify-between md:flex-col flex-row ${props.className}`}>
                <div className='flex items-center md:flex-col flex-row'>
                    <div className="flex items-center justify-center md:flex-col flex-row">
                        <svg className="w-20 h-20">
                            <circle className="text-gray-300" strokeWidth={5} stroke="#80808040" fill="transparent" r={30} cx={40} cy={40} />

                            <circle className="text-blue-600" strokeWidth={5} stroke={isLimitReached ? "red" : "green"} strokeDasharray={circumference} strokeDashoffset={circumference - Math.min(100, consumedCalorePersentage) / 100 * circumference} strokeLinecap="round" fill="transparent" r={30} cx={40} cy={40} />
                        </svg>
                        <img className="absolute h-8 w-8" src="./cutlery.svg" alt="cutlery" />
                    </div>
                    {!totalCaloreConsumedToday && <div className="text-center">Eat upto {userCalorieLimit} Cal</div>}
                    {!!totalCaloreConsumedToday && <div className="text-center">{totalCaloreConsumedToday.toFixed(1)} of {userCalorieLimit.toFixed(1)} Cal</div>}
                    {isLimitReached && (<div className="text-center text-red-700">Day limit exceeded! </div>)}

                </div>
                <div className='flex items-center md:mt-3 cursor-pointer' onClick={() => setOpenFoodModal(!openFoodModal)} >
                    <span className="mr-3">Add item</span>
                    <PlusCircle className="h-8 w-8" fill={isLimitReached ? "red" : "none"} />
                </div>
            </div>
            {openFoodModal && <FoodEntry onClose={() => setOpenFoodModal(!openFoodModal)} />}
        </>
    )
}