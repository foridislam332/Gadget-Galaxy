import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from './useAxiosSecure';

const useCategory = () => {
    const [axiosSecure] = useAxiosSecure();
    const { data: categoryData = [], isLoading: loading, refetch } = useQuery({
        queryKey: ['categoryData'],
        queryFn: async () => {
            const res = await axiosSecure.get('/category');
            return res.data;
        },
    });

    return [categoryData, loading, refetch];
};

export default useCategory;