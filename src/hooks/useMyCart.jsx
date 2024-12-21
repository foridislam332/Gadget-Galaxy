import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useMyCart = () => {
    const [axiosSecure] = useAxiosSecure();
    const { user } = useAuth();
    const email = user?.email;

    const { data: myCarts = [], isLoading: loading, refetch } = useQuery({
        queryKey: ['myCarts', email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/carts/${email}`);
            return res.data;
        },
    });

    return [myCarts, loading, refetch];
};

export default useMyCart;