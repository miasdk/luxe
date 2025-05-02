import React, { useState } from "react";
import { FaThermometerFull } from "react-icons/fa";
import categoryService from "../services/categoryService";
import brandService from "../services/brandService";

export default function FilterSideBar() {
    const [isOpen, setIsOpen] = useState(); // State to track mobile dropdown visibility
    const [openCategories, setOpenCategories] = useState({
        category: true,
        brands: true,
        sizes: true,
        conditions: true,
        colors: true,
        price: FaThermometerFull
    });
    const [categories, setCategories] = useState([]);
    const [brands, setBrands] = useState([]);

    console.log(categories);
    console.log(brands);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const toggleCategory = (category) => {
        setOpenCategories(prev => ({
            ...prev,
            [category]: !prev[category]
        }));
    };

    //fetch categories and brands
    const fetchCategories = async () => {
        try {
            const data = await categoryService.fetchAllCategories();
            setCategories(data);
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    };

    const fetchBrands = async () => {
        try {
            const data = await brandService.fetchAllBrands();
            setBrands(data);
        } catch (error) {
            console.error('Error fetching brands:', error);
        }
    }

    // Call fetch functions when the component mounts
    React.useEffect(() => {
        fetchCategories();
        fetchBrands();
    }, []);
    

    return (
        <div className="w-full md:w-60 p-3 border-black/10 text-xs">
            <button
                onClick={toggleDropdown}
                className="bg-blue-500 text-white px-4 py-2 rounded mb-4 md:hidden text-xs"
            >
                {isOpen ? "Hide Filters" : "Show Filters"}
            </button>

            <div className={`${isOpen ? "block" : "hidden"} md:block flex flex-col`}>
                <h2 className="text-xs font-semibold mb-4">FILTERS</h2>

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
                            {categories.map((category) => (
                                <li key={category.name} className="flex items-center mb-2">
                                <input type="checkbox" id={category.name} className="w-3 h-3" />
                                <label htmlFor={category.name} className="ml-2">{category.name}</label>
                                </li>
                            ))}
                            
                        </ul>
                    )}
                </div>

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
                            {brands.map((brand) => (
                                <li key={brand.name} className="flex items-center mb-2">
                                    <input type="checkbox" id={brand.name} className="w-3 h-3" />
                                    <label htmlFor={brand.name} className="ml-2">{brand.name}</label>

                                </li>
                            ))}
                        </ul>
                    )}
                </div>

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
                                <input type="checkbox" id="small" className="w-3 h-3" />
                                <label htmlFor="small" className="ml-2">Small</label>
                            </li>
                            <li className="flex items-center mb-2">
                                <input type="checkbox" id="medium" className="w-3 h-3" />
                                <label htmlFor="medium" className="ml-2">Medium</label>
                            </li>
                            <li className="flex items-center mb-2">
                                <input type="checkbox" id="large" className="w-3 h-3" />
                                <label htmlFor="large" className="ml-2">Large</label>
                            </li>
                            <li className="flex items-center mb-2">
                                <input type="checkbox" id="xl" className="w-3 h-3" />
                                <label htmlFor="xl" className="ml-2">XL</label>
                            </li>
                        </ul>
                    )}
                </div>

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
                                <input type="checkbox" id="new" className="w-3 h-3" />
                                <label htmlFor="new" className="ml-2">NWT</label>
                            </li>
                            <li className="flex items-center mb-2">
                                <input type="checkbox" id="used" className="w-3 h-3" />
                                <label htmlFor="used" className="ml-2">NWOT</label>
                            </li>
                            <li className="flex items-center mb-2">
                                <input type="checkbox" id="refurbished" className="w-3 h-3" />
                                <label htmlFor="refurbished" className="ml-2">Good</label>
                            </li>
                            <li className="flex items-center mb-2">
                                <input type="checkbox" id="refurbished" className="w-3 h-3" />
                                <label htmlFor="refurbished" className="ml-2">Gently Used</label>
                            </li>
                            <li className="flex items-center mb-2">
                                <input type="checkbox" id="refurbished" className="w-3 h-3" />
                                <label htmlFor="refurbished" className="ml-2">Fair</label>
                            </li>
                        </ul>
                    )}
                </div>

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
                                <li className="w-5 h-5 bg-red-500 rounded-full cursor-pointer"></li>
                                <li className="w-5 h-5 bg-green-500 rounded-full cursor-pointer"></li>
                                <li className="w-5 h-5 bg-blue-500 rounded-full cursor-pointer"></li>
                                <li className="w-5 h-5 bg-yellow-500 rounded-full cursor-pointer"></li>
                                <li className="w-5 h-5 bg-purple-500 rounded-full cursor-pointer"></li>
                                <li className="w-5 h-5 bg-pink-500 rounded-full cursor-pointer"></li>
                                <li className="w-5 h-5 bg-black rounded-full cursor-pointer"></li>
                                <li className="w-5 h-5 bg-white rounded-full border border-black/15 cursor-pointer"></li>
                            </ul>
                        </div>
                    )}
                </div>

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
                                <span>$</span>
                                <span>$$$</span>
                            </div>
                            <input type="range" min="0" max="1000" className="w-full" />
                        </div>
                    )}
                </div>

                <button className="bg-blue-500 text-white px-4 py-2 rounded text-xs">
                    Apply Filters
                </button>
            </div>
        </div>
    );
}
