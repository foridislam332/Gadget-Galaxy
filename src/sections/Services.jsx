import { BiSupport } from "react-icons/bi";
import { BsBoxSeam } from "react-icons/bs";
import { ImCreditCard } from "react-icons/im";
import { TbTruckDelivery } from "react-icons/tb";

const Services = () => {
    return (
        <section className="pb-20">
            <div className="container">
                <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                    <div className="text-center py-5 px-3 rounded-md shadow-md bg-light/40 border border-light">
                        <BsBoxSeam size='44' className="mx-auto text-primary mb-5" />

                        <h2 className="font-bold text-xl text-dark mb-2">Product Packaging</h2>
                        <p className="text-lightGray font-medium">Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa</p>
                    </div>

                    <div className="text-center py-5 px-3 rounded-md shadow-md bg-light/40 border border-light">
                        <BiSupport size='44' className="mx-auto text-primary mb-5" />

                        <h2 className="font-bold text-xl text-dark mb-2">24X7 Support</h2>
                        <p className="text-lightGray font-medium">Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa</p>
                    </div>

                    <div className="text-center py-5 px-3 rounded-md shadow-md bg-light/40 border border-light">
                        <TbTruckDelivery size='44' className="mx-auto text-primary mb-5" />

                        <h2 className="font-bold text-xl text-dark mb-2">Delivery in 5 Days</h2>
                        <p className="text-lightGray font-medium">Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa</p>
                    </div>
                    <div className="text-center py-5 px-3 rounded-md shadow-md bg-light/40 border border-light">
                        <ImCreditCard size='44' className="mx-auto text-primary mb-5" />

                        <h2 className="font-bold text-xl text-dark mb-2">Payment Secure</h2>
                        <p className="text-lightGray font-medium">Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa</p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Services;