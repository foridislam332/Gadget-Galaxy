// icons
import { LiaUserEditSolid, LiaUserShieldSolid } from "react-icons/lia";
import { FaRegUser } from "react-icons/fa";
import { PiUser } from "react-icons/pi";

const UserTableRow = ({ item, handleUpdateStatus }) => {
    const { _id, name, email, role, status } = item;

    return (
        <tr className={`hover:bg-dark/10 relative duration-300 group ${status === 'blocked' && 'bg-red/20'}`}>
            <td className="px-4 py-2 border-b border-dark/10">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 shadow-xl flex items-center justify-center bg-primary rounded-full text-white">
                        {
                            name ? <h2 className="text-2xl uppercase">{name?.slice(0, 1)}</h2> : <FaRegUser />
                        }
                    </div>
                    <div className="flex flex-col">
                        <p className="text-blue hover:underline cursor-pointer">{name}</p>
                        <p className="text-sm italic font-light text-gray">{email}</p>
                    </div>
                </div>
            </td>

            <td className="px-4 capitalize text-gray border-b border-dark/10">
                <span className={`text-center capitalize flex items-center gap-2 text-sm bg-primary/20 text-primary w-fit px-3 py-[1px] rounded-full shrink-0 ${status === 'blocked' && 'text-red'}`}>
                    {role === 'buyer' && <PiUser size='16' />}
                    {role === 'seller' && <LiaUserEditSolid size='18' />}
                    {role === 'admin' && <LiaUserShieldSolid size='18' />}
                    {role}
                </span>
            </td>

            <td className="px-4 text-center capitalize text-gray border-b border-dark/10">
                <span className={`text-center mx-auto capitalize flex items-center gap-2 text-sm w-fit px-4 py-[1px] rounded-full shrink-0 ${status === 'pending' && 'bg-orange-400/20 text-orange-400'} ${status === 'approved' && 'bg-green/10 text-green'}`}>
                    {status}
                </span>
            </td>

            <td className="px-4 text-center capitalize text-gray border-b border-dark/10">
                <div className="flex items-center justify-end shrink-0 gap-2">
                    {status === 'pending' &&
                        <button onClick={() => handleUpdateStatus(_id, 'approved')} disabled={status === "approved"} className="py-1 bg-primary/50 hover:bg-primary px-5 text-white rounded-full duration-300">Approve</button>
                    }

                    <button onClick={() => handleUpdateStatus(_id, 'delete')} className="py-1 bg-dark hover:bg-red px-8 text-white rounded-full duration-300">Delete</button>
                </div>
            </td>
        </tr>
    );
};

export default UserTableRow;