import { useEffect, useState } from "react";
import axios from 'axios';
import { Helmet } from "react-helmet";
import { useForm } from "react-hook-form";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { useLoaderData, useNavigate } from "react-router-dom";

import DashTitle from "../components/DashComponents/DashTitle";
import PhotoUpload from "../components/DashComponents/PhotoUpload";
import CustomSelectInput from "../components/Common/CustomSelectInput";

import { CgSpinner } from "react-icons/cg";
import useCategory from "../hooks/useCategory";
import PageLoading from "../components/Common/PageLoading";

const EditProduct = () => {
    const productData = useLoaderData();

    const [axiosSecure] = useAxiosSecure();
    const { register, handleSubmit, formState: { errors }, } = useForm();
    const [categoryData, loading] = useCategory();

    const [isLoading, setIsLoading] = useState(false);
    const [ImageFiles, setImageFiles] = useState([]);
    const [photoUrls, setPhotoUrls] = useState(productData?.images);

    const [description, setDescription] = useState(productData?.description);

    const [category, setCategory] = useState({ value: productData?.category, label: productData?.category });

    const [subcategories, setSubcategories] = useState([]);
    const [subcategory, setSubcategory] = useState({ value: productData?.subcategory, label: productData?.subcategory });

    const [type, setType] = useState({ value: productData?.type, label: productData?.type });

    const [availability, setAvailability] = useState({ value: productData?.availability, label: productData?.availability });

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
        if (photoUrls.length === 0 && ImageFiles.length === 0) {
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

        if (!subcategory) {
            toast.error("Please select a Subcategory.");
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

            data.images = [...photoUrls, ...response.data.images];
            data.description = description;
            data.category = category.value;
            data.subcategory = subcategory.value;
            data.type = type.value;
            data.originalPrice = parseFloat(data.originalPrice);
            data.sellingPrice = parseFloat(data.sellingPrice);
            data.quantity = parseInt(data.quantity);
            data.availability = availability.value;
            data.updatedAt = new Date();

            await axiosSecure.patch(`/products/${productData?._id}`, data)
                .then(res => {
                    if (res.data.modifiedCount) {
                        Swal.fire({
                            position: "center",
                            icon: "success",
                            title: "Update successfully"
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
        return <PageLoading />
    }

    const typeData = [
        "New Products",
        "Trending Products",
        "Popular Products"
    ]
    return (
        <>
            <Helmet>
                <title>Edit Product - Dashboard</title>
            </Helmet>

            <div>
                <DashTitle title='Edit Product' />

                <div className="shadow-2xl p-8 mt-6">
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
                                defaultValue={productData?.title}
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
                            {/* category */}
                            <div className="w-72">
                                <label
                                    htmlFor="category"
                                    className="text-2xl font-medium mb-1 text-dark block"
                                >
                                    Category
                                </label>

                                <CustomSelectInput
                                    options={categoryData?.map(item => ({ value: item.name, label: item.name }))}
                                    value={category}
                                    setValue={setCategory}
                                    placeholder="Select an category"
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
                                    value={subcategory}
                                    setValue={setSubcategory}
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

                        {/* ================= pricing & quantity ================= */}
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
                                    defaultValue={productData?.originalPrice}
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
                                    defaultValue={productData?.sellingPrice}
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
                                    defaultValue={productData?.quantity}
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
                                defaultValue={productData?.brand}
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

                        <button type="submit" className="bg-dark text-white px-5 py-2">Save Changes</button>
                    </form>
                </div>
            </div>

            {isLoading && <div className="fixed top-0 left-0 h-screen w-full backdrop-blur-md bg-white/40 z-50 flex flex-col items-center justify-center">
                <CgSpinner className="animate-spin text-4xl md:text-7xl" />
                <p className="text-2xl mt-2">Please wait...</p>
            </div>}
        </>
    );
};

export default EditProduct;