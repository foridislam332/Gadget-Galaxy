import SectionTitle from "../components/Common/SectionTitle";
import TestimonialCard from "../components/Common/TestimonialCard";

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

// import required modules
import { Autoplay, Pagination } from 'swiper/modules';

import bgImg from '../assets/hexagon.svg'

const Testimonial = () => {
    return (
        <section style={{ backgroundImage: `url(${bgImg})` }} className="mb-20 bg-fixed bg-cover bg-no-repeat">
            <div className="py-20 bg-white/70">
                <div className="container">
                    <SectionTitle title='Testimonial' />

                    <Swiper
                        slidesPerView={1}
                        spaceBetween={10}
                        pagination={{
                            clickable: true,
                        }}
                        grabCursor={true}
                        loop
                        breakpoints={{
                            640: {
                                slidesPerView: 2,
                                spaceBetween: 20,
                            },
                            768: {
                                slidesPerView: 3,
                                spaceBetween: 20,
                            },
                            1024: {
                                slidesPerView: 4,
                                spaceBetween: 30,
                            },
                        }}
                        modules={[Autoplay, Pagination]}
                        className="mySwiper mt-10"
                    >
                        <SwiperSlide>
                            <TestimonialCard />
                        </SwiperSlide>
                        <SwiperSlide>
                            <TestimonialCard />
                        </SwiperSlide>
                        <SwiperSlide>
                            <TestimonialCard />
                        </SwiperSlide>
                        <SwiperSlide>
                            <TestimonialCard />
                        </SwiperSlide>
                        <SwiperSlide>
                            <TestimonialCard />
                        </SwiperSlide>
                        <SwiperSlide>
                            <TestimonialCard />
                        </SwiperSlide>
                    </Swiper>
                </div>
            </div>
        </section>
    );
};

export default Testimonial;