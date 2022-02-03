import InputNumberCounter from "@Component/inputNumberCounter";
import axios from "@Service/core/axios";
import React from "react";
import { useAppDispatch } from "@Store/hooks";
import getUnixTime from "date-fns/getUnixTime";
import { updateEntry } from "@Reducers/foodDetailsSlice/foodDetailsSlice";
import dynamic from "next/dynamic";
const DatePicker = dynamic(()=> import("@Component/datePicker"))

export interface FoodAddCardProps {
    servingQty: number;
    servingUnit: string;
    servingWeightGrams: string;
    url: string;
    calories: number;
    name: string;
    onAdd: () => void;
}

const saveFood = (data: any) => {
    return axios.post('/tracker/addFood', { ...data });
}

const FoodAddCard = (props: FoodAddCardProps) => {
    const [selectedQty, setQty] = React.useState(1);
    const [selectedDate, setSelectedDate] = React.useState(new Date());
    const dispatch = useAppDispatch();

    const onChange = (n: number) => {
        setQty(n);
    }

    const onAdd = () => {
        const data = {
            addedDate: getUnixTime(selectedDate),
            consumedQty: selectedQty.toString(),
            consumedCalories: (selectedQty * props.calories).toString(),
            consumedWeightGrams: (selectedQty * Number(props.servingWeightGrams)).toString(),
            imageUrl: props.url,
            name: props.name,
            servingUnit: props.servingUnit,
        }
        saveFood(data).then((list) => {
            console.log(data);
            dispatch(updateEntry(list.data));
            props.onAdd();
        });
    }

    return (
        <div className="items-center flex w-full">
            <div className="w-1/6 flex justify-center flex-col text-ellipsis text-center">
                <img className="rounded-lg w-12 h-12" src={props.url} alt={props.name} />
                <div>{(props.calories * selectedQty).toFixed(2)} cal</div>
            </div>
            <div className="pl-5 w-5/6 pr-5">
                <p className="font-medium capitalize text-center">{props.name}</p>
                <p className="flex justify-between"> <span>Serving Qty </span> <span> {props.servingQty}</span></p>
                <p className="flex justify-between"> <span>Serving unit </span> <span> {props.servingUnit}</span></p>
                <p className="flex justify-between"> <span>Serving weight grams </span> <span> {props.servingWeightGrams}</span></p>
                <p className="flex justify-between"> <span>Caloriese per serving </span> <span> {props.calories}</span></p>
                <p className="flex justify-between mb-2 mt-1"> <span>Select date </span> <span > <DatePicker onSelect={(date) => setSelectedDate(date)} /></span></p>

                <div className="border border-slate-400 border-dashed	 " />
                <p className="flex justify-between mt-2 items-center"> <span>Select serving qty </span> <span> <InputNumberCounter onChange={onChange} /> </span></p>
                <p>
                    <button onClick={onAdd} className="w-full mt-2 bg-blue-500 rounded-lg font-bold text-white text-center px-4 py-3 transition duration-300 ease-in-out hover:bg-blue-600">
                        Add
                    </button></p>
            </div>
        </div>
    )
}


export default FoodAddCard;
