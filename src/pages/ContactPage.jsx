import { Helmet } from "react-helmet";
import { useForm } from "react-hook-form";
import Breadcrumbs from "../components/Common/Breadcrumbs";

const ContactPage = () => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();

    const onSubmit = (data) => {
        console.log(data);
        reset();
        alert('Your message has been sent successfully!');
    };

    return (
        <>
            <Helmet>
                <title>Contact Us - Gadget Galaxy</title>
            </Helmet>

            <Breadcrumbs title='Contact Us' />

            <div className="min-h-screen bg-light py-10 px-6">
                <div className="max-w-lg mx-auto">
                    <h1 className="text-4xl font-bold text-center mb-6 text-dark">Contact Us</h1>
                    <p className="text-center text-lightGray mb-8">
                        Have a question or feedback? Fill out the form below, and we’ll get back to you as soon as possible.
                    </p>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                        <div>
                            <label htmlFor="name" className="block text-lg font-medium text-dark">Name</label>
                            <input
                                id="name"
                                type="text"
                                {...register('name', { required: "Name is required" })}
                                className={`w-full mt-2 px-4 py-2 border ${errors.name ? 'border-red' : 'border-darkWhite'} rounded shadow-sm focus:outline-primary`}
                                placeholder="Enter your name"
                            />
                            {errors.name && <p className="text-red text-sm mt-1">{errors.name.message}</p>}
                        </div>

                        <div>
                            <label htmlFor="email" className="block text-lg font-medium text-dark">Email</label>
                            <input
                                id="email"
                                type="email"
                                {...register('email', { required: "Email is required", pattern: { value: /^\S+@\S+$/i, message: "Enter a valid email" } })}
                                className={`w-full mt-2 px-4 py-2 border ${errors.email ? 'border-red' : 'border-darkWhite'} rounded shadow-sm focus:outline-primary`}
                                placeholder="Enter your email"
                            />
                            {errors.email && <p className="text-red text-sm mt-1">{errors.email.message}</p>}
                        </div>

                        <div>
                            <label htmlFor="message" className="block text-lg font-medium text-dark">Message</label>
                            <textarea
                                id="message"
                                {...register('message', { required: "Message is required" })}
                                rows="5"
                                className={`w-full mt-2 px-4 py-2 border ${errors.message ? 'border-red' : 'border-darkWhite'} rounded shadow-sm focus:outline-primary`}
                                placeholder="Write your message"
                            />
                            {errors.message && <p className="text-red text-sm mt-1">{errors.message.message}</p>}
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-primary text-light font-medium py-2 px-4 rounded shadow hover:bg-secondary hover:text-dark focus:outline-none duration-300"
                        >
                            Send Message
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
};

export default ContactPage;