
const ProductSkeleton = () => {
    return (
        <div className="shadow-md hover:shadow-2xl hover:-translate-y-2 group duration-300 animate-pulse">
            <figure className="relative">
                <div className="h-52 bg-gray"></div>

                <div className="h-10 bg-primary"></div>
            </figure>

            <div className="p-3">
                <div className="h-5 rounded bg-gray/60"></div>

                <div className="h-8 bg-dark mt-3 rounded"></div>

                <div className="h-6 bg-primary mt-3 w-24 rounded"></div>
            </div>
        </div>
    );
};

export default ProductSkeleton;