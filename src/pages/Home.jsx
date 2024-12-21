import { Helmet } from "react-helmet";
import HeroBanner from "../sections/HeroBanner";
import FeaturedCategories from "../sections/FeaturedCategories";
import ProductSection from "../sections/ProductSection";
import Testimonial from "../sections/Testimonial";
import Services from "../sections/Services";

const Home = () => {
    return (
        <>
            <Helmet>
                <title>Gadget Galaxy</title>
            </Helmet>

            <HeroBanner />
            <FeaturedCategories />

            <section className="py-20 bg-light">
                <ProductSection type='Browse collection' title='Trending Products' />
            </section>
            <section className="py-20">
                <ProductSection type='Featured collection' title='Popular Products' />
            </section>
            <section className="py-20 bg-light">
                <ProductSection type='Browse collection' title='New Products' />
            </section>
            <section className="py-20">
                <ProductSection type='Browse collection' title='All Products' />
            </section>
            <Testimonial />
            <Services />
        </>
    );
};

export default Home;