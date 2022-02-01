import AdminFoodEditForm from "@Component/adminEditForm";
import React from "react";
import { deleteFoodEntry } from "@Service/foodService";
import {
    useAppDispatch,
} from '@Store/hooks';
import { FoodEntry } from '@Pages/addFood.types';
import { updateAllFoodEntry } from '@Reducers/foodDetailsSlice/foodDetailsSlice';
import Spinner from "@Component/spinner";

export const AdminOperation = (props: any) => {
    const [isLoading, setLoading] = React.useState(false);
    const [error, setError] = React.useState('');

    const dispatch = useAppDispatch();

    const deleteEntry = () => {
        setLoading(true);
        setError('');
        deleteFoodEntry(props)
            .then((list) => {
                dispatch(updateAllFoodEntry(list.data));
                setLoading(false);
            })
            .catch(() => {
                setError('Something went wrong. Please try again later !')
                setLoading(false);
            })
    }


    const [modalType, setModalType] = React.useState('');
    return (
        <>
            <div className="flex justify-center m-2 text-gray-600 mt-5 ">
            {isLoading && ( <div className=" absolute z-20 h-30 w-full opacity-40 border"> 
                    <Spinner />
            </div>)}
                <span className="relative z-0 inline-flex shadow-sm rounded-md">
                  
                    <button onClick={() => setModalType('edit')} type="button" className="w-24 text-center   items-center px-4 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:z-10 ">
                        Edit
                    </button>
                    <button onClick={deleteEntry} type="button" className="-ml-px w-24 text-center items-center px-4 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:z-10">
                        Delete
                    </button>
                </span>
            </div>
            {error && <div className="text-center mt-3 text-red-700 text-lg	">
                {error}
            </div>}
            {modalType && <AdminFoodEditForm onClose={() => setModalType('')} type={modalType} item={props} />}
        </>
    )
}
