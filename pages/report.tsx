import React from 'react';
import { selectUser } from '@Reducers/userSlice/userSlice';
import dynamic from 'next/dynamic';
import withAuth from 'src/authHoc';
import { useSelector } from 'react-redux';

const AdminReport = dynamic(() => import('@Component/adminReport'));
const UserReport = dynamic(() => import('@Component/userReport'));


export const ReportComponent = () => {
    const user = useSelector(selectUser);
    const isAdmin = user?.role === 'admin';
    const [selectedTab, setSelectedTab] = React.useState('user');
    const selectedClass = 'border-indigo-500 text-indigo-600 whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm';
    const nonSelectedClass = 'border-indigo-500 text-indigo-600", Default: "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300';
    if (isAdmin) {
        return (
            <>
                <div className="mb-5" data-test-id="report-page-admin-section">
                    <div className="border-b border-gray-200">
                        <nav className="-mb-px flex space-x-8 items-center" aria-label="Tabs">
                            {/* Current: "border-indigo-500 text-indigo-600", Default: "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300" */}
                            <a onClick={() => setSelectedTab('user')} href="#" className={selectedTab === 'user' ? selectedClass : nonSelectedClass}>
                                Youre report
                            </a>
                            <a data-test-id="report-page-admin-report" onClick={() => setSelectedTab('admin')} href="#" className={selectedTab === 'admin' ? selectedClass : nonSelectedClass}>
                                All other report
                            </a>
                        </nav>
                    </div>
                </div>
                <div className='w-full md:w-2/4 m-auto text-gray-500 text-center'>
                    {selectedTab === 'admin' && (
                        <AdminReport />
                    )}
                    {selectedTab === 'user' && (
                        <UserReport />
                    )
                    }
                </div>

            </>
        );
    }

    return (
        <>
            <div className='w-8/12 md:w-2/4 m-auto text-gray-500 text-center'>
                <UserReport />
            </div>
        </>

    )
}

const Report = withAuth(ReportComponent, ['admin', 'user']);

export default Report;
