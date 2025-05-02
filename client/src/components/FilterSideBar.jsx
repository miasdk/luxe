// components/FilterSideBar.js
import React, { useState, useEffect } from "react";
import categoryService from "../services/categoryService";
import brandService from "../services/brandService";
import { useProductContext } from "../context/ProductContext";

export default function FilterSideBar() {
    // Local state
    const [isOpen, setIsOpen] = useState(false);
    const [openCategories, setOpenCategories] = useState({
        category: true,
        brands: true,
        sizes: true,
        conditions: true,
        colors: true,
        price: true
    });
    const [categories, setCategories] = useState([]);
    const [brands, setBrands] = useState([]);
    const [currentPriceMax, setCurrentPriceMax] = useState(1000);

    // Get filter context
    const { 
        filters, 
        priceRange,
        updateFilter, 
        updatePriceRange,
        resetFilters, 
        applyFilters 
    } = useProductContext();

    // Toggle mobile dropdown
    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    // Toggle filter sections
    const toggleCategory = (category) => {
        setOpenCategories(prev => ({
            ...prev,
            [category]: !prev[category]
        }));
    };

    // Handle price range change
    const handlePriceChange = (e) => {
        const value = parseInt(e.target.value);
        setCurrentPriceMax(value);
    };

    // Apply price range when slider stops
    const applyPriceRange = () => {
        updatePriceRange(0, currentPriceMax);
    };

    // Fetch categories and brands
    useEffect(() => {
        const fetchData = async () => {
            try {
                const categoriesData = await categoryService.fetchAllCategories();
                const brandsData = await brandService.fetchAllBrands();
                setCategories(categoriesData);
                setBrands(brandsData);
            } catch (error) {
                console.error('Error fetching filter data:', error);
            }
        };
        
        fetchData();
    }, []);

    // Initialize price slider with context value
    useEffect(() => {
        setCurrentPriceMax(priceRange.max);
    }, [priceRange.max]);

    return (
        <div className="w-full md:w-60 p-3 border-black/10 text-xs">
            <button
                onClick={toggleDropdown}
                className="bg-blue-500 text-white px-4 py-2 rounded mb-4 md:hidden text-xs"
            >
                {isOpen ? "Hide Filters" : "Show Filters"}
            </button>

            <div className={`${isOpen ? "block" : "hidden"} md:block flex flex-col`}>
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xs font-semibold">FILTERS</h2>
                    <button 
                        onClick={resetFilters}
                        className="text-blue-500 text-xs hover:underline"
                    >
                        Reset All
                    </button>
                </div>

                {/* Category Filter */}
                <div className="mb-4 border-b border-gray-200 pb-2">
                    <button 
                        onClick={() => toggleCategory('category')}
                        className="w-full flex justify-between items-center font-medium"
                    >
                        <span>Category</span>
                        <span>{openCategories.category ? '−' : '+'}</span>
                    </button>
                    {openCategories.category && (
                        <ul className="mt-2">
                            <li className="flex items-center mb-2">
                                <input 
                                    type="radio" 
                                    id="category-all" 
                                    name="category"
                                    value=""
                                    className="w-3 h-3"
                                    checked={filters.category === ''}
                                    onChange={(e) => updateFilter('category', e.target.value)}
                                />
                                <label htmlFor="category-all" className="ml-2">All Categories</label>
                            </li>
                            {categories.map((category) => (
                                <li key={category.name} className="flex items-center mb-2">
                                    <input 
                                        type="radio" 
                                        id={`category-${category.name}`} 
                                        name="category"
                                        value={category.name}
                                        className="w-3 h-3"
                                        checked={filters.category === category.name}
                                        onChange={(e) => updateFilter('category', e.target.value)}
                                    />
                                    <label htmlFor={`category-${category.name}`} className="ml-2">{category.name}</label>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

                {/* Brands Filter */}
                <div className="mb-4 border-b border-gray-200 pb-2">
                    <button 
                        onClick={() => toggleCategory('brands')}
                        className="w-full flex justify-between items-center font-medium"
                    >
                        <span>Brands</span>
                        <span>{openCategories.brands ? '−' : '+'}</span>
                    </button>
                    {openCategories.brands && (
                        <ul className="mt-2">
                            <li className="flex items-center mb-2">
                                <input 
                                    type="radio" 
                                    id="brand-all" 
                                    name="brand"
                                    value=""
                                    className="w-3 h-3"
                                    checked={filters.brand === ''}
                                    onChange={(e) => updateFilter('brand', e.target.value)}
                                />
                                <label htmlFor="brand-all" className="ml-2">All Brands</label>
                            </li>
                            {brands.map((brand) => (
                                <li key={brand.name} className="flex items-center mb-2">
                                    <input 
                                        type="radio" 
                                        id={`brand-${brand.name}`}
                                        name="brand" 
                                        value={brand.name}
                                        className="w-3 h-3"
                                        checked={filters.brand === brand.name}
                                        onChange={(e) => updateFilter('brand', e.target.value)}
                                    />
                                    <label htmlFor={`brand-${brand.name}`} className="ml-2">{brand.name}</label>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

                {/* Sizes Filter */}
                <div className="mb-4 border-b border-gray-200 pb-2">
                    <button 
                        onClick={() => toggleCategory('sizes')}
                        className="w-full flex justify-between items-center font-medium"
                    >
                        <span>Sizes</span>
                        <span>{openCategories.sizes ? '−' : '+'}</span>
                    </button>
                    {openCategories.sizes && (
                        <ul className="mt-2">
                            <li className="flex items-center mb-2">
                                <input 
                                    type="radio" 
                                    id="size-all" 
                                    name="size"
                                    value=""
                                    className="w-3 h-3"
                                    checked={filters.size === ''}
                                    onChange={(e) => updateFilter('size', e.target.value)}
                                />
                                <label htmlFor="size-all" className="ml-2">All Sizes</label>
                            </li>
                            {['Small', 'Medium', 'Large', 'XL'].map((size) => (
                                <li key={size} className="flex items-center mb-2">
                                    <input 
                                        type="radio" 
                                        id={`size-${size}`} 
                                        name="size"
                                        value={size}
                                        className="w-3 h-3"
                                        checked={filters.size === size}
                                        onChange={(e) => updateFilter('size', e.target.value)}
                                    />
                                    <label htmlFor={`size-${size}`} className="ml-2">{size}</label>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

                {/* Conditions Filter */}
                <div className="mb-4 border-b border-gray-200 pb-2">
                    <button 
                        onClick={() => toggleCategory('conditions')}
                        className="w-full flex justify-between items-center font-medium"
                    >
                        <span>Conditions</span>
                        <span>{openCategories.conditions ? '−' : '+'}</span>
                    </button>
                    {openCategories.conditions && (
                        <ul className="mt-2">
                            <li className="flex items-center mb-2">
                                <input 
                                    type="radio" 
                                    id="condition-all" 
                                    name="condition"
                                    value=""
                                    className="w-3 h-3"
                                    checked={filters.condition === ''}
                                    onChange={(e) => updateFilter('condition', e.target.value)}
                                />
                                <label htmlFor="condition-all" className="ml-2">All Conditions</label>
                            </li>
                            {['NWT', 'NWOT', 'Good', 'Gently Used', 'Fair'].map((condition) => (
                                <li key={condition} className="flex items-center mb-2">
                                    <input 
                                        type="radio" 
                                        id={`condition-${condition}`} 
                                        name="condition"
                                        value={condition}
                                        className="w-3 h-3"
                                        checked={filters.condition === condition}
                                        onChange={(e) => updateFilter('condition', e.target.value)}
                                    />
                                    <label htmlFor={`condition-${condition}`} className="ml-2">{condition}</label>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

                {/* Colors Filter */}
                <div className="mb-4 border-b border-gray-200 pb-2">
                    <button 
                        onClick={() => toggleCategory('colors')}
                        className="w-full flex justify-between items-center font-medium"
                    >
                        <span>Colors</span>
                        <span>{openCategories.colors ? '−' : '+'}</span>
                    </button>
                    {openCategories.colors && (
                        <div className="mt-2">
                            <ul className="flex flex-wrap gap-1"> 
                                {[
                                    { name: 'Red', class: 'bg-red-500' },
                                    { name: 'Green', class: 'bg-green-500' },
                                    { name: 'Blue', class: 'bg-blue-500' },
                                    { name: 'Yellow', class: 'bg-yellow-500' },
                                    { name: 'Purple', class: 'bg-purple-500' },
                                    { name: 'Pink', class: 'bg-pink-500' },
                                    { name: 'Black', class: 'bg-black' },
                                    { name: 'White', class: 'bg-white border border-black/15' }
                                ].map((color) => (
                                    <li 
                                        key={color.name}
                                        className={`w-5 h-5 rounded-full cursor-pointer ${color.class} ${
                                            filters.color === color.name ? 'ring-2 ring-offset-1 ring-blue-500' : ''
                                        }`}
                                        onClick={() => updateFilter('color', filters.color === color.name ? '' : color.name)}
                                        title={color.name}
                                    ></li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>

                {/* Price Range Filter */}
                <div className="mb-4 border-b border-gray-200 pb-2">
                    <button 
                        onClick={() => toggleCategory('price')}
                        className="w-full flex justify-between items-center font-medium"
                    >
                        <span>Price Range</span>
                        <span>{openCategories.price ? '−' : '+'}</span>
                    </button>
                    {openCategories.price && (
                        <div className="mt-2">
                            <div className="justify-between flex items-center mb-2">
                                <span>$0</span>
                                <span>${currentPriceMax}</span>
                            </div>
                            <input 
                                type="range" 
                                min="0" 
                                max="1000" 
                                value={currentPriceMax}
                                onChange={handlePriceChange}
                                onMouseUp={applyPriceRange}
                                onTouchEnd={applyPriceRange}
                                className="w-full" 
                            />
                        </div>
                    )}
                </div>

                {/* Apply Filters button */}
                <button 
                    onClick={applyFilters}
                    className="bg-blue-500 text-white px-4 py-2 rounded text-xs"
                >
                    Apply Filters
                </button>
            </div>
        </div>
    );
}