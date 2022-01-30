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
        </>
    )
}

export default Layout;


// https://react-chartjs-2.netlify.app/examples/pie-chart