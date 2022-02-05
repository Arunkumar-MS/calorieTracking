import React from 'react';
import dynamic from 'next/dynamic';
import { useAppSelector } from '@Store/hooks';
import { selectCalorieLimit } from '@Reducers/userSlice/userSlice';
import Spinner from '@Component/spinner';
import useSWR from 'swr';
import fetcher from '@Service/core/fetcher';
import { SWR_OPTIONS } from 'src/constant/swr';
import { sortReportDate } from 'src/util/dateUtils';

const BarChart = dynamic(() => import('@Component/charts/barChart'));

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


const UserReport = () => {
    const calorieLimit = useAppSelector(selectCalorieLimit);
    const { data: userReport, error } = useSWR('/report/getuserReport', fetcher, { ...SWR_OPTIONS });
    const isLoading = !userReport;
    const sorted = React.useMemo(() => sortReportDate(Object.keys(userReport || {})), [userReport]);
    if (isLoading && !error ) {
        return <Spinner />;
    }

    if (!userReport && error) {
        return (<div className='text-center text-gray-500'> Something went worng please try later! </div>)
    }
  
    const barChartdata = {
        labels: sorted,
        datasets: [
            {
                data: sorted.map((item) => userReport[item]),
                backgroundColor: sorted.map((item) => userReport[item] >= calorieLimit ? 'red' : 'green'),
            }
        ],
    };
    return (
        <div>
            {!isLoading && <>
            <div data-test-id="report-page-title"> Your last 7 days calorie consumption report  </div>
            <BarChart data={barChartdata} options={options} />
            </>}
            {!userReport && error && <div className='text-center text-gray-500'> Something went worng please try later! </div>}
        </div>
    );
}

export default UserReport;
