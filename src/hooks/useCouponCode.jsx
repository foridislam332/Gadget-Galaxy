import useAxiosSecure from './useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const useCouponCode = () => {
    const [axiosSecure] = useAxiosSecure();
    const { data: couponData = [], isLoading: loading, refetch } = useQuery({
        queryKey: ['couponData'],
        queryFn: async () => {
            const res = await axiosSecure.get('/coupon');
            return res.data;
        },
    });

    return [couponData, loading, refetch];
};

export default useCouponCode;