import { useEffect, useState } from "react";
import { IoIosArrowDown, IoIosSearch } from "react-icons/io";
import useProductData from "../../hooks/useProductData";
import { Link } from "react-router-dom";

const SearchBar = () => {
    const [productData, loading] = useProductData();
    const [activeCate, setActiveCate] = useState('All Categories');
    const [isOpen, setIsOpen] = useState(false);

    const [filteredProducts, setFilteredProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [isFocused, setIsFocused] = useState(false);

    useEffect(() => {
        let filtered = productData;

        // Filter by name or email if searchName is not empty
        if (searchTerm !== '') {
            filtered = filtered.filter(product =>
                product.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                product.category?.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        // Filter by category if activeCate is not 'All Categories'
        if (activeCate !== 'All Categories') {
            filtered = filtered.filter(product => product.category === activeCate);
        }

        setFilteredProducts(filtered);
    }, [productData, searchTerm, activeCate]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (event.target.closest('#category') === null) {
                setIsOpen(false);
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
            document.body.style.overflow = "auto";
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.body.style.overflow = "auto";
        };
    }, [isOpen]);

    const handleButtonClick = () => {
        setIsOpen(!isOpen);
    };

    const handleCategoryClick = (category) => {
        setActiveCate(category);
        setIsOpen(false);
    };

    return (
        <div className="relative hidden lg:flex items-center gap-3 bg-white rounded-md pl-5 py-3 w-3/4 shadow-md shadow-light">
            <div className="shrink-0">
                <button onClick={handleButtonClick} className="flex items-center gap-2 font-semibold text-primary shrink-0 border-r border-darkWhite pr-3">
                    <span>{activeCate}</span>
                    <IoIosArrowDown />
                </button>
                <ul id='category' className={`absolute bg-white left-0 w-56 max-h-60 text-left rounded overflow-y-auto ${isOpen ? 'top-full opacity-1 visible' : 'top-28 opacity-0 invisible'} z-20 shadow-md`}>
                    <li
                        onClick={() => handleCategoryClick('All Categories')}
                        className={`px-4 py-2 text-dark hover:bg-secondary hover:text-dark cursor-pointer duration-300 ${activeCate === 'All Categories' && 'bg-secondary text-dark'}`}>
                        All Categories
                    </li>

                    {!loading && Array.from(
                        new Set(productData.map((product) => product.category))
                    ).map((category, index) => (
                        <li
                            key={index}
                            onClick={() => handleCategoryClick(category)}
                            className={`px-4 py-2 text-gray hover:bg-secondary hover:text-dark cursor-pointer duration-300 ${activeCate === category && 'bg-secondary text-dark'}`}>
                            {category}
                        </li>
                    ))}
                </ul>
            </div>

            <div className="relative w-full flex items-center">
                <input
                    type="text"
                    className="w-full outline-none text-lg font-medium"
                    placeholder="Search for products..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                />

                <IoIosSearch size='32' className="text-primary absolute right-3" />

                <div className={`absolute bg-white w-full max-h-96 rounded overflow-y-auto left-0 top-12 p-3 shadow-xl grid grid-cols-2 gap-1 ${isFocused ? 'opacity-100 visible' : 'opacity-0 invisible'} duration-300`}>
                    {filteredProducts.length > 0 ? filteredProducts.map((product, index) => (
                        <Link to={`/products/${product._id}`} key={index} className="flex gap-3 hover:shadow-lg bg-white p-2 rounded border border-transparent hover:border-primary duration-300">
                            <figure className="shrink-0 shadow-lg">
                                <img src={product.images[0]} className="w-20 rounded" alt="" />
                            </figure>


                            <div>
                                <h3 className="text-lg font-medium line-clamp-1 text-dark hover:text-primary">{product.title}</h3>
                                <p className="text-sm text-gray underline -mt-[2px]">{product.category}</p>
                                <p className="text-primary font-semibold text-lg mt-1">TK. {product.sellingPrice}</p>
                            </div>
                        </Link>
                    )) : <p className="text-xl font-semibold py-4 text-center w-full col-span-2">No data found!</p>
                    }
                </div>
            </div>
        </div>
    );
};

export default SearchBar;
