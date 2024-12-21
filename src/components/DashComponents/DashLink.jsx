import { IoIosArrowForward } from "react-icons/io";
import { NavLink } from "react-router-dom";

const DashLink = ({ to, children }) => {
    return (
        <NavLink to={to}
            className={({ isActive }) =>
                isActive
                    ? "text-primary text-base underline py-2 px-5 md:pr-auto flex items-center w-full rounded-lg duration-300"
                    : "text-lightGray text-base py-2 px-5 md:pr-auto flex items-center md:bg-transparent hover:text-primary hover:underline w-full rounded-lg duration-300"
            }
        >
            {children}

            <div className='flex-grow'>
                <IoIosArrowForward className='ml-auto' />
            </div>
        </NavLink>
    );
};

export default DashLink;