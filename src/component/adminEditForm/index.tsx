import FoodAddForm from "@Component/foodAddForm";
import React, { FC } from "react";
import { CloseIcon } from "src/svgs/closeIcon.svg";

interface FoodEntryProps {
    onClose: () => void;
}


const AdminFoodEditForm: FC<any> = ({ onClose, type, ...rest }) => {
  
    return (
        <div className="fixed z-10 inset-0 overflow-y-auto text-gray-500" aria-labelledby="modal-title" role="dialog" aria-modal="true">

            <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">

                <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true" />
                <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">​</span>

                <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle w-80 sm:max-w-sm sm:w-full sm:p-6">
                    <div className="flex -mt-5 -mr-5 justify-end" onClick={onClose}> <CloseIcon className="h-10 w-10 fill-current text-gray-400 hover:text-gray-600" /> </div>
                    <div className="">
                        <FoodAddForm  type={type} isAdmin={true} {...rest}  onSuccess={onClose} />
                    </div>
               
                </div>
            </div>
        </div>
    );
}



export default AdminFoodEditForm;