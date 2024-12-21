import { useState } from 'react';
import { Link } from 'react-router-dom';
import useProductData from '../../hooks/useProductData';
import CartQuantityCount from './CartQuantityCount';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import toast from 'react-hot-toast';

import { IoClose } from 'react-icons/io5';
import { CgSpinner } from 'react-icons/cg';

const CartItem = ({ cart, refetch }) => {
    const { _id, productId, price, quantity } = cart;

    const [axiosSecure] = useAxiosSecure();
    const [productData, loading] = useProductData();
    const [isLoading, setIsLoading] = useState(false);


    if (loading) {
        return <h1>Loading</h1>
    }

    const cartProducts = productData.find(item => item._id === productId)

    const { title, images } = cartProducts;


    const handleRemoveCart = () => {
        axiosSecure.delete(`/carts/${cart._id}`)
            .then(res => {
                if (res.data.deletedCount) {
                    toast.success('Remove Successfully!', {
                        position: "bottom-center",
                        autoClose: 2500,
                    });
                    refetch();
                }
            }).catch(error => {
                console.log(error)
            })
    }
    return (
        <div className='border-b border-darkWhite py-3 relative'>
            <div className='flex justify-between'>
                <div className="flex items-center gap-4">
                    <figure className='shrink-0'>
                        <img className='w-20 md:w-24 rounded shadow-xl object-cover object-top' src={images[0]} alt={title} />
                    </figure>

                    <div>
                        <Link to={`/products/${_id}`} className="text-dark hover:text-primary hover:underline cursor-pointer w-48 text-sm font-semibold line-clamp-2 block h-10 md:h-12 mb-3 duration-300">{title}</Link>


                        <CartQuantityCount _id={cart._id} quantity={quantity} productQuantity={cartProducts?.quantity} refetch={refetch} axiosSecure={axiosSecure} setIsLoading={setIsLoading} />
                    </div>
                </div>

                <div className='flex-grow flex flex-col justify-between'>
                    <button onClick={handleRemoveCart} className='ml-auto text-gray hover:text-pink'>
                        <IoClose size='24' />
                    </button>

                    <div className="flex flex-col items-end">
                        <p className="text-primary font-bold text-xl shrink-0">TK. {price}</p>
                    </div>
                </div>
            </div>

            {
                isLoading && <div className="absolute top-0 left-0 w-full h-full text-6xl text-dark bg-white/10 backdrop-blur uppercase grid place-items-center rounded-md">
                    <CgSpinner className="animate-spin" />
                </div>
            }
        </div>
    );
};

export default CartItem;