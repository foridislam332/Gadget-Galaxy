import useAuth from '../hooks/useAuth';

import { FaBars } from 'react-icons/fa';

const DashHeader = ({ handleToggle }) => {
    const { currentUser } = useAuth();

    return (
        <div className='flex items-center justify-between sticky md:fixed top-0 md:-top-20 bg-white py-3 px-6 z-10 duration-300'>
            <button className='text-blue' onClick={handleToggle}>
                <FaBars size='24' />
            </button>

            <div className='flex items-center gap-3'>
                <div className="w-12 h-12 shadow-xl flex items-center justify-center bg-primary rounded-full text-white">
                    {
                        currentUser?.name && <h2 className="text-2xl uppercase">
                            {currentUser?.name?.slice(0, 1)}
                        </h2>
                    }
                </div>

                <p className='text-xl text-gray italic'>{currentUser.role}</p>
            </div>
        </div>
    );
};

export default DashHeader;