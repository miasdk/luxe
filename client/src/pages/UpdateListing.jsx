// UpdateListing.jsx
import { useState, useEffect } from "react"
import { useParams, useNavigate, Link } from "react-router-dom"
import {
  ArrowLeft,
  Save,
  Trash,
  AlertCircle
} from "lucide-react"
import productsService from "../services/productService"
import { colorData } from "../data/colors";
import { conditionData } from "../data/conditions";
import { sizeData } from "../data/sizes";

export default function UpdateListing() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [formData, setFormData] = useState({
    title: "",
    price: "",
    original_price: "",
    description: "",
    stock: "",
    conditions: "",
    brand_name: "",
    category_name: "",
    sizes: ""
  })
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const colors = colorData;
  const conditions = conditionData;
  const sizes = sizeData;

  useEffect(() => {
  const fetchProduct = async () => {
    try {
      setLoading(true);
      const productData = await productsService.fetchProductById(id);
      
      setProduct(productData);
      
      setFormData({
        title: productData.title || "",
        price: productData.price || "",
        original_price: productData.original_price || "",
        description: productData.description || "",
        stock: productData.stock || 1,
        conditions: productData.conditions || "",       // If backend returns conditions string
        brand_name: productData.brand_name || "",       // If backend returns brand_name
        category_name: productData.category_name || "", // If backend returns category_name
        sizes: productData.sizes || "",                 // If backend returns sizes string
        image: productData.image || ""
      });
    } catch (err) {
      console.error("Error fetching product:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  fetchProduct();
}, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value
    })
  }

  const handleUpdate = async (e) => {
    e.preventDefault()
    try {
      // Convert price and original_price to numbers
      const updatedProduct = {
        ...formData,
        price: parseFloat(formData.price),
        original_price: formData.original_price ? parseFloat(formData.original_price) : null,
        stock: parseInt(formData.stock)
      }

      await productsService.updateProduct(id, updatedProduct)
      navigate(`/products/${id}`, { state: { message: "Product updated successfully" } })
    } catch (err) {
      setError(err.message)
      window.scrollTo(0, 0)
    }
  }

  const handleDelete = async () => {
    try {
      await productsService.deleteProduct(id)
      navigate("/products", { state: { message: "Product deleted successfully" } })
    } catch (err) {
      setError(err.message)
      window.scrollTo(0, 0)
    }
  }

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
    )
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
    )
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
    )
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
                  src={product.image}
                  alt={product.title}
                  className="h-full w-full object-contain"
                />
              </div>
              <p className="text-sm text-gray-500 mt-2">
                Image upload functionality will be available soon
              </p>
            </div>

            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-medium text-gray-900 mb-4">Product Categories</h2>
                <div className="space-y-4">
                    <div>
                    <label htmlFor="category_name" className="block text-sm font-medium text-gray-700 mb-1">
                        Category
                    </label>
                    <select
                        id="category_name"
                        name="category_name"
                        value={formData.category_name}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                    >
                        <option value="">Select a category</option>
                        <option value="Dresses">Dresses</option>
                        <option value="Tops">Tops</option>
                        <option value="Sweaters">Sweaters</option>
                        <option value="Pants">Pants</option>
                        <option value="Skirts">Skirts</option>
                        <option value="Shoes">Shoes</option>
                    </select>
                    </div>
                  <div>
                    <label htmlFor="brand_name" className="block text-sm font-medium text-gray-700 mb-1">
                      Brand
                    </label>
                    <input
                      type="text"
                      id="brand_name"
                      name="brand_name"
                      value={formData.brand_name}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                    />
                  </div>
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

                <div className="grid grid-cols-2 gap-4">
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

                  <div>
                    <label htmlFor="original_price" className="block text-sm font-medium text-gray-700 mb-1">
                      Original Price ($) (optional)
                    </label>
                    <input
                      type="number"
                      id="original_price"
                      name="original_price"
                      value={formData.original_price}
                      onChange={handleInputChange}
                      min="0"
                      step="0.01"
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="stock" className="block text-sm font-medium text-gray-700 mb-1">
                      Stock
                    </label>
                    <input
                      type="number"
                      id="stock"
                      name="stock"
                      value={formData.stock}
                      onChange={handleInputChange}
                      required
                      min="0"
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label htmlFor="conditions" className="block text-sm font-medium text-gray-700 mb-1">
                      Condition
                    </label>
                    <select
                      id="conditions"
                      name="conditions"
                      value={formData.conditions}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                    >
                      <option value="">Select condition</option>
                      <option value="New with tags">New with tags</option>
                      <option value="New without tags">New without tags</option>
                      <option value="Like new">Like new</option>
                      <option value="Good">Good</option>
                      <option value="Fair">Fair</option>
                      <option value="Poor">Poor</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="sizes" className="block text-sm font-medium text-gray-700 mb-1">
                    Sizes (comma separated if multiple)
                  </label>
                  <input
                    type="text"
                    id="sizes"
                    name="sizes"
                    value={formData.sizes}
                    onChange={handleInputChange}
                    placeholder="e.g. S,M,L,XL"
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Leave empty if not applicable or enter sizes separated by commas (S,M,L,XL)
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-gray-200">
              <button
                type="submit"
                className="w-full px-6 py-3 bg-gray-900 text-white rounded-md font-medium hover:bg-gray-800 transition-colors flex items-center justify-center"
              >
                <Save size={18} className="mr-2" />
                Save Changes
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}