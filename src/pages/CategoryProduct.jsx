import { useState } from "react";
import { Helmet } from "react-helmet";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import Breadcrumbs from "../components/Common/Breadcrumbs";
import ProductSkeleton from "../components/Skeleton/ProductSkeleton";
import ProductCard from "../components/Common/ProductCard";
import useAxiosSecure from "../hooks/useAxiosSecure";
import Pagination from "../components/Common/Pagination";

const CategoryProduct = () => {
    const [axiosSecure] = useAxiosSecure();

    const size = 8;
    const [page, setPage] = useState(1);
    const [count, setCount] = useState(0);
    const [pageCount, setPageCount] = useState(0);

    const { category } = useParams();

    const { data: productData = [], isLoading: loading } = useQuery({
        queryKey: [page, category],
        queryFn: async () => {
            const res = await axiosSecure.get(`/all-product?page=${page}&size=${size}`, {
                params: {
                    category: category ? category : undefined
                },
            });
            const count = res.data.count;
            const pageNumber = Math.ceil(count / size);
            setCount(count);
            setPageCount(pageNumber);
            return res.data.products;
        },
    });
    return (
        <>
            <Helmet>
                <title>{category} - Gadget Galaxy</title>
            </Helmet>

            <Breadcrumbs title='Categories' />

            <section className="mt-10 pb-20">
                <div className="container">
                    <h1 className="text-center text-3xl md:text-5xl font-semibold text-primary underline">{category}</h1>

                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 pt-20 pb-10">
                        {
                            loading ? <>
                                <ProductSkeleton />
                                <ProductSkeleton />
                                <ProductSkeleton />
                                <ProductSkeleton />
                                <ProductSkeleton />
                            </> :
                                productData.length > 0 ? productData?.map((item, i) => <ProductCard key={i} item={item} />) : <p className="col-span-5 text-center text-gray font-semibold text-xl">No products found in this category!</p>
                        }
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

export default CategoryProduct;