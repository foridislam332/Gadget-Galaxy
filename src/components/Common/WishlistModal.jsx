import { useEffect } from "react";
import { IoCloseOutline } from "react-icons/io5";
import { MdOutlineDelete } from "react-icons/md";
import { Link } from "react-router-dom";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import toast from "react-hot-toast";

const WishlistModal = ({ myWishlist, refetch, isOpen, setIsOpen }) => {
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

    const [axiosSecure] = useAxiosSecure();

    const handleRemoveWish = (id) => {
        axiosSecure.delete(`/wishlist/${id}`)
            .then(res => {
                if (res.data.deletedCount) {
                    refetch();
                    toast.success('Remove Successfully!', { autoClose: 2500 });
                }
            })
            .catch(err => console.log(err))
    }
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
                        myWishlist?.length > 0 ? <div className="md:w-[450px]">
                            <div className="py-3 bg-white sticky top-0 z-10 text-center flex items-center gap-2 px-8 border-b border-darkWhite">
                                <h1 className="text-2xl font-medium">Wishlist</h1>
                                <p className="text-2xl text-gray">({myWishlist?.length} items)</p>
                            </div>


                            <div className="px-4 md:px-8 py-5 divide-y divide-darkWhite">
                                {myWishlist.map(item => <div key={item._id}
                                    className="flex items-center gap-4"
                                >
                                    <figure className='shrink-0'>
                                        <img className='w-20 md:w-24 rounded shadow-xl object-cover object-top' src={item.images[0]} alt={item.title} />
                                    </figure>

                                    <div className="w-full">
                                        <Link to={`/products/${item.productId}`}
                                            className="text-lg font-semibold text-dark mb-2 inline-block truncate hover:text-primary duration-300"
                                        >{item.title}</Link>

                                        <p className="text-lg font-semibold text-primary">Tk. {item.price}</p>
                                    </div>
                                    <button onClick={() => handleRemoveWish(item._id)} className="h-8 w-8 flex items-center justify-center shrink-0 rounded-full border-2 border-darkWhite hover:bg-red/70 hover:text-white hover:border-red/70 duration-300">
                                        <MdOutlineDelete />
                                    </button>
                                </div>)}
                            </div>
                        </div> : <div className="w-[450px] py-10">
                            <h2 className="text-center font-medium text-2xl text-dark mb-4">Your Wishlist is empty</h2>
                            <p className="text-center text-gray">Let's fill it up shall we?</p>
                        </div>
                    }
                </div>
            </div>
        </div>
    );
};

export default WishlistModal;