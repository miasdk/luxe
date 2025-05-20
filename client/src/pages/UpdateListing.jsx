// UpdateListing.jsx
import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import {
  ArrowLeft,
  Save,
  Trash,
  AlertCircle
} from "lucide-react";
import productsService from "../services/productService";
import { colorData } from "../data/colors";
import { conditionData } from "../data/conditions";
import { sizeData } from "../data/sizes";

export default function UpdateListing() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    price: "",
    description: "",
    image: ""
  });
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  
  // State for brands and categories
  const [brands, setBrands] = useState([]);
  const [categories, setCategories] = useState([]);

  // Helper functions to map names to IDs
  const getBrandIdByName = (brandName) => {
    const brand = brands.find(b => b.name === brandName);
    return brand ? brand.id : null;
  };

  const getCategoryIdByName = (categoryName) => {
    const category = categories.find(c => c.name === categoryName);
    return category ? category.id : null;
  };

  const getColorIdsByNames = (colorNames) => {
    return colorNames.map(name => {
      const color = colorData.find(c => c.name.toLowerCase() === name.toLowerCase());
      return color ? color.id : null;
    }).filter(id => id !== null);
  };

  const getSizeIdsByNames = (sizeNames) => {
    return sizeNames.map(name => {
      const size = sizeData.find(s => s.name.toLowerCase() === name.toLowerCase());
      return size ? size.id : null;
    }).filter(id => id !== null);
  };

  const getConditionIdsByNames = (conditionNames) => {
    return conditionNames.map(name => {
      const condition = conditionData.find(c => c.name === name);
      return condition ? condition.id : null;
    }).filter(id => id !== null);
  };

  // Fetch reference data and product
  useEffect(() => {
    const fetchAllData = async () => {
      try {
        setLoading(true);
        
        // Fetch brands and categories first
        const [brandsData, categoriesData] = await Promise.all([
          productsService.fetchBrands(),
          productsService.fetchCategories()
        ]);
        
        setBrands(brandsData);
        setCategories(categoriesData);
        
        // Then fetch the product
        const productData = await productsService.fetchProductById(id);
        console.log("Product data from API:", productData);
        setProduct(productData);
        
        // Set form data
        setFormData({
          title: productData.title || "",
          price: productData.price || "",
          description: productData.description || "",
          image: productData.image || ""
        });
      } catch (err) {
        console.error("Error fetching data:", err);
        setError(err.message || "Failed to load product data");
      } finally {
        setLoading(false);
      }
    };
    
    fetchAllData();
  }, [id]);

  // Debug log when product or reference data changes
  useEffect(() => {
    if (product && brands.length > 0 && categories.length > 0) {
      console.log("Data ready for update:");
      console.log("- Product:", product);
      console.log("- Brand ID for", product.brand_name, "=", getBrandIdByName(product.brand_name));
      console.log("- Category ID for", product.category_name, "=", getCategoryIdByName(product.category_name));
    }
  }, [product, brands, categories]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    
    // Validate required fields
    if (!formData.title || !formData.price || !formData.description) {
      setError("Title, price, and description are required");
      return;
    }
    
    setIsSubmitting(true);
    setError(null);
    
    try {
      // Get IDs from names
      const brandId = getBrandIdByName(product.brand_name);
      const categoryId = getCategoryIdByName(product.category_name);
      
      // Map string arrays to ID arrays
      const colorIds = getColorIdsByNames(product.colors || []);
      const sizeIds = getSizeIdsByNames(product.sizes || []);
      const conditionIds = getConditionIdsByNames(product.conditions || []);
      
      // Validate required IDs
      if (!brandId) {
        throw new Error(`Could not find brand ID for "${product.brand_name}"`);
      }
      
      if (!categoryId) {
        throw new Error(`Could not find category ID for "${product.category_name}"`);
      }
      
      // Create the update object with the exact fields backend expects
      const updatedProduct = {
        title: formData.title,
        price: parseFloat(formData.price),
        description: formData.description,
        image: formData.image,
        brand_id: brandId,
        category_id: categoryId,
        color_ids: colorIds,
        size_ids: sizeIds,
        condition_ids: conditionIds
      };
      
      console.log("Sending to backend:", updatedProduct);
      
      // Note: Use product_id from the product object (not the id param)
      await productsService.updateProduct(product.product_id, updatedProduct);
      
      navigate(`/products/${product.product_id}`, { 
        state: { message: "Product updated successfully" } 
      });
    } catch (err) {
      console.error("Update error:", err);
      setError(err.message || "Failed to update product");
      window.scrollTo(0, 0);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async () => {
    try {
      // Note: Use product_id from the product object
      await productsService.deleteProduct(product.product_id);
      navigate("/products", { state: { message: "Product deleted successfully" } });
    } catch (err) {
      setError(err.message || "Failed to delete product");
      window.scrollTo(0, 0);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
          <div className="flex flex-col md:flex-row gap-12">
            <div className="md:w-1/2">
              <div className="aspect-square bg-gray-200 rounded-xl mb-4"></div>
            </div>
            <div className="md:w-1/2 space-y-4">
              <div className="h-6 bg-gray-200 rounded w-3/4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/4"></div>
              <div className="h-12 bg-gray-200 rounded"></div>
              <div className="space-y-2">
                <div className="h-4 bg-gray-200 rounded"></div>
                <div className="h-4 bg-gray-200 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="max-w-md mx-auto p-8 bg-red-50 rounded-xl">
          <div className="flex justify-center mb-4">
            <AlertCircle size={48} className="text-red-500" />
          </div>
          <h2 className="text-2xl font-medium text-red-700 mb-4">Error</h2>
          <p className="text-red-600 mb-6">{error}</p>
          <Link
            to="/products"
            className="inline-flex items-center px-6 py-3 bg-gray-900 text-white rounded-md hover:bg-gray-800 transition-colors"
          >
            <ArrowLeft size={16} className="mr-2" />
            Back to Products
          </Link>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="max-w-md mx-auto p-8 bg-gray-50 rounded-xl">
          <h2 className="text-2xl font-medium text-gray-900 mb-4">Product Not Found</h2>
          <p className="text-gray-600 mb-6">The product you're looking for doesn't exist or has been removed.</p>
          <Link
            to="/products"
            className="inline-flex items-center px-6 py-3 bg-gray-900 text-white rounded-md hover:bg-gray-800 transition-colors"
          >
            <ArrowLeft size={16} className="mr-2" />
            Back to Products
          </Link>
        </div>
      </div>
    );
  }

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
            <Link to={`/products/${product.product_id}`} className="text-gray-500 hover:text-gray-700">
              {product.title}
            </Link>
            <span className="mx-2 text-gray-400">/</span>
            <span className="text-gray-900 font-medium">Edit</span>
          </nav>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-light text-gray-900">Edit Listing</h1>
          <div className="flex gap-4">
            <Link
              to={`/products/${product.product_id}`}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-600 hover:bg-gray-50 transition-colors flex items-center"
            >
              <ArrowLeft size={16} className="mr-2" />
              Cancel
            </Link>
            <button
              onClick={() => setShowDeleteConfirm(true)}
              className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors flex items-center"
            >
              <Trash size={16} className="mr-2" />
              Delete
            </button>
          </div>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-md flex items-start">
            <AlertCircle size={20} className="text-red-500 mt-0.5 mr-3 flex-shrink-0" />
            <div>
              <p className="text-red-700">{error}</p>
            </div>
          </div>
        )}

        {/* Delete Confirmation Modal */}
        {showDeleteConfirm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-8 max-w-md w-full">
              <h3 className="text-2xl font-medium text-gray-900 mb-4">Delete Listing</h3>
              <p className="text-gray-600 mb-6">
                Are you sure you want to delete this listing? This action cannot be undone.
              </p>
              <div className="flex gap-4 justify-end">
                <button
                  onClick={() => setShowDeleteConfirm(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-600 hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDelete}
                  className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleUpdate} className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Column - Product Image */}
          <div>
            <div className="mb-6">
              <h2 className="text-xl font-medium text-gray-900 mb-4">Product Image</h2>
              <div className="aspect-square overflow-hidden rounded-xl bg-gray-50 border border-gray-200">
                <img
                  src={formData.image}
                  alt={formData.title}
                  className="h-full w-full object-contain"
                />
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
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                />
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-medium text-gray-900 mb-4">Product Information</h2>
                <div className="space-y-2">
                  <p><strong>Brand:</strong> {product.brand_name || "Unknown"}</p>
                  <p><strong>Category:</strong> {product.category_name || "Uncategorized"}</p>
                  <p><strong>Condition:</strong> {product.conditions && product.conditions.length > 0 
                    ? product.conditions.join(", ") 
                    : "Not specified"}</p>
                  <p><strong>Sizes:</strong> {product.sizes && product.sizes.length > 0 
                    ? product.sizes.join(", ") 
                    : "Not specified"}</p>
                  <p><strong>Colors:</strong> {product.colors && product.colors.length > 0 
                    ? product.colors.join(", ") 
                    : "Not specified"}</p>
                </div>
                <p className="mt-4 text-sm text-gray-500">
                  Brand, category, conditions, sizes, and colors cannot be modified directly in this version.
                </p>
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
              </div>
            </div>

            <div className="pt-6 border-t border-gray-200">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full px-6 py-3 bg-gray-900 text-white rounded-md font-medium transition-colors flex items-center justify-center ${
                  isSubmitting ? "opacity-70 cursor-not-allowed" : "hover:bg-gray-800"
                }`}
              >
                <Save size={18} className="mr-2" />
                {isSubmitting ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}