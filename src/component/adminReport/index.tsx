import React from 'react';
import dynamic from 'next/dynamic';
import axios from '@Service/core/axios';
import Spinner from '@Component/spinner';
const BarChart = dynamic(() => import('@Component/charts/barChart'));

const AdminReport = () => {
    const [adminReport, setAdminReport] = React.useState<any>({});
    const [isLoading, setIsLoading] = React.useState(true);

    React.useEffect(() => {
        axios.get('/report/getAdminReport').then((d) => {
            setAdminReport(d.data);
            setIsLoading(false);
        });
    }, []);

  

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

    const labels = adminReport.avgCalForLastSevendays?.map((avgCal: any) => avgCal.date);

    const avarageUserCaloriesChartdata = {
        labels,
        datasets: [
            {
                data: adminReport.avgCalForLastSevendays?.map((avgCal: any) => avgCal.value),
                backgroundColor: 'gray',
            }
        ],
    };

    const lastSevenVsLastWeekChartData = {
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
    return (
        <>
        <div className='mt-5'>
            {isLoading && <Spinner />}
            {!isLoading && (
                <>
                    <BarChart data={avarageUserCaloriesChartdata} options={options} />
                    <div className='mt-20'>
                        <BarChart data={lastSevenVsLastWeekChartData} options={options2}/>
                    </div>
                </>)
            }
        </div>
        </>
    )
}


export default AdminReport;
