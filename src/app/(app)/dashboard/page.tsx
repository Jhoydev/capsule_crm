import { Overview } from "@/modules/dashboard/components/overview";
import {RecentSales} from "@/modules/dashboard/components/recentSales";
import {TotalSold, TotalRent } from "@/modules/dashboard/components/totalCards";


export const metadata = {
    title: 'Dashboard',
}

const Dashboard = () => {
    return (
        <>
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">
                            Bienvenido!
                        </div>
                        <div className='flex'>
                            <TotalSold></TotalSold>
                            <TotalRent></TotalRent>
                        </div>
                        <div className='flex mt-5'>
                            <Overview></Overview>
                            <RecentSales></RecentSales>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Dashboard
