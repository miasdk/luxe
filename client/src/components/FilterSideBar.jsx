import React, { useState } from "react";

export default function FilterSideBar() {
    const [isOpen, setIsOpen] = useState(); // State to track mobile dropdown visibility
    const [openCategories, setOpenCategories] = useState({
        category: false,
        brands: false,
        sizes: false,
        conditions: false,
        colors: false,
        price: false
    });

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const toggleCategory = (category) => {
        setOpenCategories(prev => ({
            ...prev,
            [category]: !prev[category]
        }));
    };

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
                            {categoryData.map((category) => (
                                <li key={category.name} className="flex items-center mb-2">
                                    <img
                                        src={category.image}
                                        alt={category.name}
                                        className="w-6 h-6 mr-2 rounded"
                                    />
                                    <span>{category.name}</span>
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
                            {brandData.map((brand) => (
                                <li key={brand.name} className="flex items-center mb-2">
                                    <img
                                        src={brand.image}
                                        alt={brand.name}
                                        className="w-8 h-6 mr-2 rounded"
                                    />
                                    <span>{brand.name}</span>
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

export const categoryData = [
    {
        name: "Dresses",
        image: "https://media.thereformation.com/image/upload/f_auto,q_auto,dpr_2.0/PRD-SFCC/1317091/NAVY/1317091.1.NAVY?_s=RAABAB0",
    },
    {
        name: "Tops",
        image: "https://media.thereformation.com/image/upload/f_auto,q_auto,dpr_2.0/PRD-SFCC/1309586/BABYGIRL/1309586.1.BABYGIRL?_s=RAABAB0",
    },
];

export const brandData = [
    {
        name: "Lululemon",
        image: "https://1000logos.net/wp-content/uploads/2017/08/Lululemon-Logo-768x636.png",
    },
    {
        name: "Nike",
        image: "https://1000logos.net/wp-content/uploads/2021/11/Nike-Logo-768x432.png",
    },
];