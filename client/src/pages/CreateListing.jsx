import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  ArrowLeft,
  Save,
  Upload,
  X,
  Check,
  AlertCircle,
  Image as ImageIcon
} from "lucide-react";
import productsService from "../services/productService";
import brandService from "../services/brandService";
import categoryService from "../services/categoryService";
import { colorData } from "../data/colors";
import { conditionData } from "../data/conditions";
import { sizeData } from "../data/sizes";

export default function CreateListing() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [step, setStep] = useState(1);
  const [brands, setBrands] = useState([]);
  const [categories, setCategories] = useState([]);
  const colors = colorData;
  const conditions = conditionData;
  const sizes = sizeData;
  
  // Form data with IDs not names
  const [formData, setFormData] = useState({
    title: "",
    price: "",
    description: "",
    brand_id: "",
    category_id: "",
    condition_ids: [],
    size_ids: [],
    color_ids: [],
    image: ""
  });

  useEffect(() => {
    const fetchReferenceData = async () => {
      try {
        const [brandsData, categoriesData] = await Promise.all([
          brandService.fetchAllBrands(),
          categoryService.fetchAllCategories()
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
  
  const handleCheckboxChange = (field, id) => {
    setFormData(prev => {
      const currentIds = prev[field] || [];
      if (currentIds.includes(id)) {
        return {
          ...prev,
          [field]: currentIds.filter(itemId => itemId !== id)
        };
      } else {
        return {
          ...prev,
          [field]: [...currentIds, id]
        };
      }
    });
  };
  
  const handleConditionChange = (conditionId) => {
    setFormData({
      ...formData,
      condition_ids: [conditionId]
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const productToCreate = {
        ...formData,
        price: parseFloat(formData.price)
      };

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

  const isStepComplete = (stepNum) => {
    switch(stepNum) {
      case 1:
        return formData.title && formData.description && formData.price;
      case 2:
        return formData.brand_id && formData.category_id && formData.condition_ids.length > 0;
      case 3:
        return true; 
      default:
        return false;
    }
  };

  const getSelectedBrandName = () => {
    const brand = brands.find(b => b.id == formData.brand_id);
    return brand ? brand.name : '';
  };

  const getSelectedCategoryName = () => {
    const category = categories.find(c => c.id == formData.category_id);
    return category ? category.name : '';
  };

  const getSelectedConditionName = () => {
    const condition = conditions.find(c => c.id === formData.condition_ids[0]);
    return condition ? condition.name : '';
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-6 max-w-4xl">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-light text-gray-900 mb-1">Create Listing</h1>
              <p className="text-gray-600">Share your exceptional pieces with the community</p>
            </div>
            <Link
              to="/products"
              className="inline-flex items-center px-4 py-2 border border-gray-300 text-gray-700 font-medium rounded-md hover:bg-gray-50 transition-colors"
            >
              <ArrowLeft size={16} className="mr-2" />
              Cancel
            </Link>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 max-w-4xl">
        {/* Progress Steps */}
        <div className="mb-12">
          <div className="flex items-center justify-center space-x-8">
            {[
              { num: 1, title: "Details", desc: "Basic information" },
              { num: 2, title: "Category", desc: "Brand & condition" },
              { num: 3, title: "Attributes", desc: "Image & features" }
            ].map((stepItem, index) => (
              <div key={stepItem.num} className="flex items-center">
                <div className="flex flex-col items-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-colors ${
                      step === stepItem.num
                        ? 'bg-gray-900 border-gray-900 text-white'
                        : isStepComplete(stepItem.num)
                        ? 'bg-green-100 border-green-500 text-green-600'
                        : 'bg-white border-gray-300 text-gray-400'
                    }`}
                  >
                    {isStepComplete(stepItem.num) && step !== stepItem.num ? (
                      <Check size={16} />
                    ) : (
                      stepItem.num
                    )}
                  </div>
                  <div className="mt-2 text-center">
                    <p className={`text-sm font-medium ${step === stepItem.num ? 'text-gray-900' : 'text-gray-500'}`}>
                      {stepItem.title}
                    </p>
                    <p className="text-xs text-gray-400">{stepItem.desc}</p>
                  </div>
                </div>
                {index < 2 && (
                  <div className={`w-16 h-0.5 mx-4 ${isStepComplete(stepItem.num) ? 'bg-green-500' : 'bg-gray-300'}`} />
                )}
              </div>
            ))}
          </div>
        </div>

        {error && (
          <div className="mb-8 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
            <AlertCircle size={20} className="text-red-500 mt-0.5 flex-shrink-0" />
            <div>
              <h3 className="text-red-800 font-medium mb-1">Error creating listing</h3>
              <p className="text-red-700 text-sm">{error}</p>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {step === 1 && (
            <div className="bg-white rounded-2xl p-8 shadow-sm">
              <div className="mb-8">
                <h2 className="text-2xl font-light text-gray-900 mb-2">Product Details</h2>
                <p className="text-gray-600">Tell us about your item</p>
              </div>

              <div className="space-y-6">
                <div>
                  <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                    Product Title
                  </label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    placeholder="e.g., Vintage Leather Handbag"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-colors"
                  />
                </div>

                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                    Description
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    placeholder="Describe your item's condition, features, and any special details..."
                    rows="6"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-colors resize-none"
                  />
                </div>

                <div>
                  <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-2">
                    Price
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
                    <input
                      type="number"
                      id="price"
                      name="price"
                      value={formData.price}
                      onChange={handleInputChange}
                      placeholder="0.00"
                      min="0"
                      step="0.01"
                      className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-colors"
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-end mt-8">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  disabled={!isStepComplete(1)}
                  className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                    isStepComplete(1)
                      ? 'bg-gray-900 text-white hover:bg-gray-800'
                      : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  Continue
                </button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="bg-white rounded-2xl p-8 shadow-sm">
              <div className="mb-8">
                <h2 className="text-2xl font-light text-gray-900 mb-2">Category & Brand</h2>
                <p className="text-gray-600">Help buyers find your item</p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="category_id" className="block text-sm font-medium text-gray-700 mb-2">
                    Category
                  </label>
                  <select
                    id="category_id"
                    name="category_id"
                    value={formData.category_id}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-colors"
                  >
                    <option value="">Select category</option>
                    {categories.map(category => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="brand_id" className="block text-sm font-medium text-gray-700 mb-2">
                    Brand
                  </label>
                  <select
                    id="brand_id"
                    name="brand_id"
                    value={formData.brand_id}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-colors"
                  >
                    <option value="">Select brand</option>
                    {brands.map(brand => (
                      <option key={brand.id} value={brand.id}>
                        {brand.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="mt-6">
                <h3 className="text-sm font-medium text-gray-700 mb-3">Condition</h3>
                <div className="grid md:grid-cols-2 gap-3">
                  {conditions.map(condition => (
                    <label
                      key={condition.id}
                      className={`flex items-center p-4 border rounded-lg cursor-pointer transition-colors ${
                        formData.condition_ids[0] === condition.id
                          ? 'border-gray-900 bg-gray-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <input
                        type="radio"
                        name="condition"
                        checked={formData.condition_ids[0] === condition.id}
                        onChange={() => handleConditionChange(condition.id)}
                        className="sr-only"
                      />
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <span className="font-medium text-gray-900">{condition.name}</span>
                          {formData.condition_ids[0] === condition.id && (
                            <Check size={16} className="text-gray-900" />
                          )}
                        </div>
                        <p className="text-sm text-gray-600 mt-1">{condition.description}</p>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              <div className="flex justify-between mt-8">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Back
                </button>
                <button
                  type="button"
                  onClick={() => setStep(3)}
                  disabled={!isStepComplete(2)}
                  className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                    isStepComplete(2)
                      ? 'bg-gray-900 text-white hover:bg-gray-800'
                      : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  Continue
                </button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-8">
              <div className="bg-white rounded-2xl p-8 shadow-sm">
                <div className="mb-6">
                  <h2 className="text-2xl font-light text-gray-900 mb-2">Product Image</h2>
                  <p className="text-gray-600">Add a photo to showcase your item</p>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <div className="aspect-square bg-gray-50 border-2 border-dashed border-gray-300 rounded-xl flex items-center justify-center overflow-hidden">
                      {formData.image ? (
                        <img
                          src={formData.image}
                          alt="Product preview"
                          className="w-full h-full object-contain"
                        />
                      ) : (
                        <div className="text-center p-6">
                          <ImageIcon size={40} className="mx-auto text-gray-400 mb-3" />
                          <p className="text-sm text-gray-500 mb-1">No image selected</p>
                          <p className="text-xs text-gray-400">Add an image URL below</p>
                        </div>
                      )}
                    </div>
                  </div>

                  <div>
                    <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-2">
                      Image URL
                    </label>
                    <input
                      type="url"
                      id="image"
                      name="image"
                      value={formData.image}
                      onChange={handleInputChange}
                      placeholder="https://example.com/image.jpg"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-colors"
                    />
                    <p className="text-xs text-gray-500 mt-2">
                      Paste a link to your product image
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-sm">
                <div className="mb-6">
                  <h2 className="text-2xl font-light text-gray-900 mb-2">Attributes</h2>
                  <p className="text-gray-600">Optional details to help buyers (you can skip this)</p>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-sm font-medium text-gray-700 mb-3">Available Colors</h3>
                    <div className="space-y-2 max-h-48 overflow-y-auto">
                      {colors.map(color => (
                        <label
                          key={color.id}
                          className={`flex items-center p-3 border rounded-lg cursor-pointer transition-all ${
                            formData.color_ids.includes(color.id)
                              ? 'border-gray-900 bg-gray-50'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          <input
                            type="checkbox"
                            checked={formData.color_ids.includes(color.id)}
                            onChange={() => handleCheckboxChange('color_ids', color.id)}
                            className="sr-only"
                          />
                          <span className="flex-1 text-gray-900">{color.name}</span>
                          {formData.color_ids.includes(color.id) && (
                            <Check size={16} className="text-gray-900" />
                          )}
                        </label>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-gray-700 mb-3">Available Sizes</h3>
                    <div className="space-y-2 max-h-48 overflow-y-auto">
                      {sizes.map(size => (
                        <label
                          key={size.id}
                          className={`flex items-center p-3 border rounded-lg cursor-pointer transition-all ${
                            formData.size_ids.includes(size.id)
                              ? 'border-gray-900 bg-gray-50'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          <input
                            type="checkbox"
                            checked={formData.size_ids.includes(size.id)}
                            onChange={() => handleCheckboxChange('size_ids', size.id)}
                            className="sr-only"
                          />
                          <span className="flex-1 text-gray-900">{size.name}</span>
                          {formData.size_ids.includes(size.id) && (
                            <Check size={16} className="text-gray-900" />
                          )}
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Summary & Submit */}
              <div className="bg-white rounded-2xl p-8 shadow-sm">
                <div className="mb-6">
                  <h2 className="text-2xl font-light text-gray-900 mb-2">Review & Submit</h2>
                  <p className="text-gray-600">Double-check your listing details</p>
                </div>

                <div className="bg-gray-50 rounded-lg p-6 mb-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="font-medium text-gray-900 mb-3">Product Details</h3>
                      <dl className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <dt className="text-gray-600">Title:</dt>
                          <dd className="text-gray-900 font-medium">{formData.title || 'Not set'}</dd>
                        </div>
                        <div className="flex justify-between">
                          <dt className="text-gray-600">Price:</dt>
                          <dd className="text-gray-900 font-medium">${formData.price || '0.00'}</dd>
                        </div>
                        <div className="flex justify-between">
                          <dt className="text-gray-600">Brand:</dt>
                          <dd className="text-gray-900 font-medium">{getSelectedBrandName() || 'Not set'}</dd>
                        </div>
                        <div className="flex justify-between">
                          <dt className="text-gray-600">Category:</dt>
                          <dd className="text-gray-900 font-medium">{getSelectedCategoryName() || 'Not set'}</dd>
                        </div>
                        <div className="flex justify-between">
                          <dt className="text-gray-600">Condition:</dt>
                          <dd className="text-gray-900 font-medium">{getSelectedConditionName() || 'Not set'}</dd>
                        </div>
                      </dl>
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900 mb-3">Attributes</h3>
                      <dl className="space-y-2 text-sm">
                        <div>
                          <dt className="text-gray-600 mb-1">Colors:</dt>
                          <dd className="text-gray-900">
                            {formData.color_ids.length > 0 
                              ? colors.filter(c => formData.color_ids.includes(c.id)).map(c => c.name).join(', ')
                              : 'None selected'
                            }
                          </dd>
                        </div>
                        <div>
                          <dt className="text-gray-600 mb-1">Sizes:</dt>
                          <dd className="text-gray-900">
                            {formData.size_ids.length > 0 
                              ? sizes.filter(s => formData.size_ids.includes(s.id)).map(s => s.name).join(', ')
                              : 'None selected'
                            }
                          </dd>
                        </div>
                      </dl>
                    </div>
                  </div>
                </div>

                <div className="flex justify-between">
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    disabled={loading || !isStepComplete(1) || !isStepComplete(2)}
                    className={`px-8 py-3 rounded-lg font-medium transition-colors flex items-center ${
                      loading
                        ? "bg-gray-400 text-white cursor-not-allowed"
                        : "bg-gray-900 text-white hover:bg-gray-800"
                    }`}
                  >
                    <Save size={18} className="mr-2" />
                    {loading ? "Creating Listing..." : "Create Listing"}
                  </button>
                </div>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}