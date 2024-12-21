import { Navigate, useLocation } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import PageLoading from '../components/Common/PageLoading';
import Swal from 'sweetalert2';

const PrivateRoute = ({ children }) => {
    const { currentUser, loading, logOut } = useAuth();
    const location = useLocation();

    if (loading) {
        return (
            <div className='h-screen w-full flex items-center justify-center'>
                <PageLoading />
            </div>
        );
    }

    if (currentUser.email && currentUser.status === 'approved') {
        return children;
    } else if (currentUser.email && currentUser.status === 'pending') {
        Swal.fire({
            position: 'center',
            icon: 'info',
            title: 'Your Account Not Ready!',
            text: 'Please contact support for further assistance.',
        })
        return <Navigate to='/' replace />
    } else if (currentUser.email && currentUser.status === 'blocked') {
        Swal.fire({
            position: 'center',
            icon: 'error',
            title: 'Account Deactivated!',
            text: 'Your account has been deactivated. Please contact support for further assistance.',
        }).then(() => {
            logOut();
        });
    }

    return <Navigate to='/login' state={{ from: location }} replace />;
};

export default PrivateRoute;