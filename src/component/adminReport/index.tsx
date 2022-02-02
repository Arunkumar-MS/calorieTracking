import React from 'react';
import dynamic from 'next/dynamic';
import axios from '@Service/core/axios';
import Spinner from '@Component/spinner';
const BarChart = dynamic(() => import('@Component/charts/barChart'));
const PieChart = dynamic(() => import('@Component/charts/pieChart'));

const AdminReport = () => {
    const [adminReport, setAdminReport] = React.useState<any>({});
    const [isLoading, setIsLoading] = React.useState(true);

    React.useEffect(() => {
        axios.get('/report/getAdminReport').then((d) => {
            setAdminReport(d.data);
            setIsLoading(false);
        });
    }, []);

    const picChartData = {
        labels: ['last 7 days entry', 'Week before 7 days entry'],
        datasets: [
            {
                data: [adminReport?.lastSevenDaysEntries, adminReport?.weekBeforeLastSevenDaysEntries],
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

    const options = {
        responsive: true,
        plugins: {
            legend: null,
            title: {
                display: true,
                text: 'Last 7 days avarage user entry per day',
            },
        },
    } as any;

    const labels = adminReport.avgCalForLastSevendays?.map((avgCal: any) => avgCal.date);

    const barChartdata = {
        labels,
        datasets: [
            {
                data: adminReport.avgCalForLastSevendays?.map((avgCal: any) => avgCal.value),
                backgroundColor: 'gray',
            }
        ],
    };
    return (
        <>
        <div className='mt-20 border-t-2 -mx-20'/>
        <div className='mt-5'>
            {isLoading && <Spinner />}
            {!isLoading && (
                <>
                    <BarChart data={barChartdata} options={options} />
                    <div className='mt-20'>
                    <div className='mb-5 mt-5 border-t-2 -mx-20'/>

                        <div> User Entry report for last 7 days  </div>
                        <PieChart data={picChartData} />
                    </div>
                </>)
            }
        </div>
        <div className='pt-20 mt-5 border-t-2 -mx-20'/>
        </>
    )
}


export default AdminReport;
