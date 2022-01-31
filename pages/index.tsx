import type { NextPage } from 'next';

import React from 'react';
import Layout from '@Layout/index';
import {
  useAppDispatch,
} from '@Store/hooks';
import { updateUser } from '@Reducers/userSlice/userSlice';
import { Props as HomePageProps } from '@Pages/home';
import authAccess from '@Service/serverAuth';
import UserFlow from '@Component/userFlow/userFlow';

type Props = NextPage & HomePageProps;

const Home = (props: Props) => {
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    dispatch(updateUser(props.user))
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
