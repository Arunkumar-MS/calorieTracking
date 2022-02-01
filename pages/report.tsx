import type { NextPage } from 'next';
import React from 'react';
import Layout from '@Layout/index';
import {
  useAppDispatch,
} from '@Store/hooks';
import { updateUser } from '@Reducers/userSlice/userSlice';
import { Props as PageProps } from '@Pages/home.types';
import authAccess from '@Service/serverAuth';
import dynamic from 'next/dynamic';
import axios from '@Service/core/axios';

const BarChart = dynamic(() => import('@Component/charts/barChart'));
const PieChat = dynamic(() => import('@Component/charts/pieChart'));

type Props = NextPage & PageProps;


const Report = (props: Props) => {
  const dispatch = useAppDispatch();
  const [userReport, setUserReport] = React.useState<any>({});

  React.useEffect(() => {
    dispatch(updateUser(props.user));
      axios.get('/report/getuserReport').then((d) => {
          setUserReport(d.data);
      });
  }, []);

// let lastWeekEntry = 0;
// let preWeekEntry = 0;

// const lastSevenDaysEnrty = [] as any;
// data.map((d)=> {
//     if(d.addedDate >= lastWeekStartDate){
//         lastSevenDaysEnrty.push(d);
//         lastWeekEntry++;
//         return;
//     }

//     if(d.addedDate >=  prevWeekStartDate && d.addedDate < lastWeekStartDate ){
//         preWeekEntry++;
//     }

//  })

// const chartData = {
//     labels: ['last 7 days entry', 'Week before 7 days entry'],
//     datasets: [
//       {
//         data: [preWeekEntry, lastWeekEntry],
//         backgroundColor: [
//           'rgba(255, 99, 132, 0.2)',
//           'rgba(54, 162, 235, 0.2)',
//         ],
//         borderColor: [
//           'rgba(255, 99, 132, 1)',
//           'rgba(54, 162, 235, 1)',
//         ],
//         borderWidth: 1,
//       },
//     ],
// };


//     const groupedEnrty = lastSevenDaysEnrty.reduce((hashMap: any, item: any) => {
//         const key = format(fromUnixTime(item.addedDate), 'dd_MM_YYY');
//         const value = hashMap[key] || 0;
//         hashMap[key] = value + item.consumedCalories;
//          return hashMap;
//     }, {});

const options = {
    responsive: true,
    plugins: {
      legend: null,
      title: {
        display: true,
        text: 'Last 7 days report',
      },
    },
  } as any;
  
  const labels = Object.keys(userReport).map((item)=> item.replaceAll('_',':'));
  
const barChartdata = {
    labels,
    datasets: [
      {
        data:  Object.keys(userReport).map((item) => userReport[item]),
        backgroundColor:  Object.keys(userReport).map((item)=> userReport[item] >= props.user.calorieLimit ? 'red': 'green'),
      }
    ],
  };
  
  return (
    <Layout>
        <div className='h-80 w-80'>
             <BarChart data={barChartdata} options={options} />
             {/* <PieChat data={chartData}/> */}
        </div>
    </Layout>

  )
}

export async function getServerSideProps(ctx: any) {
  const props = await authAccess(ctx);
  return props;
}

export default Report;
