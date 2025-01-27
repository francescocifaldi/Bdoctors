import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Outlet } from 'react-router';
import Loader from '../components/loader/Loader';
import { useContext } from 'react';
import GlobalContext from '../../contexts/globalContext';

export default function DefaultLayout() {
    const { isLoading } = useContext(GlobalContext);
    return (
        <>
            <Header />
            <main className="mt-4">
                <Outlet />
            </main>
            <Footer />
            {isLoading && <Loader />}
        </>
    );
}
