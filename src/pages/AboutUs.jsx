import { Helmet } from "react-helmet";
import Breadcrumbs from "../components/Common/Breadcrumbs";

const AboutUs = () => {
    return (
        <>
            <Helmet>
                <title>About Us - Gadget Galaxy</title>
            </Helmet>

            <Breadcrumbs title='About Us' />

            <div className="py-20 bg-light px-6">
                <div className="max-w-4xl mx-auto text-center">
                    <h1 className="text-4xl font-bold mb-6 text-dark">About Us</h1>
                    <p className="text-lg text-lightGray leading-relaxed">
                        Welcome to <span className="font-semibold text-primary">Gadget Galaxy</span>, your one-stop-shop for the latest and most innovative mobile gadgets.
                        At Gadget Galaxy, we strive to provide top-notch products that blend functionality with style. Whether you're looking for cutting-edge smartphones,
                        durable accessories, or premium customer service, we have it all!
                    </p>
                    <p className="text-lg text-lightGray mt-4 leading-relaxed">
                        Our mission is to bring technology closer to you with affordable pricing and a seamless shopping experience.
                        Explore our wide range of products and join us in staying ahead in the tech world!
                    </p>
                </div>
            </div>
        </>
    );
};

export default AboutUs;