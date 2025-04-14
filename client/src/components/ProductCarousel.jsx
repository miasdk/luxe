import { Swiper, SwiperSlide } from 'swiper/react';
import { useState, useEffect } from 'react';
import { Navigation, Pagination, Autoplay, Scrollbar } from 'swiper/modules';
import productService from "../services/productService";
import ProductCard from './ProductCard';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import 'swiper/css/scrollbar';


export default function ProductCarousel() {
    const [products, setProducts] = useState([]);



    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const data = await productService.fetchAllProducts();
                setProducts(data);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchProducts();
    }
    , []);

    return (
        <div className="px-5 py-10 mx-auto">
            <h2 className="text-2xl font-bold mb-6 text-center">Featured Products</h2>
            <Swiper
                modules={[Navigation, Pagination, Autoplay, Scrollbar]}
                spaceBetween={20}
                slidesPerView={1}
                autoplay={{ delay: 5000, disableOnInteraction: false }}
                loop={false}
                scrollbar={{ 
                    draggable: true,
                    hide: false,
                    el: '.swiper-scrollbar',
                    snapOnRelease: true

                }}
                breakpoints={{
                    640: {
                        slidesPerView: 2,
                    },
                    768: {
                        slidesPerView: 3,
                    },
                    1024: {
                        slidesPerView: 5,
                    },
                }}
            >
                {products.map((product) => (
                    <SwiperSlide key={product.id}>
                        <div className="h-full p-2">
                            <ProductCard product={product} />
                        </div>
                    </SwiperSlide>
                ))}

                <div className="swiper-scrollbar mt-4 !h-1.5 !bg-gray-200"></div>

            </Swiper>
        </div>
    );
}