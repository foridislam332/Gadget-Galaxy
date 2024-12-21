import { useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useMyCart from "../../hooks/useMyCart";
import toast from "react-hot-toast";

// react icons
import { CgSpinner } from "react-icons/cg";

const AddToCart = ({ item, quantity = 1, isHover = true, text = 'Add To Cart' }) => {
    const { _id, title, sellingPrice } = item;

    const [axiosSecure] = useAxiosSecure();
    const [myCarts, loading, refetch] = useMyCart();
    const { user, currentUser } = useAuth();
    const email = user?.email;
    const location = useLocation();
    const [navigateToLogin, setNavigateToLogin] = useState(false);
    const [addingToCart, setAddingToCart] = useState(false);

    const price = sellingPrice;

    const handleAddToCart = () => {
        if (!email) {
            setNavigateToLogin(true);
            return;
        }
        if (currentUser?.role === 'seller' || currentUser?.role === 'admin') {
            return;
        }

        const cartData = { productId: _id, title, email, price: parseInt(price), quantity };

        setAddingToCart(true);
        axiosSecure.post('/carts', cartData)
            .then(res => {
                if (res.data.insertedId) {
                    refetch();

                    toast.success('Added Successfully!', { autoClose: 2500 });
                }
            })
            .finally(() => setAddingToCart(false));
    }

    if (navigateToLogin) {
        return <Navigate to='/login' state={{ from: location }} replace />;
    }


    if (loading || addingToCart) {
        return (
            <div className="absolute bg-primary hover:underline text-white w-full left-0 bottom-0 py-2 font-semibold scale-y-0 group-hover:scale-y-100 duration-300">
                <CgSpinner className="animate-spin mx-auto" size='28' />
            </div>
        );
    }

    const isExists = myCarts.find(cartItem => cartItem.productId === _id && cartItem.email === email);

    return (
        <>
            {isExists ? (
                isHover ? (
                    <button className="absolute bg-dark hover:underline text-white w-full left-0 bottom-0 py-2 font-semibold scale-y-0 group-hover:scale-y-100 duration-300">
                        View Cart
                    </button>
                ) : (
                    <button className="bg-primary shadow-md shadow-primary/30 text-white py-2 w-full font-semibold duration-300">
                        View Cart
                    </button>
                )
            ) : (
                isHover ? (
                    <button onClick={handleAddToCart} className="absolute bg-primary hover:underline text-white w-full left-0 bottom-0 py-2 font-semibold scale-y-0 group-hover:scale-y-100 duration-300">
                        {text}
                    </button>
                ) : (
                    <button onClick={handleAddToCart} className="bg-black/80 hover:bg-primary shadow-lg shadow-dark/30 hover:shadow-primary/50 text-white py-2 w-full font-semibold duration-300">
                        {text}
                    </button>
                )
            )}
        </>
    );
};

export default AddToCart;