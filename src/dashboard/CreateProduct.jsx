import { useEffect, useState } from "react";
import axios from 'axios';
import { Helmet } from "react-helmet";
import { useForm } from "react-hook-form";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { useNavigate } from "react-router-dom";

import DashTitle from "../components/DashComponents/DashTitle";
import PhotoUpload from "../components/DashComponents/PhotoUpload";
import CustomSelectInput from "../components/Common/CustomSelectInput";
import PageLoading from "../components/Common/PageLoading";
import useCategory from "../hooks/useCategory";

import { CgSpinner } from "react-icons/cg";
import useAuth from "../hooks/useAuth";

const CreateProduct = () => {
    const [axiosSecure] = useAxiosSecure();
    const { user } = useAuth();
    const { register, handleSubmit, formState: { errors }, } = useForm();
    const [categoryData, loading] = useCategory();

    const [isLoading, setIsLoading] = useState(false);
    const [ImageFiles, setImageFiles] = useState([]);
    const [photoUrls, setPhotoUrls] = useState([]);

    const [description, setDescription] = useState([]);
    const [category, setCategory] = useState(null);
    const [subcategories, setSubcategories] = useState([]);
    const [selectedSubcategory, setSelectedSubcategory] = useState(null);
    const [type, setType] = useState(null);
    const [availability, setAvailability] = useState({ value: 'For Sale', label: 'For Sale' });

    const navigate = useNavigate();

    useEffect(() => {
        if (category) {
            // Find the selected category's subcategories
            const selectedCategory = categoryData.find(item => item.name === category.value);
            setSubcategories(selectedCategory?.subcategories || []);
        } else {
            setSubcategories([]);
        }
    }, [category, categoryData]);

    const onSubmit = async (data) => {
        if (!ImageFiles || ImageFiles.length === 0) {
            toast.error('Please upload product photo.');
            return;
        }
        if (!description || description.length === 0) {
            toast.error('Please write a Description.');
            return;
        }
        if (!category) {
            toast.error('Please select a Category.');
            return;
        }
        if (!selectedSubcategory) {
            toast.error('Please select a Subcategory.');
            return;
        }

        try {
            setIsLoading(true);
            // photo upload
            const formData = new FormData();
            ImageFiles.forEach(file => { formData.append('images', file.file); });
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/upload-images`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });

            data.images = response.data.images;
            data.description = description;
            data.category = category.value;
            data.selectedSubcategory = selectedSubcategory.value;
            data.type = type.value;
            data.originalPrice = parseFloat(data.originalPrice);
            data.sellingPrice = parseFloat(data.sellingPrice);
            data.quantity = parseInt(data.quantity);
            data.availability = availability.value;
            data.sellerEmail = user?.email;

            await axiosSecure.post('/products', data)
                .then(res => {
                    if (res.data.insertedId) {
                        Swal.fire({
                            position: "center",
                            icon: "success",
                            title: "Product uploaded successfully"
                        });
                        setIsLoading(false);
                        navigate('/dashboard/products')
                    }
                })
        } catch (error) {
            setIsLoading(false);
        }
    };

    if (loading) {
        return <PageLoading />;
    }

    const typeData = [
        "New Products",
        "Trending Products",
        "Popular Products"
    ]
    return (
        <>
            <Helmet>
                <title>Add Product - Dashboard</title>
            </Helmet>

            <div id="create-product">
                <DashTitle title='Add Product' />

                <div className="bg-white rounded-md shadow-2xl p-4 md:p-8 mt-6">
                    {/* photo upload */}
                    <PhotoUpload files={ImageFiles} setFiles={setImageFiles} photoUrls={photoUrls} setPhotoUrls={setPhotoUrls} />

                    <form onSubmit={handleSubmit(onSubmit)}
                        className="mt-6 space-y-6"
                    >

                        {/* Product title */}
                        <div>
                            <label
                                htmlFor="title"
                                className="text-2xl font-medium mb-1 text-dark block"
                            >
                                Title
                            </label>

                            <input
                                id="title"
                                type="text"
                                className={`w-full rounded text-lg border border-darkWhite px-3 py-2 placeholder:font-normal focus:outline-primary ${errors.title && "border-red"
                                    }`}
                                placeholder="Write your product title (required)"
                                {...register("title", { required: true })}
                            />
                        </div>

                        {/* description */}
                        <div>
                            <label
                                htmlFor="description"
                                className="text-2xl font-medium mb-1 text-dark block"
                            >
                                Description
                            </label>

                            <ReactQuill
                                id="description"
                                value={description}
                                theme="snow"
                                onChange={(value) => setDescription(value)}
                                className=""
                                modules={{
                                    toolbar: [
                                        [{ header: [1, 2, 3, 4, 5, 6, false] }],
                                        ["bold", "italic", "underline"],
                                        ["link", "image"],
                                        [{ list: "ordered" }, { list: "bullet" }],
                                        [{ 'align': [] }]
                                    ],
                                }}
                                placeholder="Write product description (required)"
                                required
                            />
                        </div>

                        {/* ================= category & type ================= */}
                        <div className="flex flex-wrap items-center gap-3">
                            {/* Category */}
                            <div className="w-72">
                                <label htmlFor="category" className="text-2xl font-medium mb-1 text-dark block">
                                    Category
                                </label>
                                <CustomSelectInput
                                    options={categoryData?.map(item => ({ value: item.name, label: item.name }))}
                                    value={category}
                                    setValue={setCategory}
                                    placeholder="Select a category"
                                    isMulti={false}
                                />
                            </div>

                            {/* Subcategory */}
                            <div className="w-72">
                                <label htmlFor="subcategory" className="text-2xl font-medium mb-1 text-dark block">
                                    Subcategory
                                </label>
                                <CustomSelectInput
                                    options={subcategories?.map(sub => ({ value: sub, label: sub }))}
                                    value={selectedSubcategory}
                                    setValue={setSelectedSubcategory}
                                    placeholder="Select a subcategory"
                                    isMulti={false}
                                />
                            </div>

                            {/* Type */}
                            <div className="w-72">
                                <label
                                    htmlFor="type"
                                    className="text-2xl font-medium mb-1 text-dark block"
                                >
                                    Type
                                </label>

                                <CustomSelectInput
                                    options={typeData?.map(item => ({ value: item, label: item }))}
                                    value={type}
                                    setValue={setType}
                                    placeholder="Select an type"
                                    isMulti={false}
                                />
                            </div>
                        </div>

                        {/* ================= pricing ================= */}
                        <div className="flex flex-wrap items-center gap-3">
                            {/* original price */}
                            <div className="w-56">
                                <label
                                    htmlFor="originalPrice"
                                    className="text-2xl font-medium mb-1 text-dark block"
                                >
                                    Original Price
                                </label>

                                <input
                                    id="originalPrice"
                                    type="number"
                                    className={`w-full rounded text-lg border border-darkWhite px-3 py-2 placeholder:font-normal focus:outline-primary ${errors.originalPrice && "border-red"
                                        }`}
                                    placeholder="Original price"
                                    {...register("originalPrice", { required: true })}
                                />
                            </div>

                            {/* selling price */}
                            <div className="w-56">
                                <label
                                    htmlFor="sellingPrice"
                                    className="text-2xl font-medium mb-1 text-dark block"
                                >
                                    Selling Price
                                </label>

                                <input
                                    id="sellingPrice"
                                    type="number"
                                    className={`w-full rounded text-lg border border-darkWhite px-3 py-2 placeholder:font-normal focus:outline-primary ${errors.sellingPrice && "border-red"
                                        }`}
                                    placeholder="Selling price"
                                    {...register("sellingPrice", { required: true })}
                                />
                            </div>

                            {/* quantity */}
                            <div className="w-56">
                                <label
                                    htmlFor="quantity"
                                    className="text-2xl font-medium mb-1 text-dark block"
                                >
                                    Quantity
                                </label>

                                <input
                                    id="quantity"
                                    type="number"
                                    className={`w-full rounded text-lg border border-darkWhite px-3 py-2 placeholder:font-normal focus:outline-primary ${errors.quantity && "border-red"
                                        }`}
                                    placeholder="Quantity (required)"
                                    {...register("quantity", { required: true })}
                                />
                            </div>
                        </div>

                        {/* Product Brand */}
                        <div className="w-full md:w-64">
                            <label
                                htmlFor="brand"
                                className="text-2xl font-medium mb-1 text-dark block"
                            >
                                Brand Name
                            </label>

                            <input
                                id="brand"
                                type="text"
                                className={`w-full rounded text-lg border border-darkWhite px-3 py-2 placeholder:font-normal focus:outline-primary ${errors.brand && "border-red"
                                    }`}
                                placeholder="Product brand (required)"
                                {...register("brand", { required: true })}
                            />
                        </div>

                        {/* availability */}
                        <div className="w-72">
                            <label
                                htmlFor="availability"
                                className="text-2xl font-medium mb-1 text-dark block"
                            >
                                Availability
                            </label>

                            <CustomSelectInput
                                options={['For Sale', 'Not For Sale'].map(item => ({ value: item, label: item }))}
                                value={availability}
                                setValue={setAvailability}
                                placeholder="Select an availability"
                                isMulti={false}
                            />

                        </div>

                        <button type="submit" className="bg-dark text-white px-5 py-2">Add Product</button>
                    </form>
                </div>
            </div>

            {isLoading && <div className="fixed top-0 left-0 h-screen w-full backdrop-blur bg-white/20 z-50 flex flex-col items-center justify-center">
                <CgSpinner className="animate-spin text-4xl md:text-7xl" />
                <p className="text-2xl mt-2">Please wait...</p>
            </div>}
        </>
    );
};

export default CreateProduct;