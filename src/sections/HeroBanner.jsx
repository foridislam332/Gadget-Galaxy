// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// import required modules
import { EffectFade, Autoplay, Pagination, Navigation } from 'swiper/modules';

import banner1 from '../assets/banner/banner1.png'
import banner2 from '../assets/banner/banner2.png'
import banner3 from '../assets/banner/banner3.png'
import banner4 from '../assets/banner/banner4.png'
import banner5 from '../assets/banner/banner5.png'
import banner6 from '../assets/banner/banner6.png'

const BannerSliderSkeleton = () => {
    return (
        <div className="h-[72vh] bg-gray/50 animate-pulse relative">
            <div className="w-full h-full flex items-end justify-center">
                <div className="mt-4 flex space-x-4 pb-5">
                    <div className="animate-pulse rounded bg-dark/50 h-2 w-16"></div>
                    <div className="animate-pulse rounded bg-dark/50 h-2 w-16"></div>
                    <div className="animate-pulse rounded bg-dark/50 h-2 w-16"></div>
                    <div className="animate-pulse rounded bg-dark/50 h-2 w-16"></div>
                </div>
            </div>
            <div className="absolute top-1/2 left-4 -translate-x-1/2 -translate-y-1/2 animate-pulse bg-dark/50 h-20 w-8"></div>

            <div className="absolute top-1/2 -right-4 -translate-x-1/2 -translate-y-1/2 animate-pulse bg-dark/50 h-20 w-8"></div>
        </div>
    );
};

const HeroBanner = () => {
    const loading = false;
    return (
        <section className="bg-white my-6 rounded-xl overflow-hidden duration-300">
            <Swiper
                slidesPerView={1}
                spaceBetween={0}
                autoplay={{
                    delay: 5000,
                    disableOnInteraction: false,
                }}
                effect={'fade'}
                speed={1000}
                grabCursor={true}
                pagination={{
                    clickable: true,
                    el: '.swiper-pagination',
                }}
                loop
                navigation={true}
                modules={[EffectFade, Autoplay, Pagination, Navigation]}
                className="mySwiper h-full"
            >
                {
                    loading ? <SwiperSlide>
                        <BannerSliderSkeleton />
                    </SwiperSlide> : <>
                        <SwiperSlide>
                            <img className='w-full h-full object-cover object-center' src={banner1} alt="" />
                        </SwiperSlide>
                        <SwiperSlide>
                            <img className='w-full h-full object-cover object-center' src={banner2} alt="" />
                        </SwiperSlide>
                        <SwiperSlide>
                            <img className='w-full h-full object-cover object-center' src={banner3} alt="" />
                        </SwiperSlide>
                        <SwiperSlide>
                            <img className='w-full h-full object-cover object-center' src={banner4} alt="" />
                        </SwiperSlide>
                        <SwiperSlide>
                            <img className='w-full h-full object-cover object-center' src={banner6} alt="" />
                        </SwiperSlide>
                        <SwiperSlide>
                            <img className='w-full h-full object-cover object-center' src={banner6} alt="" />
                        </SwiperSlide>
                    </>
                }
                <div className="swiper-pagination hidden md:inline-block"></div>
            </Swiper>
        </section>
    );
};

export default HeroBanner;