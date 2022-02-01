import React from 'react';
import { useForm } from "react-hook-form";
import { useRouter } from 'next/router';
import {
    useAppDispatch,
} from '@Store/hooks';
import { FoodEntry } from '@Pages/addFood.types';
import { updateAllFoodEntry } from '@Reducers/foodDetailsSlice/foodDetailsSlice';
import getUnixTime from 'date-fns/getUnixTime';
import { editFoodEntry, addOtherUserFoodEntry } from '@Service/foodService';
import Spinner from '@Component/spinner';

interface FormProps {
    item?: FoodEntry | any;
    type: 'add' | 'edit';
    onSubmit: (data: any) => void
    isAdmin?: boolean;
    onSuccess?: () => void;
}

type Props = FormProps



const FoodAddForm = (props: Props) => {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors }
    } = useForm();
    const isAdminEdit = props.isAdmin && props.type === 'edit';
    const [error, setError] = React.useState('');
    const [isLoading, setIsLoading] = React.useState(false);
    const dispatch = useAppDispatch();

    const { query } = useRouter();

    const onClickHandler = () => {
        setIsLoading(true);
        setError('');
    }

    const onInValid = () => {
        setError('');
    }

    const onSubmit = async (formData: any) => {
        onClickHandler();
        if (props.onSubmit) {
            props.onSubmit(formData);
            return;
        }
        let apiService = null;

        if (props.type === 'edit') {
            apiService = editFoodEntry;
            formData = {
                ...formData,
                userId: props.item?.userId,
                _id: props.item?._id
            }
        }
        if (props.type === 'add') {
            formData = {
                ...formData,
                addedDate: getUnixTime(new Date())
            }
            apiService = addOtherUserFoodEntry;
        }

        try {
            if (apiService) {
                const { data } = await apiService({ ...formData });
                if (data?.statusCode === 400) {
                    setError(data?.message);
                    setIsLoading(false);
                    return;
                }
                dispatch(updateAllFoodEntry(data as any));
                setIsLoading(false);
                props.onSuccess && props.onSuccess();
            } else {
                setError('Someting went wrong. Please come back later!');
                setIsLoading(false);
            }
        } catch (e) {
            console.log(e);
            setError('Someting went wrong. Please try again!');
            setIsLoading(false);
        }



    };

    const getFormRegisterPropsForString = (name: string) => {
        return {
            ...register(name, {
                required: true,
                maxLength: 150,
                pattern: /^[A-Za-z ,_]+$/i
            })
        }
    }


    const getFormRegisterPropsForUserId = (name: string) => {
        if (isAdminEdit) {
            return { disabled: true };
        }

        return {
            ...register(name, {
                required: true,
                maxLength: 200,
                pattern: /^[A-Za-z0-9.]+$/i
            }),
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
                pattern: /^[.0-9.]+$/i
            })
        }
    }


    const renderRow = (name: string, registerProps: any, error: any, exp?: string, defultValue?: any, className?: string) => {
        return (
            <div className={`sm:grid sm:grid-cols-2 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 pt-2 pb-2 sm:pt-5  sm:pb-5 ${className}`}>
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

    const renderUserId = () => {
        const defultValue = isAdminEdit ? props.item?.userId : '';
        return renderRow('User Id', getFormRegisterPropsForUserId('userId'), errors['userId'], '', defultValue)
    }
    const defaultFoodValue = query.foodname || props.item?.name;
    const defaultConsumedCalories = props.item?.consumedCalories;
    const defaultConsumedQty = props.item?.consumedQty;
    const defaultServingUnit = props.item?.servingUnit;
    const defaultConsumedWeightGrams = props.item?.consumedWeightGrams;
    const defaultImageUrl = props.item?.imageUrl;
    return (
        <form onSubmit={handleSubmit(onSubmit, onInValid)}>
            {renderRow('Food name', getFormRegisterPropsForString('name'), errors['name'], '(Pizza)', defaultFoodValue)}
            {renderRow('Consume qty  ', getFormRegisterPropsForNumber('consumedQty'), errors['consumedQty'], '(1)', defaultConsumedQty)}
            {renderRow('Consumed Calories', getFormRegisterPropsForNumber('consumedCalories'), errors['consumedCalories'], '(120)', defaultConsumedCalories)}

            {renderRow('Serving unit ', getFormRegisterPropsForString('servingUnit'), errors['servingUnit'], '(Slice)', defaultServingUnit)}
            {renderRow('Consumed weight grams ', getFormRegisterPropsForNumber('consumedWeightGrams'), errors['consumedWeightGrams'], '(107)', defaultConsumedWeightGrams)}
            {renderRow('Image Url', getFormRegisterPropsForURL('imageUrl'), errors['imageUrl'], '', defaultImageUrl)}
            {renderUserId()}

            <div className=' w-full flex justify-center'>
                <button disabled={isLoading} type="submit" className={`flex justify-around items-center w-full md:w-5/12 mt-2 bg-blue-500 rounded-lg font-bold text-white text-center px-4 py-3 transition duration-300 ease-in-out hover:bg-blue-600 capitalize ${isLoading ? 'disabled:opacity-75 hover:bg-blue-500' : ''}`}>
                    {props.type === 'edit' ? "Save" : "Add"}
                    {isLoading && <Spinner />}
                </button>
            </div>
            {error && <div className="text-center mt-3 text-red-700 text-lg	">
                {error}
            </div>}
        </form>
    )
}

export default FoodAddForm;

