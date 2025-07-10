import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X, Loader, ArrowRight } from 'lucide-react';
import axios from 'axios';

const SearchBar = ({ className = '' }) => {
    const [query, setQuery] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [loading, setLoading] = useState(false);
    const [focused, setFocused] = useState(false);
    const navigate = useNavigate();
    const inputRef = useRef(null);
    const suggestionsRef = useRef(null);
    
    const API_BASE_URL = import.meta.env.VITE_API_URL;
    
    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (query.trim()) {
            navigate(`/search?q=${encodeURIComponent(query.trim())}`);
            setShowSuggestions(false);
            inputRef.current.blur();
        }
    };
    
    const clearSearch = () => {
        setQuery('');
        setSuggestions([]);
        setShowSuggestions(false);
        inputRef.current.focus();
    };
    
    const fetchSuggestions = async (value) => {
        if (value.length < 2) {
            setSuggestions([]);
            return;
        }
        
        try {
            setLoading(true);
            const response = await axios.get(`${API_BASE_URL}/api/search`, {
                params: { query: value }
            });
            
            setSuggestions(response.data.slice(0, 6));
        } catch (error) {
            console.error('Error fetching suggestions:', error);
            setSuggestions([]);
        } finally {
            setLoading(false);
        }
    };
    
    useEffect(() => {
        const handler = setTimeout(() => {
            if (query.trim()) {
                fetchSuggestions(query);
            } else {
                setSuggestions([]);
            }
        }, 300);
        
        return () => {
            clearTimeout(handler);
        };
    }, [query]);
    
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (suggestionsRef.current && !suggestionsRef.current.contains(event.target)) {
                setShowSuggestions(false);
            }
        };
        
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);
    
    return (
        <div className={`relative ${className}`} ref={suggestionsRef}>
            <form 
                onSubmit={handleSubmit} 
                className="flex items-stretch w-full"
            >
                <div className="relative flex-1">
                    <div className={`absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none transition-all duration-300 ${
                        focused ? 'text-gray-700' : 'text-gray-400'
                    }`}>
                        <Search size={18} strokeWidth={2.5} />
                    </div>
                    
                    <input
                        ref={inputRef}
                        type="text"
                        placeholder="Search for products, brands, categories..."
                        value={query}
                        onChange={(e) => {
                            setQuery(e.target.value);
                            if (e.target.value.trim().length >= 2) {
                                setShowSuggestions(true);
                            } else {
                                setShowSuggestions(false);
                            }
                        }}
                        onFocus={() => {
                            setFocused(true);
                            if (query.trim().length >= 2 && suggestions.length > 0) {
                                setShowSuggestions(true);
                            }
                        }}
                        onBlur={() => {
                            setFocused(false);
                        }}
                        className={`w-full pl-11 pr-10 py-3 border-y border-l ring-offset-2 transition-all duration-300 focus:outline-none text-sm 
                            ${focused 
                                ? 'border-gray-500 ring-2 ring-gray-200 shadow-md bg-white' 
                                : 'border-gray-300 bg-gray-50 hover:bg-gray-100 shadow-sm'
                            }`}
                    />
                    
                    {query && (
                        <button
                            type="button"
                            onClick={clearSearch}
                            className={`absolute right-2 top-1/2 -translate-y-1/2 flex items-center justify-center w-6 h-6 transition-all duration-200 ${
                                focused 
                                    ? 'bg-gray-200 text-gray-700 hover:bg-gray-300' 
                                    : 'text-gray-400 hover:text-gray-600'
                            }`}
                            aria-label="Clear search"
                        >
                            <X size={14} />
                        </button>
                    )}
                </div>
                
                <button
                    type="submit"
                    disabled={!query.trim()}
                    className={`w-30 py-3 px-4 flex items-center justify-center transition-all duration-200 font-medium text-sm
                        ${query.trim() 
                            ? 'bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800' 
                            : 'bg-blue-300 text-white cursor-not-allowed'
                        }`}
                >
                    <Search size={16} className="mr-2" />
                    <span>Search</span>
                </button>
            </form>
            
            {showSuggestions && (
                <div 
                    className={`absolute z-50 w-full mt-2 bg-white border border-gray-200 shadow-xl overflow-hidden transition-all duration-300 transform origin-top ${
                        loading ? 'opacity-90' : 'opacity-100'
                    }`}
                    style={{
                        animation: 'dropdownFade 0.2s ease-out'
                    }}
                >
                    {loading && (
                        <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-80 backdrop-blur-sm z-10">
                            <div className="flex flex-col items-center">
                                <Loader size={26} className="text-gray-800 animate-spin" />
                                <span className="mt-2 text-xs text-gray-500">Searching...</span>
                            </div>
                        </div>
                    )}
                    
                    {suggestions.length > 0 ? (
                        <div className="max-h-[460px] overflow-y-auto">
                            <div className="sticky top-0 px-3 py-2 bg-gray-50 border-b border-gray-100 text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Product Suggestions
                            </div>
                            
                            {suggestions.map((product) => (
                                <div
                                    key={product.product_id}
                                    className="flex items-center gap-3 p-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-0 transition-colors group"
                                    onClick={() => {
                                        navigate(`/products/${product.product_id}`);
                                        setQuery('');
                                        setShowSuggestions(false);
                                    }}
                                >
                                    <div className="w-16 h-16 bg-white flex-shrink-0 border border-gray-100 overflow-hidden p-1 shadow-sm group-hover:shadow transition-shadow">
                                        <img 
                                            src={product.image}
                                            alt={product.title}
                                            className="w-full h-full object-contain"
                                        />
                                    </div>
                                    
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-medium text-gray-900 line-clamp-1 group-hover:text-gray-700">{product.title}</p>
                                        <div className="flex flex-wrap justify-between items-center mt-1.5 gap-y-1">
                                            <span className="inline-flex items-center px-2 py-0.5 text-xs font-medium bg-gray-100 text-gray-800 group-hover:bg-gray-200 transition-colors">
                                                {product.brand_name}
                                            </span>
                                            {product.category_name && (
                                                <span className="inline-flex items-center px-2 py-0.5 text-xs font-medium bg-gray-50 text-gray-600 border border-gray-100">
                                                    {product.category_name}
                                                </span>
                                            )}
                                            <p className="text-sm font-bold text-gray-900">${product.price}</p>
                                        </div>
                                    </div>
                                    
                                    <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                                        <ArrowRight size={16} className="text-gray-400" />
                                    </div>
                                </div>
                            ))}
                            
                            <div className="p-3 bg-gray-50 border-t border-gray-200">
                                <button
                                    onClick={() => {
                                        navigate(`/search?q=${encodeURIComponent(query.trim())}`);
                                        setShowSuggestions(false);
                                    }}
                                    className="w-full py-2.5 text-center text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100 transition-colors group flex items-center justify-center"
                                >
                                    <span>View all results for "{query}"</span>
                                    <ArrowRight size={16} className="ml-2 opacity-70 group-hover:translate-x-1 transition-transform" />
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className="p-6 text-center text-gray-500">
                            {query.length >= 2 && !loading ? (
                                <div className="space-y-2">
                                    <Search size={30} className="mx-auto text-gray-300" />
                                    <p>No products found for "{query}"</p>
                                    <p className="text-xs text-gray-400">Try using different keywords or browse our categories</p>
                                </div>
                            ) : (
                                <div className="space-y-2">
                                    <Search size={30} className="mx-auto text-gray-300" />
                                    <p>Type at least 2 characters to search</p>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            )}
            
            <style jsx>{`
                @keyframes dropdownFade {
                    from { opacity: 0; transform: translateY(-8px); }
                    to { opacity: 1; transform: translateY(0); }
                }
            `}</style>
        </div>
    );
};

export default SearchBar;