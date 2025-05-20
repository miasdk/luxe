import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { AlertCircle } from 'lucide-react';
import searchService from '../services/searchService';
import ProductCard from '../components/ProductCard';

const SearchResultsPage = () => {
    const [searchParams] = useSearchParams();
    const query = searchParams.get('q') || '';
    
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    useEffect(() => {
        const fetchSearchResults = async () => {
            if (!query) {
                setProducts([]);
                setLoading(false);
                return;
            }
            
            try {
                setLoading(true);
                const results = await searchService.searchProducts(query);
                setProducts(results);
                setError(null);
            } catch (err) {
                console.error('Error fetching search results:', err);
                setError('Failed to load search results. Please try again.');
            } finally {
                setLoading(false);
            }
        };
        
        fetchSearchResults();
    }, [query]);
    
    if (loading) {
        return (
            <div className="container mx-auto px-4 py-16">
                <h1 className="text-2xl font-medium text-gray-900 mb-8">
                    Searching for "{query}"...
                </h1>
                <div className="animate-pulse grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {[...Array(8)].map((_, index) => (
                        <div key={index} className="bg-gray-100 rounded-lg p-4 h-64"></div>
                    ))}
                </div>
            </div>
        );
    }
    
    if (error) {
        return (
            <div className="container mx-auto px-4 py-16">
                <div className="flex items-center gap-2 text-red-600 mb-4">
                    <AlertCircle size={20} />
                    <p>{error}</p>
                </div>
                <button
                    onClick={() => window.location.reload()}
                    className="px-4 py-2 bg-gray-900 text-white rounded-md"
                >
                    Try Again
                </button>
            </div>
        );
    }
    
    return (
        <div className="container mx-auto px-4 py-16">
            <h1 className="text-2xl font-medium text-gray-900 mb-4">
                Search Results for "{query}"
            </h1>
            
            {products.length === 0 ? (
                <div className="text-center py-16 bg-gray-50 rounded-lg">
                    <h2 className="text-xl font-medium text-gray-900 mb-2">No products found</h2>
                    <p className="text-gray-600 mb-6">
                        We couldn't find any products that match your search.
                    </p>
                    <Link
                        to="/products"
                        className="inline-flex items-center px-6 py-3 bg-gray-900 text-white rounded-md hover:bg-gray-800 transition-colors"
                    >
                        Browse All Products
                    </Link>
                </div>
            ) : (
                <>
                    <p className="text-gray-500 mb-8">Found {products.length} products</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {products.map((product) => (
                            <ProductCard key={product.product_id} product={product} />
                        ))}
                    </div>
                </>
            )}
        </div>
    );
};

export default SearchResultsPage;