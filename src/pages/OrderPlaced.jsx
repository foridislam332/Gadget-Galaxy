import { Helmet } from "react-helmet";
import Breadcrumbs from "../components/Common/Breadcrumbs";

import checkImg from '../assets/check.png';
import { Link } from "react-router-dom";

const OrderPlaced = () => {
    return (
        <>
            <Helmet>
                <title>Order Placed - Gadget Galaxy</title>
            </Helmet>

            <Breadcrumbs title='Order Placed' />

            <section className="py-20">
                <div className="container">
                    <div className="text-center w-[450px] mx-auto bg-primary/10 rounded-2xl py-10">
                        <figure>
                            <img src={checkImg} alt="check" className="mx-auto w-20" />
                        </figure>

                        <h2 className="text-4xl mt-5 font-semibold text-primary">Order Placed!</h2>
                        <p className="text-xl text-lightGray mt-3">Thank you so much for your order.</p>

                        <Link to='/dashboard/my_orders' className="mt-10 block bg-dark hover:bg-primary text-white font-bold px-6 py-2 w-fit mx-auto rounded duration-300">View My Orders</Link>
                    </div>
                </div>
            </section>
        </>
    );
};

export default OrderPlaced;