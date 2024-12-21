import { useState } from "react";
import { Helmet } from "react-helmet";
import { useQuery } from "@tanstack/react-query";
import DashTitle from "../components/DashComponents/DashTitle";
import PageLoading from "../components/Common/PageLoading";

import Select from 'react-select';
import useAxiosSecure from "../hooks/useAxiosSecure";
import Pagination from "../components/Common/Pagination";
import useCategory from "../hooks/useCategory";
import ProductSkeleton from "../components/Skeleton/ProductSkeleton";
import SellerProductCard from "../components/Common/SellerProductCard";
import useAuth from "../hooks/useAuth";

const Products = () => {
    const [axiosSecure] = useAxiosSecure();
    const { user } = useAuth();
    const email = user.email;

    const [categoryData, loading] = useCategory();

    const [searchName, setSearchName] = useState('');
    const [category, setCategory] = useState(null);

    const size = 8;
    const [page, setPage] = useState(1);
    const [count, setCount] = useState(0);
    const [pageCount, setPageCount] = useState(0);

    const { data: productData = [], isLoading: prodLoading, refetch } = useQuery({
        queryKey: [page, email, searchName, category],
        queryFn: async () => {
            const res = await axiosSecure.get(`/all-product?page=${page}&size=${size}`, {
                params: {
                    email: email ? email : undefined,
                    category: category ? category?.value : undefined,
                    searchName: searchName ? searchName : undefined
                },
            });
            const count = res.data.count;
            const pageNumber = Math.ceil(count / size);
            setCount(count);
            setPageCount(pageNumber);
            return res.data.products;
        },
    });

    if (loading) {
        return <PageLoading />
    }

    const createOption = (value) => ({
        value,
        label: value
    });

    const categoryOptions = [
        ...Array.from(
            new Set(categoryData.map((item) => item.name))
        ).map((category) => createOption(category)),
        { value: 'clear', label: 'Clear selection' }
    ];
    return (
        <>
            <Helmet>
                <title>Products - Dashboard</title>
            </Helmet>

            <div className="pb-2">
                <DashTitle title='Products' />

                {/* filter product */}
                <div className="mt-8 bg-white rounded-md shadow-2xl p-5 flex flex-wrap items-center justify-between gap-4">
                    <p className="font-semibold text-dark text-xl">Total Product: {productData.length}</p>

                    <div className="flex items-center flex-wrap gap-4">
                        <input
                            type="text"
                            placeholder="Search product"
                            value={searchName}
                            onChange={e => setSearchName(e.target.value)}
                            className="border border-gray/40 px-3 py-[6px] rounded w-full md:w-64 focus:outline-primary"
                        />

                        <Select
                            options={categoryOptions}
                            value={category}
                            placeholder="Filter by category"
                            onChange={newValue => {
                                setCategory(newValue.value === 'clear' ? null : newValue);
                            }}
                            className="w-full md:w-64"
                        />
                    </div>
                </div>

                {/* products */}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-10 pb-10">
                    {
                        prodLoading ? <>
                            <ProductSkeleton />
                            <ProductSkeleton />
                            <ProductSkeleton />
                            <ProductSkeleton />
                        </> :
                            productData.length > 0 ? productData?.map((item, i) => <SellerProductCard key={i} item={item} refetch={refetch} />) : <p className="col-span-5 text-center text-gray font-semibold text-xl">No products found!</p>
                    }
                </div>

                {/* Pagination */}
                {count > size && (
                    <Pagination page={page} setPage={setPage} size={size} pageCount={pageCount} count={count} />
                )}
            </div>
        </>
    );
};

export default Products;