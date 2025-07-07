"use client"

import { Swiper, SwiperSlide } from "swiper/react"
import { useState, useEffect, useRef } from "react"
import { Navigation, Pagination, Autoplay } from "swiper/modules"
import { ChevronLeft, ChevronRight } from "lucide-react"
import productService from "../services/productService"
import ProductCard from "./ProductCard"
import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"
import "swiper/css/autoplay"

export default function ProductCarousel({ 
  category, 
  title = "Products",
  filterType = "popular"
}) {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [isBeginning, setIsBeginning] = useState(true)
  const [isEnd, setIsEnd] = useState(false)

  const prevRef = useRef(null)
  const nextRef = useRef(null)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true)
        let data

        if (category) {
          data = await productService.fetchProductsByCategory(category)
        } else {
          data = await productService.fetchAllProducts()
        }

        // Sort products based on filterType
        switch (filterType) {
          case "newest":
            data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
            break
          case "popular":
            data.sort((a, b) => (b.num_likes || 0) - (a.num_likes || 0))
            break
          case "price_low":
            data.sort((a, b) => (a.price || 0) - (b.price || 0))
            break
          case "price_high":
            data.sort((a, b) => (b.price || 0) - (a.price || 0))
            break
          default:
            data.sort((a, b) => (b.num_likes || 0) - (a.num_likes || 0))
        }

        setProducts(data)
      } catch (error) {
        console.error("Error fetching products:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [category, filterType])

  if (loading) {
    return (
      <div className="mx-auto py-8">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 animate-pulse">
          {[...Array(4)].map((_, index) => (
            <div key={index} className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="aspect-square bg-gray-200"></div>
              <div className="p-4">
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-3"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  if (products.length === 0) {
    return (
      <div className="py-16 text-center">
        <div className="inline-block p-6 bg-gray-100 rounded-lg">
          <p className="text-gray-600">No products found {category ? `in category "${category}"` : ""}.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="relative mx-auto">
      <div className="absolute left-0 top-1/2 -translate-y-1/2 z-10 -ml-4 md:-ml-6">
        <button
          ref={prevRef}
          className={`flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-md transition-all duration-200 ${
            isBeginning ? "opacity-40 cursor-not-allowed" : "hover:bg-gray-50"
          }`}
          aria-label="Previous slide"
          disabled={isBeginning}
        >
          <ChevronLeft size={20} className="text-gray-700" />
        </button>
      </div>

      <div className="absolute right-0 top-1/2 -translate-y-1/2 z-10 -mr-4 md:-mr-6">
        <button
          ref={nextRef}
          className={`flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-md transition-all duration-200 ${
            isEnd ? "opacity-40 cursor-not-allowed" : "hover:bg-gray-50"
          }`}
          aria-label="Next slide"
          disabled={isEnd}
        >
          <ChevronRight size={20} className="text-gray-700" />
        </button>
      </div>

      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={24}
        slidesPerView={1}
        loop={false}
        navigation={{
          prevEl: prevRef.current,
          nextEl: nextRef.current,
        }}
        pagination={{
          clickable: true,
          el: ".swiper-pagination",
          type: "bullets",
          bulletActiveClass: "swiper-pagination-bullet-active",
          bulletClass: "swiper-pagination-bullet",
        }}
        onBeforeInit={(swiper) => {
          if (swiper.params.navigation) {
            swiper.params.navigation.prevEl = prevRef.current
            swiper.params.navigation.nextEl = nextRef.current
            swiper.navigation.init()
            swiper.navigation.update()
          }
        }}
        onSlideChange={(swiper) => {
          setIsBeginning(swiper.isBeginning)
          setIsEnd(swiper.isEnd)
        }}
        breakpoints={{
          640: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 3,
            spaceBetween: 24,
          },
          1024: {
            slidesPerView: 5,
            spaceBetween: 24,
          },
        }}
        className="carousel-swiper product-carousel"
      >
        {products.map((product) => (
          <SwiperSlide key={product.product_id}>
            <div className="h-full pb-12">
              <ProductCard product={product} />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="swiper-pagination mt-6 flex justify-center space-x-2"></div>

      <div className="mt-8 mx-auto max-w-xs">
        <div className="h-[2px] w-full bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-gray-900 transition-all duration-300"
            style={{
              width: `${isEnd ? "100%" : isBeginning ? "0%" : "50%"}`,
            }}
          ></div>
        </div>
      </div>
    </div>
  )
}