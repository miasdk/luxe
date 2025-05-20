import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  ArrowLeft,
  Save,
  Upload
} from "lucide-react";
import productsService from "../services/productService";
import brandService from "../services/brandService";
import categoryService from "../services/categoryService";
// Import hardcoded data
import { colorData } from "../data/colors";
import { conditionData } from "../data/conditions";
import { sizeData } from "../data/sizes";

export default function CreateListing() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  // Reference data for lookups
  const [brands, setBrands] = useState([]);
  const [categories, setCategories] = useState([]);
  // No need to fetch these - they're hardcoded now
  const colors = colorData;
  const conditions = conditionData;
  const sizes = sizeData;
  
  // Form data with IDs not names
  const [formData, setFormData] = useState({
    title: "",
    price: "",
    description: "",
    brand_id: "",       // ID not name
    category_id: "",    // ID not name
    condition_ids: [],  // Array of IDs
    size_ids: [],       // Array of IDs
    color_ids: [],      // Array of IDs
    image: "https://placehold.co/500x500/e5e7eb/a3a3a3?text=Product+Image"
  });

  // Load brands and categories on component mount
  useEffect(() => {
    const fetchReferenceData = async () => {
      try {
        // Use the correct service methods for fetching brands and categories
        const [brandsData, categoriesData] = await Promise.all([
          brandService.fetchAllBrands(),  // Changed from productsService.fetchBrands
          categoryService.fetchAllCategories()  // Changed from productsService.fetchCategories
        ]);
        
        setBrands(brandsData);
        setCategories(categoriesData);
      } catch (error) {
        console.error("Error fetching reference data:", error);
        setError("Failed to load reference data: " + error.message);
      }
    };
    
    fetchReferenceData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  
  // Special handler for checkbox groups (sizes, colors)
  const handleCheckboxChange = (field, id) => {
    setFormData(prev => {
      const currentIds = prev[field] || [];
      if (currentIds.includes(id)) {
        // Remove if already selected
        return {
          ...prev,
          [field]: currentIds.filter(itemId => itemId !== id)
        };
      } else {
        // Add if not selected
        return {
          ...prev,
          [field]: [...currentIds, id]
        };
      }
    });
  };
  
  // Special handler for condition (choose one)
  const handleConditionChange = (conditionId) => {
    setFormData({
      ...formData,
      condition_ids: [conditionId] // Array with single condition ID
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Backend expects price as a number, not string
      const productToCreate = {
        ...formData,
        price: parseFloat(formData.price)
      };

      // Use addProduct from ProductService
      const createdProduct = await productsService.addProduct(productToCreate);
      navigate(`/products/${createdProduct.id}`, { 
        state: { message: "Product created successfully" }
      });
    } catch (err) {
      console.error("Error creating product:", err);
      setError(err.message || "Failed to create product");
      window.scrollTo(0, 0);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white">
      {/* Breadcrumb */}
      <div className="bg-gray-50 py-4 border-b border-gray-100">
        <div className="container mx-auto px-4">
          <nav className="flex text-sm">
            <Link to="/" className="text-gray-500 hover:text-gray-700">
              Home
            </Link>
            <span className="mx-2 text-gray-400">/</span>
            <Link to="/products" className="text-gray-500 hover:text-gray-700">
              Products
            </Link>
            <span className="mx-2 text-gray-400">/</span>
            <span className="text-gray-900 font-medium">Create Listing</span>
          </nav>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-light text-gray-900">Create New Listing</h1>
          <Link
            to="/products"
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-600 hover:bg-gray-50 transition-colors flex items-center"
          >
            <ArrowLeft size={16} className="mr-2" />
            Cancel
          </Link>
        </div>

        {/* Error Display */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-md">
            <p className="text-red-700">{error}</p>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Column - Product Image */}
          <div>
            <div className="mb-6">
              <h2 className="text-xl font-medium text-gray-900 mb-4">Product Image</h2>
              <div className="aspect-square overflow-hidden rounded-xl bg-gray-50 border border-gray-200 flex items-center justify-center">
                {formData.image ? (
                  <img
                    src={formData.image}
                    alt="Product preview"
                    className="h-full w-full object-contain"
                  />
                ) : (
                  <div className="text-center p-6">
                    <Upload size={40} className="mx-auto text-gray-400 mb-2" />
                    <p className="text-sm text-gray-500">No image selected</p>
                  </div>
                )}
              </div>
              <div className="mt-3">
                <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-1">
                  Image URL
                </label>
                <input
                  type="text"
                  id="image"
                  name="image"
                  value={formData.image}
                  onChange={handleInputChange}
                  placeholder="https://example.com/image.jpg"
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                />
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-medium text-gray-900 mb-4">Product Categories</h2>
                <div className="space-y-4">
                  {/* Category Dropdown - Uses ID not Name */}
                  <div>
                    <label htmlFor="category_id" className="block text-sm font-medium text-gray-700 mb-1">
                      Category
                    </label>
                    <select
                      id="category_id"
                      name="category_id"
                      value={formData.category_id}
                      onChange={handleInputChange}
                      required
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                    >
                      <option value="">Select a category</option>
                      {categories.map(category => (
                        <option key={category.id} value={category.id}>
                          {category.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Brand Dropdown - Uses ID not Name */}
                  <div>
                    <label htmlFor="brand_id" className="block text-sm font-medium text-gray-700 mb-1">
                      Brand
                    </label>
                    <select
                      id="brand_id"
                      name="brand_id"
                      value={formData.brand_id}
                      onChange={handleInputChange}
                      required
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                    >
                      <option value="">Select a brand</option>
                      {brands.map(brand => (
                        <option key={brand.id} value={brand.id}>
                          {brand.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
              
              {/* Colors - Multi-select checkboxes */}
              <div>
                <h2 className="text-xl font-medium text-gray-900 mb-4">Colors</h2>
                <div className="grid grid-cols-2 gap-2">
                  {colors.map(color => (
                    <label key={color.id} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={formData.color_ids.includes(color.id)}
                        onChange={() => handleCheckboxChange('color_ids', color.id)}
                        className="rounded border-gray-300"
                      />
                      <span>{color.name}</span>
                    </label>
                  ))}
                </div>
              </div>
              
              {/* Sizes - Multi-select checkboxes */}
              <div>
                <h2 className="text-xl font-medium text-gray-900 mb-4">Sizes</h2>
                <div className="grid grid-cols-2 gap-2">
                  {sizes.map(size => (
                    <label key={size.id} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={formData.size_ids.includes(size.id)}
                        onChange={() => handleCheckboxChange('size_ids', size.id)}
                        className="rounded border-gray-300"
                      />
                      <span>{size.name}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Product Details */}
          <div className="space-y-8">
            <div>
              <h2 className="text-xl font-medium text-gray-900 mb-4">Product Details</h2>
              <div className="space-y-4">
                <div>
                  <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                    Title
                  </label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    required
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                  />
                </div>

                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    required
                    rows="5"
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                  ></textarea>
                </div>

                <div>
                  <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">
                    Price ($)
                  </label>
                  <input
                    type="number"
                    id="price"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    required
                    min="0"
                    step="0.01"
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                  />
                </div>

                {/* Condition - Radio buttons (one selection only) */}
                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-2">Condition</h3>
                  <div className="space-y-2">
                    {conditions.map(condition => (
                      <label key={condition.id} className="flex items-center space-x-2">
                        <input
                          type="radio"
                          name="condition"
                          checked={formData.condition_ids[0] === condition.id}
                          onChange={() => handleConditionChange(condition.id)}
                          className="rounded-full border-gray-300"
                        />
                        <span>{condition.name}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-gray-200">
              <button
                type="submit"
                disabled={loading}
                className={`w-full px-6 py-3 bg-gray-900 text-white rounded-md font-medium transition-colors flex items-center justify-center ${
                  loading ? "opacity-70 cursor-not-allowed" : "hover:bg-gray-800"
                }`}
              >
                <Save size={18} className="mr-2" />
                {loading ? "Creating..." : "Create Listing"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}