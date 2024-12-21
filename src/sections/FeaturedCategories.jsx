import Marquee from "react-fast-marquee";
import CategorySkeleton from "../components/Skeleton/CategorySkeleton";
import CategoryCard from "../components/Common/CategoryCard";

const FeaturedCategories = () => {
    const loading = false;
    const categoryData = [
        {
            name: 'Wireless earbuds',
            photo: 'https://spacingtech.com/html/electon/electon/img/cat/home-1-cate1.jpg'
        },
        {
            name: 'Portable speaker',
            photo: 'https://spacingtech.com/html/electon/electon/img/cat/home-1-cate2.jpg'
        },
        {
            name: 'Air conditioner',
            photo: 'https://spacingtech.com/html/electon/electon/img/cat/home-1-cate3.jpg'
        },
        {
            name: 'Ev charging plug',
            photo: 'https://spacingtech.com/html/electon/electon/img/cat/home-1-cate4.jpg'
        },
        {
            name: 'DVD player slot ',
            photo: 'https://spacingtech.com/html/electon/electon/img/cat/home-1-cate5.jpg'
        },
        {
            name: '360 cemera',
            photo: 'https://spacingtech.com/html/electon/electon/img/cat/home-1-cate6.jpg'
        },
    ]
    return (
        <section className="py-10 bg-light">
            <div className="container">
                {
                    loading ? <Marquee
                        pauseOnHover={true}
                        gradient={true}
                        gradientColor='rgb(248, 251, 253)'
                        gradientWidth={200}
                        speed='0'
                    >
                        <CategorySkeleton />
                        <CategorySkeleton />
                        <CategorySkeleton />
                        <CategorySkeleton />
                        <CategorySkeleton />
                        <CategorySkeleton />
                    </Marquee> : <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-6 gap-4 sm:gap-8">
                        {
                            categoryData?.map((item, i) => <CategoryCard key={i} item={item} />)
                        }
                    </div>
                }
            </div>
        </section>
    );
};

export default FeaturedCategories;