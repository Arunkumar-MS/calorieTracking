import type { NextPage } from 'next'
import Layout from '@Layout/index';
import { CalorieTrackerCard } from 'src/component/calorieTrackerCard';
import axios from "axios";
import cookies from 'cookies'


const Home: NextPage = () => {
  return (
    <Layout>
      <div className='md:flex md:justify-between'>
        <div className='md:w-2/12'>
          <CalorieTrackerCard />
        </div>
        <div className="md:w-10/12 mt-2 md:m-2 md:mt-0">
          <div className="bg-white rounded-lg shadow px-5 py-6 sm:px-6">
            <div className="border-4 border-dashed border-gray-200 rounded-lg h-96" />
          </div>
        </div>
      </div>
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
      props: { user: user.data },
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
