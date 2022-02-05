import * as React from 'react';
import {
  useAppDispatch, useAppSelector,
} from '@Store/hooks';
import UserFlow from '@Component/userFlow/userFlow';
import { selectFoodEntryList, updateEntry } from '@Reducers/foodDetailsSlice/foodDetailsSlice';
import Spinner from '@Component/spinner';
import useSWR from 'swr';
import withAuth from 'src/authHoc';
import { SWR_OPTIONS } from 'src/constant/swr';
import fetcher from '@Service/core/fetcher';
import { User } from './home.types';

interface Props {
  user: User;
}

export const Home = (props: Props) => {

  const dispatch = useAppDispatch();
  const foodList = useAppSelector(selectFoodEntryList);

  const { data, error, isValidating } = useSWR(['/tracker/getfoodEntry', props?.user?.userId], fetcher, { ...SWR_OPTIONS });


  React.useEffect(() => {
    if (data) {
      dispatch(updateEntry(data));
    }
  }, [data]);

  return (
    <>
      <UserFlow />
      {!foodList?.length && !error && isValidating && <Spinner className='mt-20' />}
      {!foodList?.length && error && <div className='text-center text-gray-500'> Something went worng please try later! </div>}
      {!foodList?.length && !error && !isValidating && <div className='text-center text-gray-500'> Nothing here to show at the moment. Please add food entry! </div>}
    </>

  )
}


export default withAuth(Home, ['admin', 'user']);
