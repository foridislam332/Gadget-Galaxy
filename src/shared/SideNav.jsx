
const SideNav = ({ isOpen, toggle }) => {
    return (
        <>
            <aside className={`lg:hidden fixed top-0 bg-white w-[280px] md:w-[350px] h-screen p-5 z-50 duration-300 ease-in ${isOpen ? 'left-0' : '-left-full'}`}>

            </aside>
            {/* overlay */}
            <div onClick={toggle} className={`fixed lg:hidden w-full h-screen top-0 left-0 z-30 bg-dark bg-opacity-30 duration-300 ease-in ${isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}></div>
        </>
    );
};

export default SideNav;