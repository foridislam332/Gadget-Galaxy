import useAxiosSecure from './useAxiosSecure';
import useAuth from './useAuth';
import { useQuery } from '@tanstack/react-query';

const useCurrentUser = () => {
    const [axiosSecure] = useAxiosSecure();
    const { user } = useAuth();
    const email = user?.email;

    const { data: currentUser = [], isLoading: loading, refetch } = useQuery({
        queryKey: ['currentUser'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/${email}`);
            return res.data;
        },
    });

    return [currentUser, loading, refetch];
};

export default useCurrentUser;