import React from 'react';
import { useForm } from "react-hook-form";
import { useRouter } from 'next/router';
import {
    useAppDispatch,
} from '@Store/hooks';
import axios from '@Service/core/axios';
import { FoodEntry } from '@Pages/addFood.types';
import { updateEntry } from '@Reducers/foodDetailsSlice/foodDetailsSlice';
import getUnixTime from 'date-fns/getUnixTime';
import withAuth from 'src/authHoc';
import DatePicker from 'src/datePicker';


const saveFood = (data: FoodEntry) => {
    return axios.post('/tracker/addFood', { ...data });
}

export const AddFoodComponent = () => {

    const [selectedDate, setSelectedDate] = React.useState(new Date());

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm();

    const dispatch = useAppDispatch();

    const { query, push } = useRouter();


    const onSubmit = (data: any) => {
        const withTime = {
            ...data,
            addedDate: getUnixTime(selectedDate)
        }
        saveFood(withTime).then((list) => {
            dispatch(updateEntry(list.data));
            push('./');
        });
    };

    const getFormRegisterPropsForString = (name: string) => {
        return {
            ...register(name, {
                required: true,
                maxLength: 150,
                pattern: /^[A-Za-z]+$/i
            })
        }
    }

    const getFormRegisterPropsForURL = (name: string) => {
        return {
            ...register(name, {
                required: true,
                maxLength: 2045,
                pattern: /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g
            })
        }
    }

    const getFormRegisterPropsForNumber = (name: string) => {
        return {
            ...register(name, {
                required: true,
                maxLength: 150,
                pattern: /^[0-9]+$/i
            })
        }
    }


    const renderRow = (name: string, registerProps: any, error: any, exp?: string, defultValue?: any, className?: string) => {
        return (
            <div className={`sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 pt-2 pb-2 sm:pt-5  sm:pb-5 ${className}`}>
                <label htmlFor="last-name" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                    <span>{name}</span>
                    <span className='text-xs'>{exp}</span>
                </label>
                <div>
                    <div className="mt-1 sm:mt-0 sm:col-span-2">

                        <input
                            {...registerProps}
                            type="text"
                            id="last-name"
                            defaultValue={defultValue}
                            className="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                        />
                    </div>
                    {error && <span className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
                        {`Please enter valid ${name}!`}
                    </span>}
                </div>
            </div>
        )

    }

    const renderDatePicker = () => {

        return (
            <div className={`sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 pt-2 pb-2 sm:pt-5  sm:pb-5`}>
                <label htmlFor="last-name" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                    <span>Select date</span>
                </label>
                <div>
                    <DatePicker onSelect={(date) => setSelectedDate(date)} />
                </div>
            </div>
        )
    }


    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                {renderRow('Food name', getFormRegisterPropsForString('name'), errors['name'], '(Pizza)', query.foodname)}
                {renderRow('Consume qty  ', getFormRegisterPropsForNumber('consumedQty'), errors['consumedQty'], '(1)')}
                {renderRow('Consumed Calories', getFormRegisterPropsForNumber('consumedCalories'), errors['consumedCalories'], '(120)')}

                {renderRow('Serving unit ', getFormRegisterPropsForString('servingUnit'), errors['servingUnit'], '(Slice)')}
                {renderRow('Consumed weight grams ', getFormRegisterPropsForNumber('consumedWeightGrams'), errors['consumedWeightGrams'], '(107)')}
                {renderRow('Image Url', getFormRegisterPropsForURL('imageUrl'), errors['imageUrl'])}
                {renderDatePicker()}
                <div className=' w-full flex justify-center'>
                    <button type="submit" className="w-full md:w-5/12 mt-2 bg-blue-500 rounded-lg font-bold text-white text-center px-4 py-3 transition duration-300 ease-in-out hover:bg-blue-600">
                        Add
                    </button>
                </div>

            </form>
        </>

    )
}


const AddFood = withAuth(AddFoodComponent, ['admin', 'user']);;
export default AddFood;
