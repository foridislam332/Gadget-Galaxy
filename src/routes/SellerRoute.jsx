import { Navigate, useLocation } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import PageLoading from '../components/Common/PageLoading';
import Swal from 'sweetalert2';

const SellerRoute = ({ children }) => {
    const { currentUser, loading } = useAuth();
    const location = useLocation();

    if (loading) {
        return <div className='h-screen w-full flex items-center justify-center'>
            <PageLoading />
        </div>
    }

    if (currentUser.role === 'seller') {
        return children;
    } else {
        Swal.fire({
            position: "center",
            icon: "warning",
            title: "Access Denied!",
            text: "This area is restricted to authorized personnel only. If you believe you should have access, please contact your system administrator for assistance. Unauthorized access may result in penalties or legal action.",
        });
        return <Navigate to='/login' state={{ from: location }} replace />;
    }
};

export default SellerRoute;