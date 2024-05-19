'use client'

import { useAuth } from '@/hooks/auth'
import Navigation from '@/components/structure/navigation'
import Loading from '@/components/shared/loading';
import React from 'react';

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
        <div className="min-h-screen bg-gray-100">
            <Navigation user={user} />

            <main>{children}</main>
        </div>
    )
}

export default AppLayout
