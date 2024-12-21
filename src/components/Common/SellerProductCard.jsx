import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const SellerProductCard = ({ item, refetch }) => {
    const { _id, title, images, originalPrice, sellingPrice, category } = item;

    const [axiosSecure] = useAxiosSecure();
    const handleDeleteProduct = () => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/products/${_id}`)
                    .then(res => {
                        if (res.data.deletedCount) {
                            refetch()
                            Swal.fire({
                                title: "Deleted!",
                                text: "Product has been deleted.",
                                icon: "success",
                                showConfirmButton: false,
                                timer: 2000
                            });
                        }
                    })
            }
        });
    }
    return (
        <div className="shadow-md hover:shadow-2xl hover:-translate-y-2 group duration-300">
            <figure className="relative">
                <img src={images[0]} className="h-48 2xl:h-64 w-full object-cover" alt={title} />

                <div className="absolute flex items-center gap-3 bg-white text-dark w-full left-0 bottom-0 px-2 py-3 font-semibold scale-y-0 group-hover:scale-y-100 duration-300">
                    <Link to={`/dashboard/edit/${_id}`} className="bg-primary rounded-md py-1 w-full text-white text-lg text-center">Edit</Link>
                    <button onClick={handleDeleteProduct} className="bg-red rounded-md py-1 w-full text-white text-lg">Delete</button>
                </div>
            </figure>

            <div className="p-3">
                <h5 className="text-gray font-medium text-sm group-hover:underline">{category}</h5>

                <Link to={`/products/${_id}`} className="mt-1 mb-1 block font-medium text-dark line-clamp-2 group-hover:text-primary h-14 duration-300">{title}</Link>

                <div className="flex flex-wrap items-center justify-between text-sm gap-x-3">
                    <p className="text-primary">
                        <span className="text-dark">Original:</span>  TK. {originalPrice}
                    </p>
                    <p className="text-primary font-medium">
                        <span className="text-dark">Selling:</span>  TK. {sellingPrice}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default SellerProductCard;