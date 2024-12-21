import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

// react icons
import { PiAddressBook, PiUser, PiUsersThree } from "react-icons/pi";
import { BsBoxSeam } from "react-icons/bs";
import { BiSupport } from "react-icons/bi";
import { MdLogout, MdOutlineSell } from "react-icons/md";
import { RxDashboard } from "react-icons/rx";
import { RiProductHuntLine } from "react-icons/ri";

const UserProfile = () => {
    const { user, currentUser, logOut } = useAuth();
    const role = currentUser?.role;
    return (
        <>
            {
                user ? <div className="relative h-12 w-12 rounded-full border border-primary text-primary grid place-items-center group cursor-pointer">
                    <PiUser size='24' />

                    <span className="absolute top-0 right-0 flex h-[14px] w-[14px]">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-[14px] w-[14px] bg-primary"></span>
                    </span>

                    <div className="absolute top-full right-0 backdrop-blur bg-white/60 w-64 p-4 rounded-md shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible duration-300">
                        <div className="text-center border-b border-light pb-2 mb-2">
                            <p className="font-bold text-dark">HI, {currentUser.name}</p>
                            <p className="text-lightGray font-medium truncate">{user.email}</p>
                        </div>
                        <ul className="space-y-2">
                            {
                                role === 'seller' && <>
                                    <li><Link to='/dashboard/create_product' className="text-dark font-semibold flex items-center gap-3 hover:text-primary duration-300">
                                        <MdOutlineSell size='18' />
                                        <span>Add Product</span>
                                    </Link></li>

                                    <li><Link to='/dashboard/products' className="text-dark font-semibold flex items-center gap-3 hover:text-primary duration-300">
                                        <RiProductHuntLine size='20' className="-mr-[2px]" />
                                        <span>Listed Products</span>
                                    </Link></li>
                                </>
                            }

                            {
                                role === 'admin' && <>
                                    <li><Link to='/dashboard/users' className="text-dark font-semibold flex items-center gap-3 hover:text-primary duration-300">
                                        <PiUsersThree size='20' className="-mr-[2px]" />
                                        <span>Users</span>
                                    </Link></li>

                                    <li><Link to='/dashboard/settings' className="text-dark font-semibold flex items-center gap-3 hover:text-primary duration-300">
                                        <RxDashboard size='18' />
                                        <span>Settings</span>
                                    </Link></li>
                                </>
                            }
                            <div className="pt-1"></div>

                            <button onClick={logOut} className="text-dark font-semibold flex items-center justify-center gap-3 hover:text-red shadow-lg w-full py-2 rounded bg-white duration-300">
                                <MdLogout size='18' />
                                <span>Log Out</span>
                            </button>
                        </ul>
                    </div>
                </div> : <Link to='/login' className="relative h-12 w-12 rounded-full bg-red/10 text-red grid place-items-center">
                    <PiUser size='24' />
                </Link>
            }
        </>
    );
};

export default UserProfile;