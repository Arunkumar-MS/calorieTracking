import * as React from 'react';
import {
  useAppDispatch,
} from '@Store/hooks';
import UserFlow from '@Component/userFlow/userFlow';
import { updateEntry } from '@Reducers/foodDetailsSlice/foodDetailsSlice';
import Spinner from '@Component/spinner';
import useSWR from 'swr';
import withAuth from 'src/authHoc';
import { SWR_OPTIONS } from 'src/constant/swr';
import fetcher from '@Service/core/fetcher';


export const Home = () => {

  const dispatch = useAppDispatch();
  const { data, error } = useSWR('/tracker/getfoodEntry', fetcher, { ...SWR_OPTIONS });
  React.useEffect(() => {
    if(data) {
      dispatch(updateEntry(data));
    }
  }, [data]);

  return (
    <>
      {!data && !error && <Spinner className='mt-20'/>}
      {data && <UserFlow />}
      {error && <div className='text-center text-gray-500'> Something went worng please try later! </div>}
    </>

  )
}


export default withAuth(Home, ['admin','user']);
