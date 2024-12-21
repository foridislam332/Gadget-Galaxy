import { useState } from 'react';
import { Helmet } from 'react-helmet';
import { Link, useLoaderData } from 'react-router-dom';
import Breadcrumbs from '../components/Common/Breadcrumbs';
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import QuantityCounter from '../components/Common/QuantityCounter';
import AddToCart from '../components/Common/AddToCart';
import useAuth from '../hooks/useAuth';
import AddToWishlist from '../components/Common/AddToWishlist';

const ProductDetails = () => {
    const productData = useLoaderData();
    const { currentUser } = useAuth();

    const { title, category, images, quantity, originalPrice, sellingPrice, description } = productData;


    const [newQuantity, setNewQuantity] = useState(1);
    return (
        <>
            <Helmet>
                <title>{title} - Gadget Galaxy</title>
            </Helmet>

            <Breadcrumbs title='Product Details' />

            <section className="py-20">
                <div className="container">
                    <div className='grid grid-cols-3 gap-10'>
                        <div className="lg:col-span-2 hidden md:block">
                            <ImageGallery items={images?.map(pic => ({ original: pic, thumbnail: pic }))} thumbnailPosition='left' />
                        </div>
                        <div className="lg:col-span-2 md:hidden h-full w-[340px] mx-auto sm:w-full">
                            <ImageGallery items={images?.map(pic => ({ original: pic, thumbnail: pic }))} thumbnailPosition='bottom' />
                        </div>

                        <div className="p-4 shadow-2xl rounded relative">
                            <div className='py-2 px-4 mt-3 rounded-md border-b border-darkWhite shadow'>
                                <h2 className='text-2xl font-semibold'>{title}</h2>
                                <div className='text-sm text-dark flex gap-2 mt-1'>
                                    <p>Category:</p>

                                    <Link to={`/category/${category}`} className='hover:underline text-blue'>{category}</Link>
                                </div>

                                <div className="flex items-center mt-4">
                                    <p className="text-primary font-bold text-xl">TK. {sellingPrice}</p><span>~</span>
                                    <p className="text-gray/70 relative after:absolute after:h-[1px] after:w-full after:bg-gray after:left-0 after:top-1/2 after:-rotate-12">TK. {originalPrice}</p>
                                </div>
                            </div>

                            <div className='mt-4 py-3 px-4 rounded-md border-b border-darkWhite'>
                                <p className='text-xl font-semibold mb-2'>Quantity:</p>
                                <QuantityCounter quantity={quantity} newQuantity={newQuantity} setNewQuantity={setNewQuantity} />
                            </div>

                            <div className='py-6 border-b border-darkWhite'>
                                <div className='flex items-center gap-3'>
                                    {currentUser?.role === 'buyer' && <AddToWishlist item={productData} />}

                                    <AddToCart item={productData} quantity={newQuantity} isHover={false} />
                                </div>
                            </div>

                            <div className='mt-6'>
                                <p className='text-xl font-semibold mb-2'>Description:</p>

                                <div className='text-gray'
                                    dangerouslySetInnerHTML={{
                                        __html: description,
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default ProductDetails;