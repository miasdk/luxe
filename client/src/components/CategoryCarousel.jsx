import { Swiper, SwiperSlide } from 'swiper/react';
import { useState, useEffect } from 'react';
import { Navigation, Pagination, Autoplay, Scrollbar} from 'swiper/modules';
import categoryService from '../services/categoryService';
import CategoryCard from './CategoryCard';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import 'swiper/css/scrollbar';

export default function CategoryCarousel() {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const data = await categoryService.fetchAllCategories();
                setCategories(data);
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };

        fetchCategories();
    }, []);

    return (
        <div className="mx-auto mt-5 hidden md:block">
            <Swiper
                modules={[Navigation, Pagination, Autoplay]}
                spaceBetween={0}
                slidesPerView={1}
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
                {categories.map((category) => (
                    <SwiperSlide key={category.id}>
                        <div className="h-full p-2 mb-3 ">
                            <CategoryCard category={category} />
                        </div>
                    </SwiperSlide>
                ))}
                <div className="swiper-scrollbar mt-4 !h-1 !bg-gray-200"></div>
            </Swiper>
        </div>
    );
}

