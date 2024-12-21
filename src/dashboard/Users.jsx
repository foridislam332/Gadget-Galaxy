import { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import DashTitle from "../components/DashComponents/DashTitle";
import useAxiosSecure from "../hooks/useAxiosSecure";
import useUsersData from "../hooks/useUsersData";
import Swal from "sweetalert2";
import PageLoading from "../components/Common/PageLoading";
import UserTableRow from "../components/DashComponents/UserTableRow";
import Select from 'react-select';

const Users = () => {
    const [axiosSecure] = useAxiosSecure();
    const [userData, loading, refetch] = useUsersData();
    const [filteredUsers, setFilteredUsers] = useState(userData);
    const [searchName, setSearchName] = useState('');
    const [selectedRole, setSelectedRole] = useState(null);

    useEffect(() => {
        let filtered = userData;

        // Filter by name or email if searchName is not empty
        if (searchName !== '') {
            filtered = filtered.filter(user =>
                user.name?.toLowerCase().includes(searchName.toLowerCase()) ||
                user.email?.toLowerCase().includes(searchName.toLowerCase())
            );
        }

        // Filter by role if selectedRole is not null
        if (selectedRole && selectedRole.value !== 'clear') {
            filtered = filtered.filter(user => user.role === selectedRole.value);
        }

        setFilteredUsers(filtered);
    }, [userData, searchName, selectedRole]);

    // update status
    const handleUpdateStatus = (id, status) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: `Yes, ${status} it!`
        }).then((result) => {
            if (result.isConfirmed) {
                if (status === 'delete') {
                    axiosSecure.delete(`/users/${id}`)
                        .then(data => {
                            if (data.data.deletedCount) {
                                Swal.fire({
                                    title: "Success!",
                                    text: `User has been Deleted`,
                                    icon: "success",
                                    showConfirmButton: false,
                                    timer: 2000
                                });
                                refetch();
                            }
                        })
                } else {
                    axiosSecure.patch(`/users/status/${id}`, { status })
                        .then(data => {
                            if (data.data.modifiedCount > 0) {
                                Swal.fire({
                                    title: "Success!",
                                    text: `User has been ${status}`,
                                    icon: "success",
                                    showConfirmButton: false,
                                    timer: 2000
                                });
                                refetch();
                            }
                        })
                }
            }
        });
    }

    if (loading) {
        return <PageLoading />
    }

    const roleOptions = [
        { value: 'admin', label: 'Admin' },
        { value: 'seller', label: 'Seller' },
        { value: 'buyer', label: 'Buyer' },
        { value: 'clear', label: 'Clear selection' }
    ];
    return (
        <>
            <Helmet>
                <title>Users - Dashboard</title>
            </Helmet>

            <div>
                {/* Dashboard title */}
                <DashTitle title='Users' />

                {/* filter bar */}
                <div className="mt-8 bg-white rounded-md shadow-2xl p-5 flex flex-wrap items-center justify-between gap-4">
                    <p className="font-semibold text-dark text-xl">Total User: {userData.length}</p>

                    <div className="flex items-center flex-wrap gap-4">
                        <input
                            type="text"
                            placeholder="Search by name or email"
                            value={searchName}
                            onChange={e => setSearchName(e.target.value)}
                            className="border border-gray/40 px-3 py-[6px] rounded w-full md:w-80 focus:outline-primary"
                        />

                        <Select
                            options={roleOptions}
                            value={selectedRole}
                            placeholder="Filter by role"
                            onChange={newValue => {
                                setSelectedRole(newValue.value === 'clear' ? null : newValue);
                            }}
                            className="w-full md:w-44"
                        />
                    </div>
                </div>

                {/* table */}
                <div className="bg-white md:p-5 shadow-xl rounded-md my-6">
                    {
                        !loading && <div className='overflow-x-auto rounded-t-md'>
                            <table className="table min-w-[800px] w-full border border-dark/10 mt-1 border-separate rounded-md">
                                <thead className="border-b border-dark/10 border-separate">
                                    <tr className="uppercase text-gray">
                                        <th className="py-3 px-4 text-left border-b border-dark/10 font-medium">User</th>
                                        <th className="py-3 px-4 text-left border-b border-dark/10 font-medium">Role</th>
                                        <th className="py-3 px-4 text-center border-b border-dark/10 font-medium">status</th>
                                        <th className="py-3 px-4 text-right border-b border-dark/10 font-medium">
                                            <span className="mr-5">Action</span>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="font-medium">
                                    {
                                        filteredUsers.length > 0 ? filteredUsers?.map((item) => <UserTableRow
                                            key={item._id}
                                            item={item}
                                            handleUpdateStatus={handleUpdateStatus}
                                        />) : <p className="px-3 py-2">No data found!</p>
                                    }
                                </tbody>
                            </table>
                        </div>
                    }
                </div>
            </div>
        </>
    );
};

export default Users;