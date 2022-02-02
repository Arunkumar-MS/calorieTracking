import React from 'react';
import {
  useAppDispatch,
  useAppSelector,
} from '@Store/hooks';
import axios from '@Service/core/axios';
import { selectAllFoodEntryList, updateAllFoodEntry } from '@Reducers/foodDetailsSlice/foodDetailsSlice';
import FoodEntryList from '@Component/foodEntryList';
import Spinner from '@Component/spinner';
import AdminFoodEditForm from '@Component/adminEditForm';
import withAuth from 'src/authHoc';

const getAllFoodDetails = () => {
  return axios.get('/tracker/getAllUserfoodEntry');
}


const ManageFoodEntry = () => {
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = React.useState(true);
  const foodEntry = useAppSelector(selectAllFoodEntryList);
  const [modalType, setModalType] = React.useState('');

  React.useEffect(() => {
    getAllFoodDetails().then((list) => {
      dispatch(updateAllFoodEntry(list.data));
      setIsLoading(false);
    });
  }, []);

  return (
    <>
      <>
        <div className='flex items-center flex-col'>
          <div onClick={() => setModalType('add')} className='cursor-pointer px-3 py-3 m-5 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'>
            Add new food entry
          </div>
          {foodEntry.length ? <FoodEntryList list={foodEntry} isAdmin={true}  className='w-full'/> : null}
          {isLoading ? <Spinner className='space-x-2' /> : null}
          {(!isLoading && !foodEntry.length) && (
            <div className='text-gray-500 text-lg mt-20 text-center'>
              Nothing here to show! Please add new entry to see more details.
            </div>
          )}
        </div>
      </>
      {modalType && <AdminFoodEditForm onClose={() => setModalType('')} type={modalType} />}
    </>

  )
}

const ManageFood = withAuth(ManageFoodEntry, ['admin']);

export default ManageFood;

