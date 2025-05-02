"use client"

import { Swiper, SwiperSlide } from "swiper/react"
import { useState, useEffect, useRef } from "react"
import { Navigation, Pagination, Autoplay } from "swiper/modules"
import { ChevronLeft, ChevronRight } from "lucide-react"
import categoryService from "../services/categoryService"
import CategoryCard from "./CategoryCard"
import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"
import "swiper/css/autoplay"

export default function CategoryCarousel() {
  const [categories, setCategories] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [isBeginning, setIsBeginning] = useState(true)
  const [isEnd, setIsEnd] = useState(false)

  const prevRef = useRef(null)
  const nextRef = useRef(null)

  useEffect(() => {
    const fetchCategories = async () => {
      setIsLoading(true)
      try {
        const data = await categoryService.fetchAllCategories()
        setCategories(data)
      } catch (error) {
        console.error("Error fetching categories:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchCategories()
  }, [])

  if (isLoading) {
    return (
      <div className="mx-auto py-8">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 animate-pulse">
          {[...Array(4)].map((_, index) => (
            <div key={index} className="aspect-[4/5] bg-gray-200 rounded-xl"></div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="relative mx-auto mt-8">
      {/* Custom Navigation Buttons */}
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
        spaceBetween={20}
        slidesPerView={1}
        loop={true}
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
          // Assign navigation elements on init
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
            slidesPerView: 4,
            spaceBetween: 24,
          },
          1280: {
            slidesPerView: 5,
            spaceBetween: 30,
          },
        }}
        className="category-swiper !overflow-visible"
      >
        {categories.map((category) => (
          <SwiperSlide key={category.id}>
            <div className="h-full pb-12">
              <CategoryCard category={category} />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom Pagination */}
      <div className="swiper-pagination mt-6 flex justify-center space-x-2"></div>

      {/* Custom Progress Bar */}
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
