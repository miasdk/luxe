"use client"

import { useParams } from "react-router-dom"
import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import {
  Heart,
  Share2,
  ShoppingBag,
  Minus,
  Plus,
  ArrowLeft,
  Star,
  Truck,
  RotateCcw,
  Shield,
  ChevronDown,
  ChevronUp,
} from "lucide-react"
import productsService from "../services/productService"
import { useShoppingCart } from "../context/CartContext"
import ProductCarousel from "../components/ProductCarousel"

export default function ProductDetailPage() {
  const { productId } = useParams()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [activeImage, setActiveImage] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [isFavorite, setIsFavorite] = useState(false)
  const [activeTab, setActiveTab] = useState("description")
  const [openAccordion, setOpenAccordion] = useState("description")
  const { addToCart, removeFromCart, cart } = useShoppingCart()

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true)
        const data = await productsService.fetchProductById(productId)
        setProduct(data)

        // Check if product is in cart and set initial quantity
        const cartItem = cart.find((item) => item.product_id === data.product_id)
        if (cartItem) {
          setQuantity(cartItem.quantity)
        }
      } catch (error) {
        console.error("Error fetching product:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchProduct()
    // Scroll to top when component mounts
    window.scrollTo(0, 0)
  }, [productId, cart])

  const handleAddToCart = () => {
    if (product) {
      // Create a modified product with the selected quantity
      const productToAdd = {
        ...product,
        quantityToAdd: quantity,
      }
      addToCart(productToAdd)
    }
  }

  const handleRemoveFromCart = () => {
    if (product) {
      removeFromCart(product.product_id)
      setQuantity(1)
    }
  }

  const incrementQuantity = () => {
    if (product && quantity < product.stock) {
      setQuantity((prev) => prev + 1)
    }
  }

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1)
    }
  }

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite)
  }

  const toggleAccordion = (section) => {
    setOpenAccordion(openAccordion === section ? null : section)
  }

  // Generate dummy images for the gallery if product only has one image
  const generateGalleryImages = (product) => {
    if (!product) return []

    // If product has multiple images, use those
    if (product.gallery && product.gallery.length > 0) {
      return product.gallery
    }

    // Otherwise, just duplicate the main image for demonstration
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
            <Link to={`/categories/${product.category_name}`} className="text-gray-500 hover:text-gray-700">
              {product.category_name}
            </Link>
            <span className="mx-2 text-gray-400">/</span>
            <span className="text-gray-900 font-medium">{product.title}</span>
          </nav>
        </div>
      </div>

      {/* Product Detail */}
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Product Images */}
          <div className="lg:w-1/2">
            <div className="mb-4 aspect-square overflow-hidden rounded-xl bg-gray-50">
              <img
                src={galleryImages[activeImage] || product.image}
                alt={product.title}
                className="h-full w-full object-contain"
              />
            </div>
            <div className="grid grid-cols-4 gap-2">
              {galleryImages.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setActiveImage(index)}
                  className={`aspect-square overflow-hidden rounded-lg border-2 ${
                    activeImage === index ? "border-gray-900" : "border-transparent"
                  }`}
                >
                  <img
                    src={image || "/placeholder.svg"}
                    alt={`${product.title} - View ${index + 1}`}
                    className="h-full w-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="lg:w-1/2">
            <div className="mb-6">
              <div className="flex items-start justify-between">
                <div>
                  <h1 className="text-3xl font-light text-gray-900 mb-1">{product.title}</h1>
                  <p className="text-gray-500">{product.brand_name}</p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={toggleFavorite}
                    className={`p-2 rounded-full border ${
                      isFavorite
                        ? "bg-red-50 border-red-200 text-red-500"
                        : "bg-gray-50 border-gray-200 text-gray-500 hover:bg-gray-100"
                    }`}
                    aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
                  >
                    <Heart size={20} className={isFavorite ? "fill-red-500" : ""} />
                  </button>
                  <button
                    className="p-2 rounded-full bg-gray-50 border border-gray-200 text-gray-500 hover:bg-gray-100"
                    aria-label="Share product"
                  >
                    <Share2 size={20} />
                  </button>
                </div>
              </div>

              <div className="flex items-center mt-4">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      className={
                        i < Math.floor(product.rating || 4.5) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                      }
                    />
                  ))}
                </div>
                <span className="ml-2 text-sm text-gray-600">
                  {product.rating || "4.5"} ({product.reviews || "24"} reviews)
                </span>
              </div>
            </div>

            <div className="mb-6">
              <div className="flex items-baseline gap-2 mb-2">
                <span className="text-3xl font-light text-gray-900">${product.price}</span>
                {product.original_price && (
                  <span className="text-lg text-gray-500 line-through">${product.original_price}</span>
                )}
                {product.original_price && (
                  <span className="text-sm font-medium text-green-600 bg-green-50 px-2 py-0.5 rounded">
                    {Math.round(((product.original_price - product.price) / product.original_price) * 100)}% OFF
                  </span>
                )}
              </div>
              <p className="text-sm text-gray-500">
                {product.stock > 10
                  ? "In Stock"
                  : product.stock > 0
                    ? `Only ${product.stock} left in stock - order soon`
                    : "Out of Stock"}
              </p>
            </div>

            <div className="mb-8 space-y-4">
              {/* Size */}
              {/* <div>
                <h3 className="text-sm font-medium text-gray-900 mb-2">Size</h3>
                <div className="flex flex-wrap gap-2">
                  {(product.sizes || "S,M,L,XL").split(",").map((size) => (
                    <button
                      key={size}
                      className="min-w-[3rem] px-3 py-2 border border-gray-300 rounded-md text-sm font-medium hover:border-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-1"
                    >
                      {size.trim()}
                    </button>
                  ))}
                </div>
              </div> */}

              {/* Condition */}
              <div>
                <h3 className="text-sm font-medium text-gray-900 mb-2">Condition</h3>
                <div className="inline-block px-3 py-1 bg-gray-100 rounded-full text-sm font-medium text-gray-800">
                  {product.conditions || "New with tags"}
                </div>
              </div>
            </div>

            {/* Add to Cart */}
            <div className="mb-8">
              {product.stock > 0 ? (
                <>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="flex items-center border border-gray-300 rounded-md">
                      <button
                        onClick={decrementQuantity}
                        disabled={quantity <= 1}
                        className={`p-2 ${quantity <= 1 ? "text-gray-300" : "text-gray-600 hover:bg-gray-50"}`}
                        aria-label="Decrease quantity"
                      >
                        <Minus size={16} />
                      </button>
                      <span className="w-12 text-center text-gray-900">{quantity}</span>
                      <button
                        onClick={incrementQuantity}
                        disabled={quantity >= product.stock}
                        className={`p-2 ${
                          quantity >= product.stock ? "text-gray-300" : "text-gray-600 hover:bg-gray-50"
                        }`}
                        aria-label="Increase quantity"
                      >
                        <Plus size={16} />
                      </button>
                    </div>
                    <span className="text-sm text-gray-500">{product.stock} available</span>
                  </div>

                  {cartQuantity > 0 ? (
                    <div className="flex flex-col sm:flex-row gap-4">
                      <button
                        onClick={handleRemoveFromCart}
                        className="flex-1 px-6 py-3 border border-gray-300 rounded-md text-gray-700 font-medium hover:bg-gray-50 transition-colors"
                      >
                        Remove from Cart
                      </button>
                      <Link
                        to="/cart"
                        className="flex-1 px-6 py-3 bg-gray-900 text-white rounded-md font-medium hover:bg-gray-800 transition-colors flex items-center justify-center"
                      >
                        <ShoppingBag size={18} className="mr-2" />
                        View Cart ({cartQuantity})
                      </Link>
                    </div>
                  ) : (
                    <button
                      onClick={handleAddToCart}
                      className="w-full px-6 py-3 bg-gray-900 text-white rounded-md font-medium hover:bg-gray-800 transition-colors flex items-center justify-center"
                    >
                      <ShoppingBag size={18} className="mr-2" />
                      Add to Cart
                    </button>
                  )}
                </>
              ) : (
                <button
                  disabled
                  className="w-full px-6 py-3 bg-gray-200 text-gray-500 rounded-md font-medium cursor-not-allowed"
                >
                  Out of Stock
                </button>
              )}
            </div>

            {/* Shipping & Returns */}
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

      {/* Product Details Tabs (Desktop) */}
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
            <button
              onClick={() => setActiveTab("reviews")}
              className={`px-6 py-4 text-sm font-medium ${
                activeTab === "reviews"
                  ? "text-gray-900 border-b-2 border-gray-900"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Reviews
            </button>
          </div>

          <div className="py-8">
            {activeTab === "description" && (
              <div className="max-w-3xl">
                <p className="text-gray-600 leading-relaxed">
                  {product.description ||
                    "This premium product exemplifies quality craftsmanship and attention to detail. Designed for both style and functionality, it features high-quality materials that ensure durability and long-lasting performance. The elegant design complements any style, making it a versatile addition to your collection."}
                </p>
              </div>
            )}

            {activeTab === "details" && (
              <div className="max-w-3xl">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-sm font-medium text-gray-900 mb-2">Product Details</h3>
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li>
                        <span className="font-medium">Brand:</span> {product.brand_name}
                      </li>
                      <li>
                        <span className="font-medium">Condition:</span> {product.conditions || "New with tags"}
                      </li>
                      <li>
                        <span className="font-medium">Size:</span> {product.sizes}
                      </li>
                      <li>
                        <span className="font-medium">SKU:</span> {product.product_id}
                      </li>
                      <li>
                        <span className="font-medium">Category:</span> {product.category_name}
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-900 mb-2">Materials & Care</h3>
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li>Premium quality materials</li>
                      <li>Ethically sourced and manufactured</li>
                      <li>Follow care instructions on label</li>
                      <li>Designed to last with proper care</li>
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "reviews" && (
              <div className="max-w-3xl">
                <div className="flex items-center mb-6">
                  <div className="flex mr-4">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={20}
                        className={
                          i < Math.floor(product.rating || 4.5) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                        }
                      />
                    ))}
                  </div>
                  <span className="text-lg font-medium text-gray-900">{product.rating || "4.5"} out of 5</span>
                  <span className="ml-2 text-sm text-gray-500">Based on {product.reviews || "24"} reviews</span>
                </div>

                <div className="space-y-6">
                  {/* Sample reviews - would be replaced with actual reviews from API */}
                  <div className="border-b border-gray-200 pb-6">
                    <div className="flex items-center mb-2">
                      <div className="flex mr-2">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            size={16}
                            className={i < 5 ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}
                          />
                        ))}
                      </div>
                      <span className="text-sm font-medium text-gray-900">Sarah J.</span>
                      <span className="mx-2 text-gray-300">•</span>
                      <span className="text-sm text-gray-500">2 months ago</span>
                    </div>
                    <p className="text-gray-600">
                      Absolutely love this product! The quality is exceptional and it looks even better in person.
                      Shipping was fast and the packaging was secure. Would definitely recommend!
                    </p>
                  </div>

                  <div className="border-b border-gray-200 pb-6">
                    <div className="flex items-center mb-2">
                      <div className="flex mr-2">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            size={16}
                            className={i < 4 ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}
                          />
                        ))}
                      </div>
                      <span className="text-sm font-medium text-gray-900">Michael T.</span>
                      <span className="mx-2 text-gray-300">•</span>
                      <span className="text-sm text-gray-500">1 month ago</span>
                    </div>
                    <p className="text-gray-600">
                      Great product overall. The quality is good and it arrived as described. Took off one star because
                      shipping was a bit slower than expected, but the product itself is excellent.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Product Details Accordion (Mobile) */}
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
                  {product.description ||
                    "This premium product exemplifies quality craftsmanship and attention to detail. Designed for both style and functionality, it features high-quality materials that ensure durability and long-lasting performance. The elegant design complements any style, making it a versatile addition to your collection."}
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
                      <li>
                        <span className="font-medium">Brand:</span> {product.brand_name}
                      </li>
                      <li>
                        <span className="font-medium">Condition:</span> {product.conditions || "New with tags"}
                      </li>
                      <li>
                        <span className="font-medium">Size:</span> {product.sizes}
                      </li>
                      <li>
                        <span className="font-medium">SKU:</span> {product.product_id}
                      </li>
                      <li>
                        <span className="font-medium">Category:</span> {product.category_name}
                      </li>
                    </ul>
                  </div>
                </div>
              )}
            </div>

            <div className="py-4">
              <button
                onClick={() => toggleAccordion("reviews")}
                className="flex w-full items-center justify-between text-left"
              >
                <span className="text-sm font-medium text-gray-900">Reviews</span>
                {openAccordion === "reviews" ? (
                  <ChevronUp size={16} className="text-gray-500" />
                ) : (
                  <ChevronDown size={16} className="text-gray-500" />
                )}
              </button>
              {openAccordion === "reviews" && (
                <div className="mt-4 space-y-4">
                  <div className="flex items-center mb-4">
                    <div className="flex mr-2">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={16}
                          className={
                            i < Math.floor(product.rating || 4.5) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                          }
                        />
                      ))}
                    </div>
                    <span className="text-sm font-medium text-gray-900">
                      {product.rating || "4.5"} ({product.reviews || "24"} reviews)
                    </span>
                  </div>

                  <div className="space-y-4">
                    <div className="border-b border-gray-200 pb-4">
                      <div className="flex items-center mb-2">
                        <div className="flex mr-2">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              size={14}
                              className={i < 5 ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}
                            />
                          ))}
                        </div>
                        <span className="text-xs font-medium text-gray-900">Sarah J.</span>
                      </div>
                      <p className="text-xs text-gray-600">
                        Absolutely love this product! The quality is exceptional and it looks even better in person.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Related Products */}
      <div className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <div className="mb-10">
            <h2 className="text-2xl font-light text-gray-900 mb-2">You May Also Like</h2>
            <p className="text-gray-600">Explore more items from the {product.category_name} collection</p>
          </div>

          <ProductCarousel category={product.category_name} />
        </div>
      </div>
    </div>
  )
}
