import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import categoryService from '../../../services/categoryService';
import FormInput from '../../common/forms/FormInput';

const CategoryFilterBar = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const [scrollContainer, setScrollContainer] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const data = await categoryService.fetchAllCategories();
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    if (scrollContainer) {
      const checkScrollButtons = () => {
        setCanScrollLeft(scrollContainer.scrollLeft > 0);
        setCanScrollRight(
          scrollContainer.scrollLeft <
            scrollContainer.scrollWidth - scrollContainer.clientWidth
        );
      };

      checkScrollButtons();
      scrollContainer.addEventListener("scroll", checkScrollButtons);
      window.addEventListener("resize", checkScrollButtons);

      return () => {
        scrollContainer.removeEventListener("scroll", checkScrollButtons);
        window.removeEventListener("resize", checkScrollButtons);
      };
    }
  }, [scrollContainer]);

  const scroll = (direction) => {
    if (scrollContainer) {
      const scrollAmount = 200;
      const newScrollLeft =
        scrollContainer.scrollLeft + (direction === "left" ? -scrollAmount : scrollAmount);
      
      scrollContainer.scrollTo({
        left: newScrollLeft,
        behavior: "smooth",
      });
    }
  };

  if (loading) {
    return (
      <div className="bg-white border-b border-gray-100">
        <div className="container mx-auto px-4 xl:px-8 max-w-6xl">
          <div className="flex items-center justify-between py-3">
            <div className="flex space-x-4 animate-pulse">
              {[...Array(8)].map((_, index) => (
                <div key={index} className="w-20 h-8 bg-gray-200 rounded-lg"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white border-b border-gray-100 shadow-sm">
      <div className="container mx-auto px-4 xl:px-8 max-w-6xl">
        <div className="relative flex items-center justify-between py-3">
          {/* Left Scroll Button */}
          {canScrollLeft && (
            <button
              onClick={() => scroll("left")}
              className="absolute left-0 z-10 flex items-center justify-center w-8 h-8 bg-white border border-gray-200 rounded-full shadow-sm hover:shadow-md transition-all duration-200 -translate-x-2"
              aria-label="Scroll left"
            >
              <ChevronLeft size={16} className="text-gray-600" />
            </button>
          )}

          {/* Categories Container */}
          <div className="flex-1 overflow-hidden">
            <div
              ref={setScrollContainer}
              className="flex space-x-2 px-4 overflow-x-auto scrollbar-hide"
            >
              {categories.map((category) => (
                <Link
                  key={category.id}
                  to={`/products?category=${encodeURIComponent(category.name)}`}
                  className="px-3 py-1.5 text-xs font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-all duration-200 whitespace-nowrap flex-shrink-0"
                >
                  {category.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Right Scroll Button */}
          {canScrollRight && (
            <button
              onClick={() => scroll("right")}
              className="absolute right-0 z-10 flex items-center justify-center w-8 h-8 bg-white border border-gray-200 rounded-full shadow-sm hover:shadow-md transition-all duration-200 translate-x-2"
              aria-label="Scroll right"
            >
              <ChevronRight size={16} className="text-gray-600" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CategoryFilterBar; 