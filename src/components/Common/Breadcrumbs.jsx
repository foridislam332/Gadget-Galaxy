import { Link } from "react-router-dom";
import { HiOutlineHome } from "react-icons/hi";
import { FaAngleRight } from "react-icons/fa6";

const Breadcrumbs = ({ title }) => {
    return (
        <div className='border-b border-light py-2'>
            <div className="container">
                <div className='text-gray capitalize flex items-center gap-2 w-fit px-4 py-2 rounded font-semibold'>
                    <Link to='/' className="text-primary flex items-start gap-1 hover:underline">
                        <HiOutlineHome size='20' />
                        <span>Home</span>
                    </Link>

                    <FaAngleRight size='12' />

                    <p>Pages</p>

                    <FaAngleRight size='12' />

                    <p>{title}</p>
                </div>
            </div>
        </div>
    );
};

export default Breadcrumbs;