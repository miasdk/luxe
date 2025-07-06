import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import {
  ArrowLeft,
  Save,
  Trash,
  AlertCircle,
  Eye,
  Edit3,
  Image as ImageIcon,
  Info
} from "lucide-react";
import productsService from "../services/productService";
import brandService from "../services/brandService";
import categoryService from "../services/categoryService";
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
    original_price: "",
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
    if (!colorNames || !Array.isArray(colorNames)) return [];
    
    return colorNames.map(name => {
      const color = colorData.find(c => c.name.toLowerCase() === name.toLowerCase());
      return color ? color.id : null;
    }).filter(id => id !== null);
  };

  const getSizeIdsByNames = (sizeNames) => {
    if (!sizeNames || !Array.isArray(sizeNames)) return [];
    
    return sizeNames.map(name => {
      const size = sizeData.find(s => s.name.toLowerCase() === name.toLowerCase());
      return size ? size.id : null;
    }).filter(id => id !== null);
  };

  const getConditionIdsByNames = (conditionNames) => {
    if (!conditionNames || !Array.isArray(conditionNames)) return [];
    
    return conditionNames.map(name => {
      const condition = conditionData.find(c => c.name === name);
      return condition ? condition.id : null;
    }).filter(id => id !== null);
  };

  // Fetch reference data and product
  useEffect(() => {
    const fetchAllData = async () => {
      setLoading(true);
      setError(null);
      
      try {
        // Fetch reference data first (brands and categories)
        let brandsData, categoriesData;
        
        try {
          const brandsPromise = brandService.fetchAllBrands();
          const categoriesPromise = categoryService.fetchAllCategories();
          
          [brandsData, categoriesData] = await Promise.all([
            brandsPromise,
            categoriesPromise
          ]);
          
          if (!brandsData || !Array.isArray(brandsData)) {
            throw new Error("Invalid brands data received");
          }
          
          if (!categoriesData || !Array.isArray(categoriesData)) {
            throw new Error("Invalid categories data received");
          }
          
        } catch (refError) {
          console.error("Error fetching reference data:", refError);
          throw new Error(`Failed to load reference data: ${refError.message}`);
        }
        
        setBrands(brandsData);
        setCategories(categoriesData);
        
        // Now fetch the product details
        try {
          const productData = await productsService.fetchProductById(id);
          
          if (!productData) {
            throw new Error("Product not found");
          }
          
          setProduct(productData);
          
          setFormData({
            title: productData.title || "",
            price: productData.price || "",
            original_price: productData.original_price || "",
            description: productData.description || "",
            image: productData.image || ""
          });
          
        } catch (productError) {
          console.error("Error fetching product:", productError);
          throw new Error(`Failed to load product: ${productError.message}`);
        }
        
      } catch (err) {
        console.error("Error in fetchAllData:", err);
        setError(err.message || "Failed to load data");
      } finally {
        setLoading(false);
      }
    };
    
    fetchAllData();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    
    if (!formData.title || !formData.price || !formData.description) {
      setError("Title, price, and description are required");
      return;
    }
    
    setIsSubmitting(true);
    setError(null);
    
    try {
      const brandId = getBrandIdByName(product.brand_name);
      const categoryId = getCategoryIdByName(product.category_name);
      
      const colorIds = getColorIdsByNames(product.colors || []);
      const sizeIds = getSizeIdsByNames(product.sizes || []);
      const conditionIds = getConditionIdsByNames(product.conditions || []);
      
      if (!brandId) {
        throw new Error(`Could not find brand ID for "${product.brand_name}"`);
      }
      
      if (!categoryId) {
        throw new Error(`Could not find category ID for "${product.category_name}"`);
      }
      
      const updatedProduct = {
        title: formData.title,
        price: parseFloat(formData.price),
        original_price: formData.original_price ? parseFloat(formData.original_price) : null,
        description: formData.description,
        image: formData.image,
        brand_id: brandId,
        category_id: categoryId,
        color_ids: colorIds,
        size_ids: sizeIds,
        condition_ids: conditionIds
      };
      
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
      await productsService.deleteProduct(product.product_id);
      navigate("/products", { state: { message: "Product deleted successfully" } });
    } catch (err) {
      setError(err.message || "Failed to delete product");
      window.scrollTo(0, 0);
    }
  };

  if (loading) {
    return (
      <div className="bg-gray-50 min-h-screen">
        <div className="bg-white border-b border-gray-200">
          <div className="container mx-auto px-4 py-6 max-w-4xl">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-200 rounded w-48 mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-64"></div>
            </div>
          </div>
        </div>
        <div className="container mx-auto px-4 py-12 max-w-4xl">
          <div className="bg-white rounded-2xl p-8 shadow-sm animate-pulse">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <div className="aspect-square bg-gray-200 rounded-xl mb-4"></div>
                <div className="space-y-3">
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="h-6 bg-gray-200 rounded w-3/4"></div>
                <div className="h-4 bg-gray-200 rounded"></div>
                <div className="h-32 bg-gray-200 rounded"></div>
                <div className="h-12 bg-gray-200 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error && !product) {
    return (
      <div className="bg-gray-50 min-h-screen flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8 text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <AlertCircle size={28} className="text-red-500" />
          </div>
          <h2 className="text-2xl font-light text-gray-900 mb-3">Unable to Load Product</h2>
          <p className="text-gray-600 mb-8">{error}</p>
          <Link
            to="/products"
            className="inline-flex items-center px-6 py-3 bg-gray-900 text-white font-medium rounded-md hover:bg-gray-800 transition-colors"
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
      <div className="bg-gray-50 min-h-screen flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8 text-center">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <AlertCircle size={28} className="text-gray-400" />
          </div>
          <h2 className="text-2xl font-light text-gray-900 mb-3">Product Not Found</h2>
          <p className="text-gray-600 mb-8">The product you're looking for doesn't exist or has been removed.</p>
          <Link
            to="/products"
            className="inline-flex items-center px-6 py-3 bg-gray-900 text-white font-medium rounded-md hover:bg-gray-800 transition-colors"
          >
            <ArrowLeft size={16} className="mr-2" />
            Back to Products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-6 max-w-4xl">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-light text-gray-900 mb-1">Edit Listing</h1>
              <p className="text-gray-600">Update your product details</p>
            </div>
            <div className="flex items-center gap-3">
              <Link
                to={`/products/${product.product_id}`}
                className="inline-flex items-center px-4 py-2 border border-gray-300 text-gray-700 font-medium rounded-md hover:bg-gray-50 transition-colors"
              >
                <Eye size={16} className="mr-2" />
                View Product
              </Link>
              <Link
                to={`/products/${product.product_id}`}
                className="inline-flex items-center px-4 py-2 border border-gray-300 text-gray-700 font-medium rounded-md hover:bg-gray-50 transition-colors"
              >
                <ArrowLeft size={16} className="mr-2" />
                Cancel
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 max-w-4xl">
        {error && (
          <div className="mb-8 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
            <AlertCircle size={20} className="text-red-500 mt-0.5 flex-shrink-0" />
            <div>
              <h3 className="text-red-800 font-medium mb-1">Error updating product</h3>
              <p className="text-red-700 text-sm">{error}</p>
            </div>
          </div>
        )}

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Product Image & Info */}
          <div className="lg:col-span-1 space-y-6">
            {/* Current Image */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h2 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                <ImageIcon size={20} className="mr-2" />
                Product Image
              </h2>
              <div className="aspect-square bg-gray-50 border border-gray-200 rounded-xl overflow-hidden mb-4">
                {formData.image ? (
                  <img
                    src={formData.image}
                    alt={formData.title}
                    className="w-full h-full object-contain"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <div className="text-center">
                      <ImageIcon size={32} className="mx-auto text-gray-400 mb-2" />
                      <p className="text-sm text-gray-500">No image</p>
                    </div>
                  </div>
                )}
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
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-colors text-sm"
                />
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h2 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                <Info size={20} className="mr-2" />
                Product Information
              </h2>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between py-2 border-b border-gray-100">
                  <span className="text-gray-600">Brand</span>
                  <span className="font-medium text-gray-900">{product.brand_name || "Unknown"}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-100">
                  <span className="text-gray-600">Category</span>
                  <span className="font-medium text-gray-900">{product.category_name || "Uncategorized"}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-100">
                  <span className="text-gray-600">Condition</span>
                  <span className="font-medium text-gray-900">
                    {product.conditions && product.conditions.length > 0 
                      ? product.conditions.join(", ") 
                      : "Not specified"}
                  </span>
                </div>
                <div className="py-2 border-b border-gray-100">
                  <span className="text-gray-600 block mb-1">Sizes</span>
                  <span className="font-medium text-gray-900 text-xs">
                    {product.sizes && product.sizes.length > 0 
                      ? product.sizes.join(", ") 
                      : "Not specified"}
                  </span>
                </div>
                <div className="py-2">
                  <span className="text-gray-600 block mb-1">Colors</span>
                  <span className="font-medium text-gray-900 text-xs">
                    {product.colors && product.colors.length > 0 
                      ? product.colors.join(", ") 
                      : "Not specified"}
                  </span>
                </div>
              </div>

            </div>

            {/* Delete Section */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-red-100">
              <h3 className="text-lg font-medium text-red-900 mb-2">Danger Zone</h3>
              <p className="text-sm text-red-700 mb-4">
                Permanently delete this listing. This action cannot be undone.
              </p>
              <button
                onClick={() => setShowDeleteConfirm(true)}
                className="w-full px-4 py-2 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 transition-colors flex items-center justify-center"
              >
                <Trash size={16} className="mr-2" />
                Delete Listing
              </button>
            </div>
          </div>

          <div className="lg:col-span-2">
            <form onSubmit={handleUpdate} className="bg-white rounded-2xl p-8 shadow-sm">
              <div className="mb-8">
                <h2 className="text-2xl font-light text-gray-900 mb-2 flex items-center">
                  <Edit3 size={24} className="mr-2" />
                  Edit Product Details
                </h2>
                <p className="text-gray-600">Update the information for your listing</p>
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
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-colors"
                    placeholder="Enter product title"
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
                    required
                    rows="6"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-colors resize-none"
                    placeholder="Describe your product..."
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-2">
                      Current Price
                    </label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
                      <input
                        type="number"
                        id="price"
                        name="price"
                        value={formData.price}
                        onChange={handleInputChange}
                        required
                        min="0"
                        step="0.01"
                        placeholder="0.00"
                        className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="original_price" className="block text-sm font-medium text-gray-700 mb-2">
                      Original Price <span className="text-gray-400 text-xs">(optional)</span>
                    </label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
                      <input
                        type="number"
                        id="original_price"
                        name="original_price"
                        value={formData.original_price}
                        onChange={handleInputChange}
                        min="0"
                        step="0.01"
                        placeholder="0.00"
                        className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-colors"
                      />
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      Show the original retail price to highlight savings
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex justify-end mt-8 pt-6 border-t border-gray-200">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`px-8 py-3 rounded-lg font-medium transition-colors flex items-center ${
                    isSubmitting
                      ? "bg-gray-400 text-white cursor-not-allowed"
                      : "bg-gray-900 text-white hover:bg-gray-800"
                  }`}
                >
                  <Save size={18} className="mr-2" />
                  {isSubmitting ? "Saving Changes..." : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>

        {showDeleteConfirm && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Trash size={28} className="text-red-600" />
                </div>
                <h3 className="text-2xl font-light text-gray-900 mb-2">Delete Listing</h3>
                <p className="text-gray-600">
                  Are you sure you want to permanently delete "<strong>{product.title}</strong>"? 
                  This action cannot be undone.
                </p>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowDeleteConfirm(false)}
                  className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDelete}
                  className="flex-1 px-4 py-3 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 transition-colors"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}