import { useState } from "react";
import { Helmet } from "react-helmet";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import Select from "react-select";
import Breadcrumbs from "../components/Common/Breadcrumbs";
import ProductSkeleton from "../components/Skeleton/ProductSkeleton";
import ProductCard from "../components/Common/ProductCard";
import useAxiosSecure from "../hooks/useAxiosSecure";
import Pagination from "../components/Common/Pagination";
import { CiFilter } from "react-icons/ci";

const ProductCollection = () => {
    const [axiosSecure] = useAxiosSecure();

    const size = 10;
    const [page, setPage] = useState(1);
    const [count, setCount] = useState(0);
    const [pageCount, setPageCount] = useState(0);
    const [categories, setCategories] = useState([]);
    const [brands, setBrands] = useState([]);

    const [searchTerm, setSearchTerm] = useState("");
    const [sortOrder, setSortOrder] = useState(null); // Sort selection
    const [selectedCategory, setSelectedCategory] = useState(null); // Category selection
    const [selectedBrand, setSelectedBrand] = useState(null); // Brand selection

    const { type } = useParams();

    const { data: productData = [], isLoading: loading } = useQuery({
        queryKey: [page, type, searchTerm, sortOrder, selectedCategory, selectedBrand],
        queryFn: async () => {
            const res = await axiosSecure.get(`/all-product?page=${page}&size=${size}`, {
                params: {
                    type: type === "All Products" ? undefined : type,
                    search: searchTerm || undefined,
                    sort: sortOrder?.value || undefined,
                    category: selectedCategory?.value || undefined,
                    brand: selectedBrand?.value || undefined,
                },
            });
            const count = res.data.count;
            const pageNumber = Math.ceil(count / size);
            setCount(count);
            setPageCount(pageNumber);
            setCategories(res.data.categories);
            setBrands(res.data.brands);

            return res.data.products;
        },
    });

    // Options for the Select component
    const sortOptions = [
        { value: "", label: "Sort by Price" },
        { value: "asc", label: "Price: Low to High" },
        { value: "desc", label: "Price: High to Low" },
    ];

    const categoryOptions = [
        { value: "", label: "Filter by Category" },
        ...categories.map(category => ({ label: category, value: category })),
    ];

    const brandOptions = [
        { value: "", label: "Filter by Brand" },
        ...brands.map(brand => ({ label: brand, value: brand })),
    ];

    const clearFilters = () => {
        setSearchTerm("");
        setSortOrder(null);
        setSelectedCategory(null);
        setSelectedBrand(null);
        setPage(1);
    };

    // If any filter is applied
    const isFilterApplied = searchTerm || sortOrder || selectedCategory || selectedBrand;

    return (
        <>
            <Helmet>
                <title>{type === 'All Products' ? 'Products' : type} - Gadget Galaxy</title>
            </Helmet>

            <Breadcrumbs title="Products" />

            <section className="mt-10 pb-20">
                <div className="container">
                    {type !== 'All Products' && <h1 className="text-center text-3xl md:text-5xl font-semibold text-primary underline">{type}</h1>}

                    {/* Filters Section */}
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-4 rounded shadow mt-8">
                        <div className="w-full md:w-80">
                            {/* Search */}
                            <input
                                type="text"
                                value={searchTerm}
                                onChange={(e) => {
                                    setSearchTerm(e.target.value);
                                    setPage(1);
                                }}
                                placeholder="Search by product name"
                                className="w-full px-4 py-2 border border-darkWhite rounded focus:outline-primary"
                            />
                        </div>

                        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                            {/* Category Filter */}
                            <Select
                                options={categoryOptions}
                                value={selectedCategory}
                                placeholder="Filter by Category"
                                onChange={(newValue) => {
                                    setSelectedCategory(newValue);
                                    setPage(1);
                                }}
                                className="w-full sm:w-52"
                            />

                            {/* Brand Filter */}
                            <Select
                                options={brandOptions}
                                value={selectedBrand}
                                placeholder="Filter by Brand"
                                onChange={(newValue) => {
                                    setSelectedBrand(newValue);
                                    setPage(1);
                                }}
                                className="w-full sm:w-44"
                            />

                            {/* Sort */}
                            <Select
                                options={sortOptions}
                                value={sortOrder}
                                placeholder="Sort by Price"
                                onChange={(newValue) => {
                                    setSortOrder(newValue);
                                    setPage(1);
                                }}
                                className="w-full sm:w-44"
                            />

                            {/* Clear Filters Button */}
                            {isFilterApplied && (
                                <button
                                    onClick={clearFilters}
                                    className="px-4 py-2 bg-light text-dark rounded hover:bg-gray/60 flex items-center gap-1 duration-300"
                                >
                                    <CiFilter size={20} /> Clear
                                </button>
                            )}
                        </div>
                    </div>

                    {/* Products Grid */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 pt-10 pb-10">
                        {loading ? (
                            <>
                                <ProductSkeleton />
                                <ProductSkeleton />
                                <ProductSkeleton />
                                <ProductSkeleton />
                                <ProductSkeleton />
                            </>
                        ) : productData.length > 0 ? (
                            productData.map((item, i) => <ProductCard key={i} item={item} />)
                        ) : (
                            <p className="col-span-5 text-center text-gray font-semibold text-xl">
                                No products found!
                            </p>
                        )}
                    </div>

                    {/* Pagination */}
                    {count > size && (
                        <Pagination page={page} setPage={setPage} size={size} pageCount={pageCount} count={count} />
                    )}
                </div>
            </section>
        </>
    );
};

export default ProductCollection;