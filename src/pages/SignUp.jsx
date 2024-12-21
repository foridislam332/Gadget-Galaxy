import { Helmet } from 'react-helmet';
import { useForm } from 'react-hook-form';
import useAuth from "../hooks/useAuth";
import Swal from "sweetalert2";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import Breadcrumbs from '../components/Common/Breadcrumbs';
import useAxiosSecure from '../hooks/useAxiosSecure';

import SocialLogin from '../components/Common/SocialLogin';

const SignUp = () => {
    const [axiosSecure] = useAxiosSecure();
    const { signUpUser, profileUpdate, loading, setLoading } = useAuth();
    const { register, handleSubmit, watch, formState: { errors } } = useForm();

    // navigate
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || '/';

    // Password validation regex
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

    // sign up
    const onSubmit = (data) => {
        if (!passwordRegex.test(data.password)) {
            return toast.error("Password must be at least 8 characters, include uppercase, lowercase, a number, and a special character.", {
                style: {
                    borderRadius: '10px',
                    background: '#333',
                    color: '#fff',
                },
                duration: 3000,
            });
        }

        const status = data.role === 'buyer' ? 'approved' : 'pending';

        signUpUser(data.email, data.password)
            .then((result) => {
                profileUpdate(result.user, data.name)
                    .then(() => {
                        const userData = { name: data.name, email: data.email, role: data.role, status, createdBy: 'google' };

                        axiosSecure.post('/users', userData)
                            .then(() => {
                                Swal.fire({
                                    position: "center",
                                    icon: "success",
                                    title: "Sign Up successfully!",
                                    showConfirmButton: false,
                                    timer: 2500
                                });
                                setLoading(false);
                                navigate(from, { replace: true });
                                window.location.reload();
                            }).catch(error => {
                                console.error(error);
                                setLoading(false);
                            });
                    })
                    .catch((error) => {
                        setLoading(false);
                        toast.error(error.code, {
                            style: {
                                borderRadius: '10px',
                                background: '#333',
                                color: '#fff',
                            },
                            autoClose: 4000
                        });
                    });
            })
            .catch((error) => {
                setLoading(false);
                toast.error(error.code, {
                    style: {
                        borderRadius: '10px',
                        background: '#333',
                        color: '#fff',
                    },
                    autoClose: 4000
                });
            });
    };

    return (
        <>
            <Helmet>
                <title>Sign Up - Gadget Galaxy</title>
            </Helmet>

            <Breadcrumbs title='Sign Up' />

            <section className="py-20">
                <div className="container">
                    <form onSubmit={handleSubmit(onSubmit)} className="w-full mx-auto max-w-md bg-white shadow-md rounded-md px-8 pt-6 pb-8 mb-4">
                        <h2 className="text-3xl mb-8 text-center font-semibold mt-3 text-dark">Create an account</h2>

                        <div className="mb-4">
                            <label htmlFor="name" className="block text-dark font-medium mb-1">Full name*</label>
                            <input
                                id='name'
                                type="text"
                                name="name"
                                {...register("name", { required: true })}
                                placeholder='Enter your name'
                                className={`appearance-none border border-light rounded w-full py-[10px] px-3 font-medium leading-tight focus:outline-primary ${errors.name && 'border-red'}`}
                            />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="email" className="block text-dark font-medium mb-1">Email address*</label>
                            <input
                                id='email'
                                type="email"
                                name="email"
                                {...register("email", { required: true })}
                                placeholder='Enter your email'
                                className={`appearance-none border border-light rounded w-full py-[10px] px-3 font-medium leading-tight focus:outline-primary ${errors.email && 'border-red'}`}
                            />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="password" className="block text-dark font-medium mb-1">Password*</label>
                            <input
                                id='password'
                                type="password"
                                name="password"
                                {...register("password", { required: true })}
                                placeholder='Enter your password'
                                className={`appearance-none border border-light rounded w-full py-[10px] px-3 font-medium leading-tight focus:outline-primary ${errors.password && 'border-red'}`}
                            />
                            {/* Password Hint */}
                            <p className="text-xs text-gray mt-1">
                                Must include 8+ chars, uppercase, number & symbol (e.g., @, #, $).
                            </p>
                        </div>

                        <div className="mb-8">
                            <label htmlFor="role" className="block text-dark font-medium mb-1">Role*</label>
                            <select
                                id="role"
                                {...register("role", { required: true })}
                                className={`appearance-none border border-light rounded w-full py-[10px] px-3 font-medium leading-tight focus:outline-primary ${errors.role && 'border-red'}`}
                            >
                                <option value="" className='text-gray'>Select Role</option>
                                <option value="buyer">Buyer</option>
                                <option value="seller">Seller</option>
                            </select>
                        </div>

                        <div className="flex items-center justify-between gap-5">
                            <button type="submit" className="bg-black hover:bg-primary text-white font-bold py-2 px-4 rounded w-full duration-300">
                                {loading ? 'Loading ...' : 'Sign Up'}
                            </button>
                            <Link to='/login' className="block text-center bg-light text-black hover:bg-primary hover:text-white font-bold py-2 px-4 rounded w-full duration-300">
                                Log In
                            </Link>
                        </div>

                        <div className='flex items-center text-gray gap-3 mt-5 px-5'>
                            <span className='block w-full border-b border-darkWhite'></span>
                            <span>or</span>
                            <span className='block w-full border-b border-darkWhite'></span>
                        </div>

                        {/* Social Login */}
                        <SocialLogin role={watch('role')} />
                    </form>
                </div>
            </section>
        </>
    );
};

export default SignUp;