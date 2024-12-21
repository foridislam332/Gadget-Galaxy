import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useMyWishlist = () => {
    const [axiosSecure] = useAxiosSecure();
    const { user } = useAuth();
    const email = user?.email;

    const { data: myWishlist = [], isLoading: loading, refetch: wishRefetch } = useQuery({
        queryKey: ['myWishlist', email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/wishlist/${email}`);
            return res.data;
        },
    });

    return [myWishlist, loading, wishRefetch];
};

export default useMyWishlist;