import React, { FC } from 'react';
import NavBar from './navbar/navbar';

interface Props {
}

const Layout: FC<Props> = ({ children }) => {
    return (
        <>
            <NavBar />
            <main className='m-2 md:m-5'>
                {children}
            </main>
            <div className='pt-5'></div>
        </>
    )
}

export default Layout;

