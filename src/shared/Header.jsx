import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SearchBar from "../components/Common/SearchBar";

// logo
import logo from '../assets/logo.png';
import { HiOutlineShoppingBag } from "react-icons/hi";

import UserProfile from "../components/Common/UserProfile";
import ShoppingCartModal from "../components/Common/ShoppingCartModal";
import useMyCart from "../hooks/useMyCart";
import useAuth from "../hooks/useAuth";
import { FaRegHeart } from "react-icons/fa6";
import useMyWishlist from "../hooks/useMyWishlist";
import WishlistModal from "../components/Common/WishlistModal";

const Header = () => {
    const { currentUser } = useAuth();
    const role = currentUser?.role;

    const [isScrolled, setIsScrolled] = useState(false);
    const [isShow, setIsShow] = useState(false);
    const [isWish, setIsWish] = useState(false);
    const [prevScrollPos, setPrevScrollPos] = useState(0);
    const [myCarts, , refetch] = useMyCart();
    const [myWishlist, , wishRefetch] = useMyWishlist();

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollPos = window.scrollY;

            setIsScrolled(currentScrollPos > prevScrollPos && currentScrollPos > 250);
            setPrevScrollPos(currentScrollPos);
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [prevScrollPos]);

    return (
        <>
            <header className={`sticky top-0 bg-light w-full z-20 transition duration-300 ease-in-out ${isScrolled ? '-translate-y-full' : 'translate-y-0'} py-2 md:py-4`}>
                <div className="container">
                    <nav className="flex items-center justify-between">
                        <Link to='/'>
                            <img className="w-36" src={logo} alt="Gadget Galaxy" />
                        </Link>

                        {/* search */}
                        <SearchBar />

                        {/* user and cart */}
                        <div className="flex items-center gap-5">
                            {
                                role === 'buyer' && <button onClick={() => setIsShow(true)} className="relative h-12 w-12 rounded-full border border-primary text-primary grid place-items-center">
                                    <HiOutlineShoppingBag size='24' />

                                    <span className="absolute top-0 -right-1 h-5 w-5 grid place-items-center rounded-full bg-primary text-white text-sm font-medium">{myCarts?.length}</span>
                                </button>
                            }
                            {
                                role === 'buyer' ? <button onClick={() => setIsWish(true)} className="relative h-12 w-12 rounded-full border border-primary text-primary grid place-items-center">
                                    <FaRegHeart size='20' />

                                    <span className="absolute top-0 -right-1 h-5 w-5 grid place-items-center rounded-full bg-primary text-white text-sm font-medium">{myWishlist?.length}</span>
                                </button> : <UserProfile />
                            }

                        </div>
                    </nav>
                </div>
            </header>

            {/* cart modal */}
            <ShoppingCartModal myCarts={myCarts} refetch={refetch} isOpen={isShow} setIsOpen={setIsShow} />

            {/* Wishlist modal */}
            <WishlistModal myWishlist={myWishlist} refetch={wishRefetch} isOpen={isWish} setIsOpen={setIsWish} />
        </>
    );
};

export default Header;