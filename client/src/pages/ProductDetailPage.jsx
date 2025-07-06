"use client"
import { useParams } from "react-router-dom"
import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import {
  ShoppingBag,
  Minus,
  Plus,
  ArrowLeft,
  Truck,
  RotateCcw,
  Shield,
  ChevronDown,
  ChevronUp,
  Pencil,
  Heart,
} from "lucide-react"
import productsService from "../services/productService"
import { useCart } from "../context/CartContext"
import ProductCarousel from "../components/ProductCarousel"
import WishlistButton from '../components/WishlistButton';
import Breadcrumb from '../components/Breadcrumb';
import CartModal from '../components/CartModal';
import PriceDisplay from '../components/PriceDisplay';


export default function ProductDetailPage() {
  const { productId } = useParams()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [activeImage, setActiveImage] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [activeTab, setActiveTab] = useState("description")
  const [openAccordion, setOpenAccordion] = useState("description")
  const [isCartModalOpen, setIsCartModalOpen] = useState(false)
  const { addToCart, removeFromCart, cart } = useCart()

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true)
        const data = await productsService.fetchProductById(productId)
        setProduct(data)
      } catch (error) {
        console.error("Error fetching product:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchProduct()
    window.scrollTo(0, 0)
  }, [productId])

  // Listen for product likes updates
  useEffect(() => {
    const handleProductRefresh = async () => {
      if (productId) {
        try {
          const data = await productsService.fetchProductById(productId)
          setProduct(data)
        } catch (error) {
          console.error("Error refreshing product:", error)
        }
      }
    }

    window.addEventListener('productLikesUpdated', handleProductRefresh)
    
    return () => {
      window.removeEventListener('productLikesUpdated', handleProductRefresh)
    }
  }, [productId])

  const handleAddToCart = () => {
    if (product) {
      addToCart(product, 1)  // Always add 1 item
    }
  }

  const handleRemoveFromCart = () => {
    if (product) {
      const cartItem = cart.find(item => item.product_id === product.product_id)
      if (cartItem) {
        removeFromCart(product.product_id, cartItem.quantity)
      }
    }
  }

  const incrementQuantity = () => {
    if (product && quantity < (product.stock || 999)) {
      setQuantity((prev) => prev + 1)
    }
  }

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1)
    }
  }

  const toggleAccordion = (section) => {
    setOpenAccordion(openAccordion === section ? null : section)
  }

  const generateGalleryImages = (product) => {
    if (!product) return []

    if (product.gallery && product.gallery.length > 0) {
      return product.gallery
    }

    return [product.image, product.image, product.image, product.image]
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="animate-pulse">
          <div className="flex flex-col md:flex-row gap-12">
            <div className="md:w-1/2">
              <div className="aspect-square bg-gray-200 rounded-xl mb-4"></div>
              <div className="grid grid-cols-4 gap-2">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="aspect-square bg-gray-200 rounded-lg"></div>
                ))}
              </div>
            </div>
            <div className="md:w-1/2 space-y-4">
              <div className="h-8 bg-gray-200 rounded w-3/4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/4"></div>
              <div className="h-6 bg-gray-200 rounded w-1/3"></div>
              <div className="space-y-2">
                <div className="h-4 bg-gray-200 rounded"></div>
                <div className="h-4 bg-gray-200 rounded"></div>
                <div className="h-4 bg-gray-200 rounded w-5/6"></div>
              </div>
              <div className="h-10 bg-gray-200 rounded w-1/3"></div>
              <div className="h-12 bg-gray-200 rounded"></div>
            </div>
          </div>
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

  const galleryImages = generateGalleryImages(product)
  const isInCart = cart.find((item) => item.product_id === product.product_id)
  const cartQuantity = isInCart ? isInCart.quantity : 0

  return (
    <div className="bg-white">
      <div className="py-5  border-gray-100">
      <div className="container mx-auto px-4">
        <Breadcrumb 
          items={[
            { label: 'Products', href: '/products' },
            { 
              label: product.category_name, 
              href: `/products?category=${encodeURIComponent(product.category_name)}` 
            },
            ...(product.brand_name ? [{ 
              label: product.brand_name, 
              href: `/products?category=${encodeURIComponent(product.category_name)}&brand=${encodeURIComponent(product.brand_name)}` 
            }] : []),
            { label: product.title, href: null }
          ]} 
        />
      </div>
    </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-12">
          <div className="md:w-1/2">
            <div className="mb-4 aspect-square overflow-hidden rounded-xl ">
              <img
                src={galleryImages[activeImage] || product.image}
                alt={product.title}
                className="h-full w-full object-contain"
              />
            </div>
          </div>

          <div className="md:w-1/2">
            <div className="mb-6">
              <div className="flex items-start justify-between">
                <div className="flex-1 min-w-0">
                  <h1 className="text-3xl font-light text-gray-900 mb-1">{product.title}</h1>
                  <div className="flex items-center gap-4 mb-2">
                    {product.brand_name && (
                      <p className="text-gray-500">{product.brand_name}</p>
                    )}
                    {product.seller_name && (
                      <div className="flex items-center gap-2">
                        <span className="text-gray-300">•</span>
                        <p className="text-gray-500">Sold by <span className="font-medium">{product.seller_name}</span></p>
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex flex-row gap-2 ml-4">

                <div className="flex flex-col items-center">
                    <WishlistButton 
                        productId={product.product_id} 
                        className="p-2 rounded-full border bg-gray-50 border-gray-200 hover:bg-gray-100"
                        showText={false}
                        size={20}
                    />
                  <span className="text-xs text-gray-500 mt-1">
                    {product.num_likes} {product.num_likes === 1 ? 'like' : 'likes'}
                  </span>
                  </div>
                  <div className="flex flex-col items-center">
                    <Link
                      to={`/update-listing/${product.product_id}`}
                      className="p-2 rounded-full border border-gray-200 text-gray-500 hover:bg-gray-100"
                      aria-label="Edit product"
                    >
                      <Pencil size={20} />
                    </Link>
                     <span className="text-xs text-gray-500 mt-1">
                        Edit
                      </span>
                      </div>
                </div>
              </div>
            </div>

            <div className="mb-6">
              <div className="mb-2">
                <PriceDisplay 
                  price={product.price}
                  originalPrice={product.original_price}
                  size="large"
                />
              </div>
              <p className="text-sm text-gray-500">
                In Stock
              </p>
            </div>

            {product.conditions && (
              <div className="mb-8 space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-900 mb-2">Condition</h3>
                  <div className="inline-block px-3 py-1 bg-gray-100 rounded-full text-sm font-medium text-gray-800">
                    {product.conditions}
                  </div>
                </div>
              </div>
            )}

            <div className="mb-8">
              {cartQuantity > 0 ? (
                <div className="space-y-4">
                  <div className="flex items-center justify-center gap-4">
                    <div className="flex items-center border border-gray-300 rounded-md">
                      <button
                        onClick={() => removeFromCart(product.product_id, 1)}
                        disabled={cartQuantity <= 1}
                        className={`p-2 ${cartQuantity <= 1 ? "text-gray-300" : "text-gray-600 hover:bg-gray-50"}`}
                        aria-label="Decrease quantity"
                      >
                        <Minus size={16} />
                      </button>
                      <span className="w-12 text-center text-gray-900">{cartQuantity}</span>
                      <button
                        onClick={() => addToCart(product, 1)}
                        className="p-2 text-gray-600 hover:bg-gray-50"
                        aria-label="Increase quantity"
                      >
                        <Plus size={16} />
                      </button>
                    </div>
                    {product.stock && (
                      <span className="text-sm text-gray-500">{product.stock} available</span>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-4">
                    <button
                      onClick={handleRemoveFromCart}
                      className="flex-1 px-6 py-3 border border-red-300 text-red-600 rounded-md font-medium hover:bg-red-50 transition-colors"
                    >
                      Remove from Cart
                    </button>
                    <button
                      onClick={() => setIsCartModalOpen(true)}
                      className="flex-1 px-6 py-3 bg-gray-900 text-white rounded-md font-medium hover:bg-gray-800 transition-colors flex items-center justify-center"
                    >
                      <ShoppingBag size={18} className="mr-2" />
                      ({cartQuantity}) View Cart
                    </button>
                  </div>
                </div>
              ) : (
                <div>
                  <button
                    onClick={handleAddToCart}
                    className="w-full px-6 py-3 bg-gray-900 text-white rounded-md font-medium hover:bg-gray-800 transition-colors flex items-center justify-center"
                  >
                    <ShoppingBag size={18} className="mr-2" />
                    Add to Cart
                  </button>
                </div>
              )}
            </div>

            <div className="border-t border-gray-200 pt-6 space-y-4">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-gray-100 rounded-full">
                  <Truck size={18} className="text-gray-700" />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-900">Free Shipping</h3>
                  <p className="text-sm text-gray-500">On orders over $100. Estimated delivery: 3-5 business days</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="p-2 bg-gray-100 rounded-full">
                  <RotateCcw size={18} className="text-gray-700" />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-900">Easy Returns</h3>
                  <p className="text-sm text-gray-500">30-day return policy. See our return policy for details</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="p-2 bg-gray-100 rounded-full">
                  <Shield size={18} className="text-gray-700" />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-900">Buyer Protection</h3>
                  <p className="text-sm text-gray-500">Shop with confidence with our buyer protection guarantee</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="hidden md:block border-t border-gray-200">
        <div className="container mx-auto px-4">
          <div className="flex border-b border-gray-200">
            <button
              onClick={() => setActiveTab("description")}
              className={`px-6 py-4 text-sm font-medium ${
                activeTab === "description"
                  ? "text-gray-900 border-b-2 border-gray-900"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Description
            </button>
            <button
              onClick={() => setActiveTab("details")}
              className={`px-6 py-4 text-sm font-medium ${
                activeTab === "details"
                  ? "text-gray-900 border-b-2 border-gray-900"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Details
            </button>
          </div>

          <div className="py-8">
            {activeTab === "description" && (
              <div className="max-w-3xl">
                <p className="text-gray-600 leading-relaxed">
                  {product.description || "No description available for this product."}
                </p>
              </div>
            )}

            {activeTab === "details" && (
              <div className="max-w-3xl">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-sm font-medium text-gray-900 mb-2">Product Details</h3>
                    <ul className="space-y-2 text-sm text-gray-600">
                      {product.brand_name && (
                        <li>
                          <span className="font-medium">Brand:</span> {product.brand_name}
                        </li>
                      )}
                      {product.conditions && (
                        <li>
                          <span className="font-medium">Condition:</span> {product.conditions}
                        </li>
                      )}
                      {product.sizes && (
                        <li>
                          <span className="font-medium">Size:</span> {product.sizes}
                        </li>
                      )}
                      <li>
                        <span className="font-medium">SKU:</span> {product.product_id}
                      </li>
                      {product.category_name && (
                        <li>
                          <span className="font-medium">Category:</span> {product.category_name}
                        </li>
                      )}
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-900 mb-2">Shipping & Care</h3>
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li>Fast and secure shipping</li>
                      <li>Carefully packaged for protection</li>
                      <li>Follow care instructions if provided</li>
                      <li>Contact us with any questions</li>
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="md:hidden border-t border-gray-200">
        <div className="container mx-auto px-4">
          <div className="divide-y divide-gray-200">
            <div className="py-4">
              <button
                onClick={() => toggleAccordion("description")}
                className="flex w-full items-center justify-between text-left"
              >
                <span className="text-sm font-medium text-gray-900">Description</span>
                {openAccordion === "description" ? (
                  <ChevronUp size={16} className="text-gray-500" />
                ) : (
                  <ChevronDown size={16} className="text-gray-500" />
                )}
              </button>
              {openAccordion === "description" && (
                <div className="mt-4 text-sm text-gray-600 leading-relaxed">
                  {product.description || "No description available for this product."}
                </div>
              )}
            </div>

            <div className="py-4">
              <button
                onClick={() => toggleAccordion("details")}
                className="flex w-full items-center justify-between text-left"
              >
                <span className="text-sm font-medium text-gray-900">Details</span>
                {openAccordion === "details" ? (
                  <ChevronUp size={16} className="text-gray-500" />
                ) : (
                  <ChevronDown size={16} className="text-gray-500" />
                )}
              </button>
              {openAccordion === "details" && (
                <div className="mt-4 space-y-4">
                  <div>
                    <h3 className="text-sm font-medium text-gray-900 mb-2">Product Details</h3>
                    <ul className="space-y-2 text-sm text-gray-600">
                      {product.brand_name && (
                        <li>
                          <span className="font-medium">Brand:</span> {product.brand_name}
                        </li>
                      )}
                      {product.conditions && (
                        <li>
                          <span className="font-medium">Condition:</span> {product.conditions}
                        </li>
                      )}
                      {product.sizes && (
                        <li>
                          <span className="font-medium">Size:</span> {product.sizes}
                        </li>
                      )}
                      <li>
                        <span className="font-medium">SKU:</span> {product.product_id}
                      </li>
                      {product.category_name && (
                        <li>
                          <span className="font-medium">Category:</span> {product.category_name}
                        </li>
                      )}
                    </ul>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <div className="mb-10">
            <h2 className="text-2xl font-light text-gray-900 mb-2">You May Also Like</h2>
            <p className="text-gray-600">Explore more items from the {product.category_name} collection</p>
          </div>

          <ProductCarousel category={product.category_name} />
        </div>
      </div>

      <CartModal 
        isOpen={isCartModalOpen} 
        onClose={() => setIsCartModalOpen(false)} 
      />
    </div>
  )
}