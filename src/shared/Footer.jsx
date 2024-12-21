import { Link } from "react-router-dom";

// react icons
import { BsTelephone } from "react-icons/bs";
import { FaFacebookF, FaInstagram, FaWhatsapp, FaYoutube } from "react-icons/fa6";
import { MdOutlineAlternateEmail } from "react-icons/md";
import { SlLocationPin } from "react-icons/sl";
import moment from "moment";

// logo
import logo from '../assets/logo.png';

const Footer = () => {
    return (
        <footer className="bg-black">
            <div className="container py-16">
                <div className="grid grid-cols-1 md:grid-cols-5 gap-10 lg:gap-16">

                    <div className="col-span-2 flex flex-col gap-5 items-start max-w-96">
                        <Link to="/" className="text-primary font-medium text-4xl">
                            <img className="w-40" src={logo} alt="Gadget Galaxy" />
                        </Link>

                        <p className="text-gray mb-2 mt-2">At Gadget Galaxy, we strive to provide top-notch products that blend functionality with style</p>

                        {/* social icons */}
                        <div className='flex items-center gap-3'>
                            <Link target='_blank' to='' className='flex items-center justify-center h-10 w-10 rounded-full bg-[#3b5998] hover:bg-white text-white group duration-300'>
                                <FaFacebookF size='18' className='relative group-hover:scale-125 group-hover:text-[#3b5998] duration-300' />
                            </Link>

                            <Link target='_blank' to='' className='flex items-center justify-center h-10 w-10 rounded-full bg-gradient-to-br from-[#f9ce34] via-[#ee2a7b] to-[#6228d7] hover:bg-white text-white group duration-300'>
                                <FaInstagram size='18' className='relative group-hover:scale-[1.2] duration-300' />
                            </Link>

                            <Link target='_blank' to="https://wa.me/" className='flex items-center justify-center h-10 w-10 rounded-full bg-[#25d366] hover:bg-white text-white group duration-300'>
                                <FaWhatsapp size='22' className='relative group-hover:scale-110 group-hover:text-[#25d366] duration-300' />
                            </Link>

                            <Link target='_blank' to='' className='flex items-center justify-center h-10 w-10 rounded-full bg-[#FF0000] hover:bg-white text-white group duration-300'>
                                <FaYoutube size='18' className='relative group-hover:scale-110 group-hover:text-[#FF0000] duration-300' />
                            </Link>
                        </div>
                    </div>

                    <div className="col-span-3 grid grid-cols-1 md:grid-cols-2 gap-5 lg:gap-20">
                        {/* Quick links */}
                        <div>
                            <h1 className="text-2xl font-medium text-white pb-1 border-b border-gray/50">Quick links</h1>
                            <ul className="mt-6 space-y-1 text-gray">
                                <li>
                                    <Link to='/' className="hover:text-white duration-200">Terms & Conditions</Link>
                                </li>
                                <li>
                                    <Link to='/' className="hover:text-white duration-200">Privacy Policy</Link>
                                </li>
                                <li>
                                    <Link to='/about' className="hover:text-white duration-200">About Us</Link>
                                </li>
                                <li>
                                    <Link to='/' className="hover:text-white duration-200">FAQ's</Link>
                                </li>
                                <li>
                                    <Link to='/contact' className="hover:text-white duration-200">Contact Us</Link>
                                </li>
                            </ul>
                        </div>

                        {/* contact us */}
                        <div>
                            <h1 className="text-2xl font-medium text-white pb-1 border-b border-gray/50">Contact</h1>

                            <div className="flex flex-col gap-2 mt-7">
                                <div className="flex items-start gap-3">
                                    <SlLocationPin size='20' className="text-gray shrink-0" />
                                    <p className="text-gray -mt-1">House - 19 & 20, Road - 113/A <br />
                                        Dhaka- 1212, Bangladesh</p>
                                </div>

                                <div className="flex items-center gap-3 mt-5">
                                    <BsTelephone size='19' className="text-gray" />
                                    <p className="text-gray">(+880) 564564656</p>
                                </div>

                                <div className="flex items-center gap-3">
                                    <MdOutlineAlternateEmail size='22' className="text-gray" />
                                    <p className="text-gray">example@gmail.com</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-white shadow-2xl">
                <div className="container">
                    {/* copy write */}
                    <div className="text-center py-2 flex flex-col-reverse md:flex-row items-center justify-center flex-wrap gap-y-2">
                        <p className="text-dark font-semibold">© {moment(new Date()).format('YYYY')} Gadget Galaxy. All Rights Reserved. Created by <Link target="_blank" to='https://forid-hossain.web.app' className="text-primary hover:underline">MD. Forid Hosssain</Link></p>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;