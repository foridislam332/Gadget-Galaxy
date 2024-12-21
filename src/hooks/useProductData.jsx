import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useProductData = () => {
    const [axiosSecure] = useAxiosSecure();
    const { data: productData = [], isLoading: loading, refetch } = useQuery({
        queryKey: ['productData'],
        queryFn: async () => {
            const res = await axiosSecure.get('/products');
            return res.data;
        },
    });

    return [productData, loading, refetch];
};

export default useProductData;