import { Link } from "react-router-dom";
import AddToCart from "./AddToCart";
import AddToWishlist from "./AddToWishlist";

const ProductCard = ({ item, role }) => {
    const { _id, title, images, originalPrice, sellingPrice, category } = item;

    return (
        <div className="shadow-md hover:shadow-2xl hover:-translate-y-2 group duration-300">
            <figure className="relative">
                <img src={images[0]} className="h-48 2xl:h-64 w-full object-cover" alt={title} />

                {
                    role === 'buyer' && <>
                        <AddToWishlist item={item} />
                        <AddToCart item={item} />
                    </>
                }
            </figure>

            <div className="p-3 text-center bg-light">
                <Link to={`/category/${category}`} className="text-gray line-clamp-1 font-medium text-sm">{category}</Link>

                <Link to={`/products/${_id}`} className="mt-1 text-lg block font-semibold text-black group-hover:text-primary line-clamp-1 mb-4 group-hover:underline duration-300">{title}</Link>

                <div className="flex items-center justify-center">
                    <p className="text-primary font-bold text-xl">TK. {sellingPrice}</p>
                    <span className="hidden sm:inline-block">~</span>
                    <p className="text-gray/70 relative after:absolute after:h-[1px] after:w-full after:bg-gray after:left-0 after:top-1/2 after:-rotate-12 hidden sm:inline-block">TK. {originalPrice}</p>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;