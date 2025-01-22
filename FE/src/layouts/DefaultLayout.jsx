import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Outlet } from 'react-router';

export default function DefaultLayout() {
    return (
        <>
            <Header></Header>
            <main className="container mt-4">
                <Outlet />
            </main>
            <Footer></Footer>
        </>
    );
}
