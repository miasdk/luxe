import React, { useEffect, useState } from "react";
import productService from "../services/productService";
import ProductGrid from "../components/ProductGrid";
import FilterSideBar from "../components/FilterSideBar";
import FilterTopBar from "../components/FilterTopBar";

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
        <div className="container mx-auto px-4">
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