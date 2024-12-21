import toast from "react-hot-toast";

// react icons
import { FaMinus, FaPlus } from "react-icons/fa6";
import { MdDeleteOutline } from "react-icons/md";

const CartQuantityCount = ({ _id, quantity, productQuantity, refetch, axiosSecure, handleRemoveCart, setIsLoading }) => {
    const updateQuantity = (newQuantity) => {
        setIsLoading(true);
        axiosSecure.patch(`/carts/${_id}`, { quantity: newQuantity })
            .then(res => {
                if (res.data.modifiedCount > 0) {
                    refetch();
                }
            }).catch(error => {
                console.error('Error updating quantity:', error);
            }).finally(() => {
                setIsLoading(false);
            });
    };

    const increaseQuantity = () => {
        const newQuantity = quantity + 1;
        if (productQuantity < newQuantity) {
            toast.error(`Only ${productQuantity} items left!`, {
                position: "bottom-center",
                autoClose: 2500,
            });
        } else {
            updateQuantity(newQuantity);
        }
    };

    const decreaseQuantity = () => {
        if (quantity > 1) {
            const newQuantity = quantity - 1;
            updateQuantity(newQuantity);
        } else {
            handleRemoveCart();
        }
    };

    return (
        <div className="flex items-center gap-5">
            <div className="w-fit flex items-center space-x-2">
                <button
                    type="button"
                    onClick={decreaseQuantity}
                    className={`px-2 py-[6px] text-gray bg-darkWhite/60 hover:bg-red/10 hover:text-red duration-300`}
                >
                    {quantity === 1 ? <MdDeleteOutline /> : <FaMinus />}
                </button>
                <span className="text-xl w-7 text-center text-dark">{quantity}</span>
                <button
                    type="button"
                    onClick={increaseQuantity}
                    className={`px-2 py-[6px] text-gray hover:text-primary bg-darkWhite/60 hover:bg-primary/10 duration-300 ${productQuantity === quantity ? 'opacity-40' : ''}`}
                >
                    <FaPlus />
                </button>
            </div>
        </div>
    );
};

export default CartQuantityCount;