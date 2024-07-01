import { Overview } from "@/modules/dashboard/components/overview";
import {RecentSales} from "@/modules/dashboard/components/recentSales";
import {TotalSold, TotalRent } from "@/modules/dashboard/components/totalCards";

export const metadata = {
    title: 'Dashboard',
}

const Dashboard = () => {
    return (
        <div className="w-full gap-4 p-4 lg:gap-6 lg:p-6">
            <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
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
    )
}

export default Dashboard
