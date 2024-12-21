import useAxiosSecure from '../../hooks/useAxiosSecure';
import useUsersData from '../../hooks/useUsersData';
import Swal from 'sweetalert2';
import MakeAdmin from './MakeAdmin';
import PageLoading from '../../components/Common/PageLoading';
import MakeSeller from './MakeSeller';
import useAuth from '../../hooks/useAuth';


const ManageUserRole = () => {
    const [axiosSecure] = useAxiosSecure();
    const { user } = useAuth();

    const [userData, loading, refetch] = useUsersData();

    // update user role
    const handleUpdateRole = (id, role) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: `Yes, Make it ${role}!`
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.patch(`/users/role/${id}`, { role })
                    .then(data => {
                        if (data.data.modifiedCount > 0) {
                            Swal.fire({
                                title: "Success!",
                                text: `User has been ${role}`,
                                icon: "success",
                                showConfirmButton: false,
                                timer: 2500
                            });
                            refetch();
                        }
                    })
            }
        });
    }

    if (loading) {
        return <PageLoading />
    }
    return (
        <div className="mt-6 bg-white p-5 shadow-xl rounded-md">
            <h1 className="mb-6 w-fit px-5 text-xl font-medium border-b border-darkWhite pb-2">Manage user role</h1>

            <div className="grid gmd:rid-cols-2 gap-8">
                <MakeSeller userData={userData} handleUpdateRole={handleUpdateRole} />

                <MakeAdmin userData={userData} handleUpdateRole={handleUpdateRole} email={user?.email} />
            </div>
        </div>
    );
};

export default ManageUserRole;