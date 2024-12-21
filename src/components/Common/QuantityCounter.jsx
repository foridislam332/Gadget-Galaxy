import { FaMinus, FaPlus } from "react-icons/fa6";

const QuantityCounter = ({ quantity, newQuantity, setNewQuantity }) => {
    const increaseQuantity = () => {
        setNewQuantity(prevQuantity => prevQuantity + 1);
    };

    const decreaseQuantity = () => {
        if (newQuantity > 1) {
            setNewQuantity(prevQuantity => prevQuantity - 1);
        } else if (quantity === 1) {
            setNewQuantity(0);
        }
    };
    return (
        <div className="flex items-center gap-5">
            <div className="w-fit flex items-center space-x-2">
                <button
                    onClick={decreaseQuantity}
                    className={`px-2 py-[6px] text-gray bg-darkWhite/60 ${newQuantity === 0 || newQuantity === 1 ? 'cursor-not-allowed opacity-40' : ''}`}
                    disabled={newQuantity === 0 || newQuantity === 1}
                >
                    <FaMinus />
                </button>
                <span className="text-xl w-7 text-center text-dark">{quantity === 0 ? 0 : newQuantity}</span>
                <button
                    onClick={increaseQuantity}
                    className={`px-2 py-[6px] text-gray hover:text-blue bg-darkWhite/60 duration-200 ${quantity === newQuantity ? 'cursor-not-allowed opacity-40' : ''}`}
                    disabled={quantity === newQuantity}
                >
                    <FaPlus />
                </button>
            </div>
            {
                quantity === 0 ? <p className="text-pink">Out of Stock</p> : <p className="text-gray">Only {quantity} items left!</p>
            }
        </div>
    );
};

export default QuantityCounter;