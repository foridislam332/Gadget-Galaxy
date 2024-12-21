import { useEffect } from "react";
import { Link } from "react-router-dom";
import CartItem from "./CartItem";

import bagImage from '../../assets/shopping-bag.webp';

import { IoCloseOutline } from "react-icons/io5";

const ShoppingCartModal = ({ myCarts, refetch, isOpen, setIsOpen }) => {
    const subTotal = myCarts.reduce((total, item) => {
        return total + (item.price * item.quantity);
    }, 0);

    // modal
    useEffect(() => {
        const handleOutsideClick = (event) => {
            if (event.target.id === "modal-overlay") {
                setIsOpen(false);
            }
        };

        const handleBodyScroll = () => {
            document.body.style.overflow = isOpen ? "hidden" : "auto";
        };

        window.addEventListener("click", handleOutsideClick);
        handleBodyScroll();

        return () => {
            window.removeEventListener("click", handleOutsideClick);
            document.body.style.overflow = "auto";
        };
    }, [isOpen, setIsOpen]);
    return (
        <div
            id="modal-overlay"
            className={`fixed top-0 h-screen inset-0 z-[999] flex items-center justify-center bg-black bg-opacity-40 overflow-hidden transition-opacity duration-300 ${isOpen
                ? "opacity-100 pointer-events-auto"
                : "opacity-0 pointer-events-none"
                }`}
        >
            <div
                className={`relative bg-white overflow-hidden rounded-lg`}
            >
                <button
                    className="absolute top-2 right-2 w-8 h-8 flex items-center justify-center bg-darkWhite text-purple text-xl hover:bg-red-400/20 hover:text-red rounded duration-300 z-30 group"
                    onClick={() => setIsOpen(false)}
                >
                    <IoCloseOutline
                        size="24"
                        className="group-hover:rotate-180 duration-300"
                    />
                </button>

                <div className="max-h-[550px] overflow-y-auto overflow-x-hidden">
                    {
                        myCarts.length > 0 ? <div className="md:w-[450px]">
                            <div className="py-3 bg-white sticky top-0 z-10 text-center flex items-center gap-2 px-8 border-b border-darkWhite">
                                <h1 className="text-2xl font-medium">Shopping Cart</h1>
                                <p className="text-2xl text-gray">({myCarts.length} items)</p>
                            </div>


                            <div className="px-4 md:px-8">
                                {myCarts.map(cart => <CartItem key={cart._id} cart={cart} refetch={refetch} />)}
                            </div>

                            <div className="mt-4 px-8 py-4 border-t border-darkWhite sticky bottom-0 bg-white">

                                <div className="flex items-center justify-between text-2xl text-dark">
                                    <p className="font-semibold">Subtotal:</p>

                                    <p className="text-primary font-bold text-xl shrink-0">TK. {subTotal}</p>
                                </div>
                            </div>
                        </div> : <div className="w-[450px] py-10">
                            <img className="w-64 mx-auto" src={bagImage} alt="" />

                            <h2 className="text-center font-medium text-2xl text-dark mb-4">Your shopping bag is empty</h2>
                            <p className="text-center text-gray">Let's fill it up shall we?</p>
                        </div>
                    }
                </div>
            </div>
        </div>
    );
};

export default ShoppingCartModal;