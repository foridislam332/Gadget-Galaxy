import { NavLink } from 'react-router-dom';

const ActiveLink = ({ to, children }) => {
    return (
        <NavLink to={to}
            className={({ isActive }) =>
                isActive
                    ? "bg-dark text-white py-2 px-6 md:px-[15px] text-lg rounded-[3px] duration-300"
                    : "hover:bg-light text-gray py-2 px-6 md:px-[15px] text-lg rounded border md:border-none border-darkWhite duration-300"
            }
        >
            {children}
        </NavLink>
    );
};

export default ActiveLink;