// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// import required modules
import { EffectFade, Autoplay, Pagination, Navigation } from 'swiper/modules';

const ProductImageSlider = ({ images }) => {
    return (
        <div className='col-span-2 rounded-2xl overflow-hidden'>
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
                }}
                loop
                navigation={true}
                modules={[EffectFade, Autoplay, Pagination, Navigation]}
                className="mySwiper h-full"
            >
                {
                    images.map((item, i) => <SwiperSlide key={i}>
                        <img className='w-full h-full object-cover object-center' src={item} alt="" />
                    </SwiperSlide>)
                }
            </Swiper>
        </div>
    );
};

export default ProductImageSlider;