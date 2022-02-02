import React from 'react';
import {
    useAppDispatch,
} from '@Store/hooks';
import { selectUser, updateUser } from '@Reducers/userSlice/userSlice';
import dynamic from 'next/dynamic';
import withAuth from 'src/authHoc';
import { useSelector } from 'react-redux';

const AdminReport = dynamic(() => import('@Component/adminReport'));
const UserReport = dynamic(() => import('@Component/userReport'));


const ReportComponent = () => {
    const dispatch = useAppDispatch();
    const user = useSelector(selectUser);

    return (
        <div className='w-8/12 md:w-1/3 m-auto text-gray-500 text-center'>
            <UserReport />
            {user?.role === 'admin' && <AdminReport />}
        </div>
    )
}

const Report = withAuth(ReportComponent, ['admin', 'user']);

export default Report;
