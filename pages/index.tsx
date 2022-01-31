import type { NextPage } from 'next';
import dynamic from 'next/dynamic';

import React from 'react';
import Layout from '@Layout/index';
import { CalorieTrackerCard } from 'src/component/calorieTrackerCard';
import axios from "axios";
import cookies from 'cookies'
import {
  useAppDispatch,
} from '@Store/hooks';
import { updateUser } from '@Reducers/userSlice/userSlice';
import { Props as HomePageProps } from '@Pages/home';

const UserFlow = dynamic(() => import('../src/component/userFlow/userFlow'));


type Props = NextPage & HomePageProps;

const Home = (props: Props) => {
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    dispatch(updateUser(props.user))
  }, []);

  const renderAdminFlow = () => {

  }
  const renderUserFlow = () => {
    if (props.user.role === 'user') {
      return <UserFlow />
    }
  }

  return (
    <Layout>
      {renderUserFlow()}
      {renderAdminFlow()}
    </Layout>

  )
}

export async function getServerSideProps(ctx: any) {
  try {
    const ck = new cookies(ctx.req, ctx.res)
    const user = await axios.get('http://localhost:3001/auth/getUser', {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': ck.get('token') || '',
      }
    });
    return {
      props: { user: { ...user.data, userId: user.data['_id'] } },
    }
  } catch (e) {
    const { res } = ctx;
    res.setHeader("location", "/login");
    res.statusCode = 302;
    res.end();
    return {
      props: {},
    }
  }
}

export default Home;
