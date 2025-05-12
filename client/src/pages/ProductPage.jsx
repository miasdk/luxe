import React from "react";
import ProductGrid from "../components/ProductGrid";
import FilterSideBar from "../components/FilterSideBar";
import FilterTopBar from "../components/FilterTopBar";
import CategoryCarousel from "../components/CategoryCarousel";
import ActiveFilters from "../components/ActiveFilters"; // Import the ActiveFilters component
import { useProductContext } from "../context/ProductContext"; // Import the context hook

const ProductPage = () => {
    // Replace local state with context
    const { loading, error } = useProductContext();

    if (loading) return <p className="text-center text-gray-500">Loading products...</p>;
    if (error) return <p className="text-center text-red-500">Error: {error}</p>;

    return (
        <div className="mx-auto px-12 max-w-8xl">
            <h1 className="text-4xl font-bold mb-5 text-left mt-5">All Products</h1>
            <div>
                {/* Keep CategoryCarousel if you use it */}
            </div>
            <div className="flex flex-col md:flex-row">
                <FilterSideBar />
                <div className="flex-grow">
                    <FilterTopBar />
                    <ActiveFilters /> {/* Add ActiveFilters component */}
                    <ProductGrid /> {/* Remove products prop - it now gets data from context */}
                </div>
            </div>
        </div>
    );
};

export default ProductPage;