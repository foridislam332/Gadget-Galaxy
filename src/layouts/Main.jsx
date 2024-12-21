import { Outlet } from "react-router-dom";
import Header from "../shared/Header";
import Footer from "../shared/Footer";
import StayTop from "../components/Common/StayTop";
import { Toaster } from "react-hot-toast";
import TopHeader from "../shared/TopHeader";

const Main = () => {
    return (
        <>
            <StayTop />

            {/* header */}
            <TopHeader />
            <Header />

            {/* main */}
            <main className="overflow-hidden">
                <Outlet />
            </main>

            <Toaster />

            {/* footer */}
            <Footer />
        </>
    );
};

export default Main;