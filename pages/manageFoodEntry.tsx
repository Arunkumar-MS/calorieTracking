import React from 'react';
import {
  useAppDispatch,
} from '@Store/hooks';
import { selectAllFoodEntryList, updateAllFoodEntry } from '@Reducers/foodDetailsSlice/foodDetailsSlice';
import FoodEntryList from '@Component/foodEntryList';
import Spinner from '@Component/spinner';
import AdminFoodEditForm from '@Component/adminEditForm';
import withAuth from 'src/authHoc';
import useSWR from 'swr';
import { SWR_OPTIONS } from 'src/constant/swr';
import fetcher from '@Service/core/fetcher';
import { useSelector } from 'react-redux';


export const ManageFoodEntry = () => {
  const dispatch = useAppDispatch();
  const [modalType, setModalType] = React.useState('');
  const { data, error, isValidating } = useSWR('/tracker/getAllUserfoodEntry', fetcher, { ...SWR_OPTIONS });
  const foodList = useSelector(selectAllFoodEntryList);
  React.useEffect(() => {
    if (data) {
      dispatch(updateAllFoodEntry(data));
    }
  }, [data]);

  return (
    <>
      <div className='flex items-center flex-col'>
        <div data-test-id="manageFoodEntryPage-add-new-food-entry" onClick={() => setModalType('add')} className='cursor-pointer px-3 py-3 m-5 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'>
          Add new food entry
        </div>
        {data?.length ? <FoodEntryList list={foodList} isAdmin={true} className='w-full' /> : null}
        {!data?.length && isValidating ? <Spinner className='space-x-2' /> : null}
        {(!data?.length && !isValidating) && (
          <div className='text-gray-500 text-lg mt-20 text-center'>
            Nothing here to show! Please add new entry to see more details.
          </div>
        )}
        {!data && error && <div className='text-red-600 text-lg mt-20 text-center'>
          Somthing went wrong please try later.
        </div>}
      </div>

      {modalType && <AdminFoodEditForm onClose={() => setModalType('')} type={modalType} />}
    </>
  )
}

const ManageFood = withAuth(ManageFoodEntry, ['admin']);

export default ManageFood;

