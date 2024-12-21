import { Outlet } from 'react-router-dom';
import StayTop from '../components/Common/StayTop';
import { Toaster } from 'react-hot-toast';
import DashSidebar from '../dashboard/DashSidebar';
import DashHeader from '../shared/DashHeader';
import { useState } from 'react';

const Dashboard = () => {
    const [showSidebar, setShowSidebar] = useState(false);

    const handleToggle = () => {
        setShowSidebar(!showSidebar)
    }
    return (
        <>
            {
                // showSidebar && <div onClick={handleToggle} className='h-screen w-full bg-dark/40 fixed top-0 left-0 z-[12] md:hidden'></div>
            }

            <StayTop />

            <DashHeader handleToggle={handleToggle} />

            {/* main */}
            <main className='flex h-screen backdrop-blur-sm bg-white/50'>
                <DashSidebar showSidebar={showSidebar} handleToggle={handleToggle} />

                <section className="flex-1 overflow-y-auto">
                    <div className="py-4 px-5">
                        <Outlet />
                    </div>
                </section>
            </main>

            <Toaster />
        </>
    );
};

export default Dashboard;