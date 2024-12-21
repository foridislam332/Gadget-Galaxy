import toast from "react-hot-toast";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import { useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import useMyWishlist from "../../hooks/useMyWishlist";
import { CgSpinner } from "react-icons/cg";
import { FaRegHeart } from "react-icons/fa6";

const AddToWishlist = ({ item }) => {
    const { _id, title, images, sellingPrice } = item;

    const [axiosSecure] = useAxiosSecure();
    const [myWishlist, loading, wishRefetch] = useMyWishlist();
    const { user } = useAuth();
    const email = user?.email;
    const location = useLocation();
    const [navigateToLogin, setNavigateToLogin] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleAddToWish = () => {
        if (!email) {
            setNavigateToLogin(true);
            return;
        }

        const wishData = { productId: _id, title, images, email, price: parseInt(sellingPrice) };

        setIsLoading(true);
        axiosSecure.post('/wishlist', wishData)
            .then(res => {
                if (res.data.insertedId) {
                    wishRefetch();

                    toast.success('Added Successfully!', { autoClose: 2500 });
                }
            })
            .finally(() => setIsLoading(false));
    }

    const handleRemoveWish = (id) => {
        if (!email) {
            setNavigateToLogin(true);
            return;
        }

        setIsLoading(true);
        axiosSecure.delete(`/wishlist/${id}`)
            .then(res => {
                if (res.data.deletedCount) {
                    wishRefetch();

                    toast.success('Remove Successfully!', { autoClose: 2500 });
                }
            })
            .finally(() => setIsLoading(false));
    }

    if (navigateToLogin) {
        return <Navigate to='/login' state={{ from: location }} replace />;
    }

    if (loading || isLoading) {
        return (
            <button className="absolute top-2 right-2 h-8 w-8 text-gray flex items-center justify-center rounded-full border-2 border-darkWhite hover:border-primary hover:text-primary duration-300">
                <CgSpinner className="animate-spin mx-auto" size='20' />
            </button>
        );
    }

    const isExists = myWishlist.find(item => item.productId === _id && item.email === email);
    return (
        <>
            {isExists ? <button onClick={() => handleRemoveWish(isExists._id)} className="absolute top-2 right-2 h-8 w-8 bg-white text-primary flex items-center justify-center rounded-full border-2 border-primary hover:border-darkWhite hover:text-darkWhite duration-300">
                <FaRegHeart />
            </button> : <button onClick={handleAddToWish} className="absolute top-2 right-2 h-8 w-8 bg-white text-gray flex items-center justify-center rounded-full border-2 border-darkWhite hover:border-primary hover:text-primary duration-300">
                <FaRegHeart />
            </button>}
        </>
    );
};

export default AddToWishlist;