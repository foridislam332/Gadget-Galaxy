import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const TopHeader = () => {
    const { user, logOut } = useAuth();
    return (
        <div className="container py-2">
            <div className="flex flex-wrap items-center justify-center xl:justify-between gap-x-5 gap-y-2">
                <p className="text-gray text-sm font-medium">Need help? Call Us: <span className="text-primary font-bold hover:underline">+ 01800 900 56544</span></p>

                <p className="text-gray font-medium text-center hidden md:inline-block">100% Secure delivery without contacting the courier</p>

                <ul className="flex items-center divide-x divide-primary/40 text-primary font-medium text-sm">
                    <li><Link to='/' className="px-2 hover:underline">Home</Link></li>
                    <li><Link to='/all-products/All Products' className="px-2 hover:underline">Products</Link></li>
                    <li><Link to='/about' className="px-2 hover:underline">About Us</Link></li>
                    {
                        user?.email ? <button onClick={logOut} className="px-2 text-red">
                            Log Out
                        </button> : <>
                            <li><Link to='/login' className="px-2 hover:underline">Login</Link></li>
                            <li><Link to='/sign_up' className="px-2 hover:underline">Sign Up</Link></li>
                        </>
                    }
                </ul>
            </div>
        </div>
    );
};

export default TopHeader;