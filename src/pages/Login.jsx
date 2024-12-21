import { Helmet } from 'react-helmet';
import { useForm } from 'react-hook-form';
import useAuth from "../hooks/useAuth";
import Swal from "sweetalert2";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

import logo from '../assets/logo.png';
import Breadcrumbs from '../components/Common/Breadcrumbs';
import SocialLogin from '../components/Common/SocialLogin';

const Login = () => {
    const { signIn, resetPassword, loading, setLoading } = useAuth();
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    // navigate
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || '/';

    // login
    const onSubmit = (data) => {
        if (data.password.length < 6) {
            return toast.error("Password must be at least 6 characters", {
                style: {
                    borderRadius: '10px',
                    background: '#333',
                    color: '#fff',
                },
                duration: 3000,
            })
        }

        signIn(data.email, data.password)
            .then(() => {
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Logged In successfully!",
                    showConfirmButton: false,
                    timer: 2500
                });

                navigate(from, { replace: true })
            })
            .catch((error) => {
                setLoading(false)
                if (error.code === 'auth/invalid-credential' || error.code === 'auth/too-many-requests') {
                    toast.error('Invalid email or password!', {
                        style: {
                            borderRadius: '10px',
                            background: '#333',
                            color: '#fff',
                        },
                        autoClose: 4000,
                    });
                } else {
                    toast.error(error.code, {
                        style: {
                            borderRadius: '10px',
                            background: '#333',
                            color: '#fff',
                        },
                        autoClose: 4000,
                    });
                }
            });
    };

    // reset password
    const passReset = () => {
        const email = watch("email")

        if (!/^\S+@\S+\.\S+$/.test(email)) {
            return toast.error("Please enter your valid email!", {
                style: {
                    borderRadius: '10px',
                    background: '#333',
                    color: '#fff',
                },
                duration: 3000,
            })
        }

        resetPassword(email)
            .then(() => {
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Reset password success!",
                    showConfirmButton: true,
                    text: "Check your email!",
                });
            })
            .catch((error) => {
                setLoading(false)
                toast.error(error.code, {
                    style: {
                        borderRadius: '10px',
                        background: '#333',
                        color: '#fff',
                    },
                    autoClose: 4000,
                });
            });
    }
    return (
        <>
            <Helmet>
                <title>Login - Gadget Galaxy</title>
            </Helmet>

            <Breadcrumbs title='Login' />

            <section className="py-20">
                <div className="container">
                    <form onSubmit={handleSubmit(onSubmit)} className="w-full mx-auto max-w-md bg-white shadow-md rounded-md px-8 pt-6 pb-8 mb-4">
                        <figure>
                            <img className='w-36 mx-auto' src={logo} alt="Gadget Galaxy" />
                        </figure>
                        <h2 className="text-3xl mb-8 text-center font-semibold mt-3 text-dark">Login your account</h2>

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
                        <div className="mb-1">
                            <label htmlFor="password" className="block text-dark font-medium mb-1">Password*</label>
                            <input
                                id='password'
                                type="password"
                                name="password"
                                {...register("password", { required: true })}
                                placeholder='Enter your password'
                                className={`appearance-none border border-light rounded w-full py-[10px] px-3 font-medium leading-tight focus:outline-primary ${errors.password && 'border-red'}`}
                            />
                        </div>

                        <div className='text-right'>
                            <button onClick={passReset} type='button' className="mb-6 text-gray hover:text-primary hover:underline duration-300">Forgot Password?</button>
                        </div>

                        <div className="flex items-center justify-between gap-5">
                            <button type="submit" className="bg-black hover:bg-primary text-white font-bold py-2 px-4 rounded w-full duration-300">
                                {loading ? 'Loading ...' : 'Log In'}
                            </button>
                            <Link to='/sign_up' className="block text-center bg-light text-black hover:bg-primary hover:text-white font-bold py-2 px-4 rounded w-full duration-300">
                                Sign Up
                            </Link>
                        </div>

                        <div className='flex items-center text-gray gap-3 mt-5 px-5'>
                            <span className='block w-full border-b border-darkWhite'></span>
                            <span>or</span>
                            <span className='block w-full border-b border-darkWhite'></span>
                        </div>

                        <SocialLogin role='buyer' />
                    </form>
                </div>
            </section>
        </>
    );
};

export default Login;