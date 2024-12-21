import DashLink from '../components/DashComponents/DashLink';
import useAuth from '../hooks/useAuth';
import { Link } from 'react-router-dom';

// logo
import logo from '../assets/logo.png';

// react icons
import { FaHome, FaUsersCog } from 'react-icons/fa';
import { IoSettingsSharp } from 'react-icons/io5';
import { MdOutlineSell } from 'react-icons/md';
import { RiProductHuntLine } from 'react-icons/ri';

const DashSidebar = ({ showSidebar, handleToggle }) => {
    const { currentUser } = useAuth();

    const role = currentUser?.role;
    return (
        <>
            <aside className={`flex flex-col flex-shrink-0 h-full w-64 md:w-52 lg:w-64 bg-white shadow-xl duration-200 fixed md:static top-0 left-0 origin-left z-40 ${showSidebar ? 'scale-x-100' : 'scale-x-0 md:scale-x-100'}`}>
                <div className="flex items-center justify-center border-b border-darkWhite">
                    <Link to='/' className="text-xl font-semibold h-16 grid place-items-center">
                        <img className="w-full h-12 object-cover" src={logo} alt="The August" />
                    </Link>
                </div>
                <nav className="flex-1 overflow-y-auto mt-4">
                    <ul className="flex flex-col items-center gap-3 md:gap-2 mx-2 md:mx-3">
                        {role === 'admin' && (
                            <>
                                {/* manage users */}
                                <li className="w-full">
                                    <DashLink to="/dashboard/users">
                                        <FaUsersCog />
                                        <p className='ml-3'>Users</p>
                                    </DashLink>
                                </li>
                                {/* Settings */}
                                <li className="w-full">
                                    <DashLink to="/dashboard/settings">
                                        <IoSettingsSharp />
                                        <p className='ml-3'>Settings</p>
                                    </DashLink>
                                </li>
                            </>
                        )}

                        {role === 'seller' && (
                            <>
                                {/* Add Product */}
                                <li className="w-full">
                                    <DashLink to="/dashboard/create_product">
                                        <MdOutlineSell />
                                        <p className='ml-3'>Add Product</p>
                                    </DashLink>
                                </li>

                                {/* Listed Product */}
                                <li className="w-full">
                                    <DashLink to="/dashboard/products">
                                        <RiProductHuntLine />
                                        <p className='ml-3'>Listed Products</p>
                                    </DashLink>
                                </li>
                            </>
                        )}

                        <li className="w-full border-t border-dark/20 pt-3">
                            <DashLink to="/">
                                <FaHome />
                                <p className='ml-3'>Back Home</p>
                            </DashLink>
                        </li>
                    </ul>
                </nav>
            </aside>

            {
                showSidebar && <div onClick={handleToggle} className='h-screen w-full bg-dark/40 fixed top-0 left-0 z-[12] md:hidden'></div>
            }
        </>
    );
};

export default DashSidebar;