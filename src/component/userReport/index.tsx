import React from 'react';
import dynamic from 'next/dynamic';
import axios from '@Service/core/axios';
import { useAppSelector } from '@Store/hooks';
import { selectCalorieLimit } from '@Reducers/userSlice/userSlice';
import Spinner from '@Component/spinner';
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
    const [userReport, setUserReport] = React.useState<any>({});
    const calorieLimit = useAppSelector(selectCalorieLimit);
    const [isLoading, setIsLoading] = React.useState(true);

    React.useEffect(() => {
        setIsLoading(true);
        axios.get('/report/getuserReport').then((d) => {
            setUserReport(d.data);
            setIsLoading(false);
        });
    }, []);

    const labels = Object.keys(userReport);

    const barChartdata = {
        labels,
        datasets: [
            {
                data: labels.map((item) => userReport[item]),
                backgroundColor: labels.map((item) => userReport[item] >= calorieLimit ? 'red' : 'green'),
            }
        ],
    };
    return (
        <div>
            {isLoading && <Spinner />}
            {!isLoading && <>
            <div> User Entry report for last 7 days  </div>
            <BarChart data={barChartdata} options={options} />
            </>}
        </div>
    );
}

export default UserReport;
