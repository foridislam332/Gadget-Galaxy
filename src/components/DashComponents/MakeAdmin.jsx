import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import Select from 'react-select';
import { MdDeleteOutline } from "react-icons/md";

const MakeAdmin = ({ userData, handleUpdateRole, email }) => {
    const [optionData, setOptionData] = useState([]);
    const [adminData, setAdminData] = useState([]);
    const [selectUser, setSelectUser] = useState(null);

    useEffect(() => {
        const filteredData = userData.filter(user => user.role !== 'admin' && user.role !== 'super-admin' && user.status !== 'blocked');
        setOptionData(filteredData.map(user => ({ value: user._id, label: user.email })));

        const filteredAdmin = userData.filter(user => user.role === 'admin' && user.email !== email);
        setAdminData(filteredAdmin)
    }, [userData]);


    const handleChange = selectedOption => {
        setSelectUser(selectedOption);
    };

    const handleMakeAdmin = () => {
        if (selectUser === null) {
            return toast.error('Please select user!', {
                autoClose: 2500,
            });
        }

        handleUpdateRole(selectUser.value, 'admin')
    }
    return (
        <div>
            <div className="flex items-end gap-2">
                <div>
                    <h2 className="font-medium text-gray">Make Admin:</h2>
                    <Select
                        value={selectUser}
                        onChange={handleChange}
                        options={optionData}
                        isSearchable={true}
                        placeholder="Search & select user"
                        className="w-full md:w-72"
                    />
                </div>

                <button onClick={handleMakeAdmin} className="py-[7px] px-5 text-white bg-dark rounded hover:bg-blue duration-300">Add</button>
            </div>

            <div className="mt-4 flex items-center flex-wrap gap-x-4 gap-y-2">
                {
                    adminData.map((item, i) => <div
                        key={i}
                        className="flex items-center gap-1"
                        onClick={() => handleUpdateRole(item._id, 'buyer')}
                    >
                        <p className="bg-primary/20 text-primary w-fit px-2 rounded">{item.email}</p>
                        <button className="bg-primary/20 text-primary hover:bg-red hover:text-white w-fit px-1 py-1 rounded duration-300"><MdDeleteOutline /></button>
                    </div>)
                }
            </div>
        </div>
    );
};

export default MakeAdmin;