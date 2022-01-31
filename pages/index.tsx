import type { NextPage } from 'next';

import React from 'react';
import Layout from '@Layout/index';
import {
  useAppDispatch,
} from '@Store/hooks';
import { updateUser } from '@Reducers/userSlice/userSlice';
import { Props as HomePageProps } from '@Pages/home.types';
import authAccess from '@Service/serverAuth';
import UserFlow from '@Component/userFlow/userFlow';
import axios from '@Service/core/axios';
import { updateEntry } from '@Reducers/foodDetailsSlice/foodDetailsSlice';

type Props = NextPage & HomePageProps;

const getFoodDetails = () => {
  return axios.get('/tracker/getfoodEntry');
}


const Home = (props: Props) => {
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    dispatch(updateUser(props.user))
    getFoodDetails().then((list) => dispatch(updateEntry(list.data)));
  }, []);

  return (
    <Layout>
      <UserFlow />
    </Layout>

  )
}

export async function getServerSideProps(ctx: any) {
  const props = await authAccess(ctx);
  return props;
}

export default Home;
