import Swal from "sweetalert2";
import { FcGoogle } from "react-icons/fc";
import { toast } from "react-hot-toast";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useLocation, useNavigate } from "react-router-dom";

const SocialLogin = ({ role }) => {
    const [axiosSecure] = useAxiosSecure();
    const { googleSignIn, setLoading } = useAuth();

    // navigate
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || '/';

    const status = role === 'buyer' ? 'approved' : 'pending';

    // google login
    const signInWithGoogle = () => {
        if (!role) {
            return toast.error("Just select role", {
                style: {
                    borderRadius: '10px',
                    background: '#333',
                    color: '#fff',
                },
                duration: 3000,
            });
        }

        googleSignIn()
            .then((res) => {
                const userData = { name: res.user.displayName, email: res.user.email, role, status, createdBy: 'google' };
                if (userData.name) {
                    axiosSecure.post('/users', userData)
                        .then(() => {
                            Swal.fire({
                                position: "center",
                                icon: "success",
                                title: "Logged In successfully!",
                                showConfirmButton: false,
                                timer: 2500
                            });

                            navigate(from, { replace: true })
                            // window.location.reload();
                        }).catch(error => {
                            console.log(error)
                            setLoading(false);
                        })
                }
            })
            .catch((error) => {
                setLoading(false)
                toast.error(error.code, {
                    autoClose: 4000,
                });
            });
    }

    return (
        <button onClick={signInWithGoogle} type="button" className='flex items-center justify-center gap-2 border border-darkWhite hover:bg-dark text-dark hover:text-white w-full py-2 leading-normal rounded mt-4 duration-300'><FcGoogle size='20' /> Continue with Google</button>
    );
};

export default SocialLogin;