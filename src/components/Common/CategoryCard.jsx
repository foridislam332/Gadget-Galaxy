
const CategoryCard = ({ item }) => {
    const { name, photo } = item;

    return (
        <button className=" group duration-300 w-full mx-auto flex flex-col items-center justify-center">
            <div className='bg-white sm:w-52 w-36 sm:h-52 h-36 rounded-full overflow-hidden'>
                <img className='relative w-full h-full object-cover mx-auto group-hover:scale-110 duration-300' src={photo} alt="" />
            </div>

            <h6 className="text-center font-semibold text-dark text-lg group-hover:text-primary mt-4 duration-300">{name}</h6>
        </button>
    );
};

export default CategoryCard;