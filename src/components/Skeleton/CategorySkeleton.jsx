
const CategorySkeleton = () => {
    return (
        <div className="w-36 mx-3 group block bg-primary/10 shadow-lg my-5 rounded-xl border border-primary text-center duration-300 animate-pulse">
            <div className="h-28">
                <div className="bg-gray/60 h-24 mx-5 mt-5 rounded-md"></div>
            </div>

            <h6 className="h-5 bg-primary mx-3 rounded"></h6>
            <span className="mb-5 block font-medium text-gray mt-2">(00) Items</span>
        </div>
    );
};

export default CategorySkeleton;