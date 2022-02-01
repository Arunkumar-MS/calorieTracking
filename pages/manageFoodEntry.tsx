import type { NextPage } from 'next';

import React from 'react';
import Layout from '@Layout/index';
import {
  useAppDispatch,
  useAppSelector,
} from '@Store/hooks';
import { updateUser } from '@Reducers/userSlice/userSlice';
import { Props as HomePageProps } from '@Pages/home.types';
import authAccess from '@Service/serverAuth';
import axios from '@Service/core/axios';
import { selectAllFoodEntryList, updateAllFoodEntry } from '@Reducers/foodDetailsSlice/foodDetailsSlice';
import FoodEntryList from '@Component/foodEntryList';
import { redirectTo404 } from 'src/helpers/redirect';
import Spinner from '@Component/spinner';
import AdminFoodEditForm from '@Component/adminEditForm';

type Props = NextPage & HomePageProps;

const getAllFoodDetails = () => {
  return axios.get('/tracker/getAllUserfoodEntry');
}


const ManageFoodEntry = (props: Props) => {
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = React.useState(true);
  const foodEntry = useAppSelector(selectAllFoodEntryList);
  const [modalType, setModalType] = React.useState('');

  React.useEffect(() => {
    dispatch(updateUser(props.user))
    getAllFoodDetails().then((list) => {
      dispatch(updateAllFoodEntry(list.data));
      setIsLoading(false);
    });
  }, []);

  return (
    <Layout>
      <>
        <div className='flex items-center flex-col'>
          <div onClick={() => setModalType('add')} className='px-3 py-3 m-5 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'>
            Add new food entry
          </div>
          {foodEntry.length ? <FoodEntryList list={foodEntry} isAdmin={true} /> : null}
          {isLoading ? <Spinner className='space-x-2' /> : null}
          {(!isLoading && !foodEntry.length) && (
            <div className='text-gray-500 text-lg mt-20 text-center'>
              Nothing here to show! Please add new entry to see more details.
            </div>
          )}
        </div>
      </>
      {modalType && <AdminFoodEditForm onClose={() => setModalType('')} type={modalType} />}
    </Layout>

  )
}

export async function getServerSideProps(ctx: any) {
  const props = await authAccess(ctx);
  if (props.props.user && props.props.user.role !== 'admin') {
    redirectTo404(ctx);
  }
  return props;
}

export default ManageFoodEntry;
