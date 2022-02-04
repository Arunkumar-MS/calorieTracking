import Layout from '@Layout/index';
import axios from '@Service/core/axios';
import { useRouter } from 'next/router';
import React from 'react';
import useSWR from 'swr';
import Spinner from '@Component/spinner';
import { Role, User } from '@Pages/home.types';
import { useDispatch } from 'react-redux';
import { updateUser } from '@Reducers/userSlice/userSlice';
import Cookies from 'js-cookie';
import { SWR_OPTIONS } from 'src/constant/swr';

const fetcher = (url: string) => axios.get(url).then((data) => data.data);

interface Base {
    user: User;
}

const withAuth = <P extends Base>(Component: React.ComponentType<P>, roles: Role[] = [], swrOptions = {}) => {

    return (hocProps: P) => {
        const token = React.useMemo(() => Cookies.get('token'), []);
        const { data, error } = useSWR<User, any>('/auth/getUser', fetcher, {...SWR_OPTIONS, ...swrOptions});
        const router = useRouter();
        const dispatch = useDispatch();

        const canVist = data?.role && roles.includes(data.role);
        
        React.useEffect(() => {
            if (data?.role) {
                if (!roles.includes(data.role)) {
                    router.push('/login');
                }
            }
            if (data) {
                dispatch(updateUser(data as User));
            }
        }, [data]);

        React.useEffect(() => {
            if (!token) {
                router.push('/login');
            }
        }, []);

        if(!token) {
            return <Spinner />;
        }

        if (canVist) {
            return (<Layout>
                <Component {...hocProps} user={data} />
            </Layout>)
        }

        return <div>
            {!error && <Spinner />}
            {error && <div className='text-center text-gray-500'> Something went worng please try later! </div>}
        </div>;
    }
}


export default withAuth;