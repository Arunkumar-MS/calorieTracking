import React from 'react';
import dynamic from 'next/dynamic';
import Spinner from '@Component/spinner';
import fetcher from '@Service/core/fetcher';
import { SWR_OPTIONS } from 'src/constant/swr';
import useSWR from 'swr';
const BarChart = dynamic(() => import('@Component/charts/barChart'));

const AdminReport = () => {

    const { data: adminReport, error } = useSWR('/report/getAdminReport', fetcher, { ...SWR_OPTIONS });
    const isLoading = !adminReport;

    if (isLoading) {
        return (<div className='mt-5'>
            {isLoading && <Spinner />}
        </div>);
    }

    const options = {
        responsive: true,
        plugins: {
            legend: null,
            title: {
                display: true,
                text: 'Last 7 days avarage per user calories consumption per day',
            },
        },
    } as any;

    const options2 = {
        responsive: true,
        plugins: {
            legend: null,
            title: {
                display: true,
                text: 'Last 7 days user entry vs week before 7 days entry',
            },
        },
    } as any;

    const labels = adminReport.avgCalForLastSevendays?.map((avgCal: any) => avgCal.date).reverse();

    const avarageUserCaloriesChartdata = {
        labels,
        datasets: [
            {
                data: adminReport.avgCalForLastSevendays?.map((avgCal: any) => avgCal.value).reverse(),
                backgroundColor: 'gray',
            }
        ],
    };

    const lastSevenVsLastWeekChartData = {
        labels: ['Week before 7 days entry', 'Last 7 days entry'],
        datasets: [
            {
                data: [adminReport?.weekBeforeLastSevenDaysEntries, adminReport?.lastSevenDaysEntries],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                ],
                borderWidth: 1,
            },
        ],
    };
    return (
        <>
            <div className='mt-5'>
                {!isLoading && (
                    <>
                        <BarChart data={avarageUserCaloriesChartdata} options={options} />
                        <div className='mt-20'>
                            <BarChart data={lastSevenVsLastWeekChartData} options={options2} />
                        </div>
                    </>)
                }
                {!adminReport && error && <div className='text-center text-gray-500'> Something went worng please try later! </div>}
            </div>
        </>
    )
}


export default AdminReport;
