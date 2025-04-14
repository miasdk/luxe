import React, { useEffect, useState } from "react";
import productService from "../services/productService";
import ProductGrid from "../components/ProductGrid";
import FilterSideBar from "../components/FilterSideBar";
import FilterTopBar from "../components/FilterTopBar";
import CategoryCarousel from "../components/CategoryCarousel";

const ProductPage = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const data = await productService.fetchAllProducts();
                setProducts(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    if (loading) return <p className="text-center text-gray-500">Loading products...</p>;
    if (error) return <p className="text-center text-red-500">Error: {error}</p>;

    return (
        <div className="mx-auto px-8 max-w-7xl">    
            <h1 className="text-4xl font-bold mb-5 text-left mt-5">All Products</h1>


            <div>
                <CategoryCarousel />
            </div>
            <div className="flex flex-col md:flex-row">
                <FilterSideBar />
                <div className="flex-grow">
                    <FilterTopBar />
                    <ProductGrid products={products}/>
                </div>
            </div>
        </div>
    );
};

export default ProductPage;