'use client'

import { useAuth } from '@/hooks/auth'

import Loading from '@/components/shared/loading';
import React from 'react';
import Header from "@/components/structure/header";
import Footer from '@/components/structure/footer';
import Sidebar from "@/components/structure/sidebar";

type DashboardType = {
    children?: React.ReactNode;
    header?: React.ReactNode;
}

const AppLayout = ({ children, header }: DashboardType) => {
    const { user } = useAuth({ middleware: 'auth' })

    if (!user) {
        return <Loading />
    }

    return (

        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <Header />
            <div style={{ display: 'flex', flexGrow: 1 }}>
                <Sidebar />
                <main style={{ flexGrow: 1, padding: '20px' }}>{children}</main>
            </div>
            <Footer />
        </div>

    )
}

export default AppLayout
