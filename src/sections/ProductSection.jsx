import { Link } from "react-router-dom";
import ProductCard from "../components/Common/ProductCard";
import SectionTitle from "../components/Common/SectionTitle";
import ProductSkeleton from "../components/Skeleton/ProductSkeleton";

import { IoIosArrowRoundForward } from "react-icons/io";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../hooks/useAuth";

const ProductSection = ({ type, title }) => {
    const [axiosSecure] = useAxiosSecure();
    const { currentUser } = useAuth();
    const role = currentUser?.role;

    const size = 5;
    const { data: productData = [], isLoading: loading } = useQuery({
        queryKey: [title],
        queryFn: async () => {
            const res = await axiosSecure.get(`/all-product?page=${1}&size=${size}`, {
                params: {
                    type: title === 'All Products' ? undefined : title
                },
            });
            return res.data.products;
        },
    });

    return (
        <div className="container">
            <SectionTitle type={type} title={title} />

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 mt-16">
                {
                    loading ? <>
                        <ProductSkeleton />
                        <ProductSkeleton />
                        <ProductSkeleton />
                        <ProductSkeleton />
                        <ProductSkeleton />
                    </> :
                        productData.map((item, i) => <ProductCard key={i} item={item} role={role} />)
                }
            </div>
        </div>
    );
};

export default ProductSection;