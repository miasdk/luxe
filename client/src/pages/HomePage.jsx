import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import { useAuthContext } from "../context/AuthContext"
import ProductCarousel from "../components/ProductCarousel"
import CategoryCarousel from "../components/CategoryCarousel"
import WishlistButton from "../components/WishlistButton"
import { Truck, RotateCcw, ArrowRight, Heart, Shield, Star, Zap, TrendingUp } from "lucide-react"
import brandService from "../services/brandService"
import categoryService from "../services/categoryService"
import productService from "../services/productService"
import collectionService from "../services/collectionService"
import newsletterService from "../services/newsletterService"
import editorial1 from "../assets/images/editorial1.jpg"
import editorial2 from "../assets/images/editorial2.jpg"

// Core brands to display on homepage
const CORE_BRANDS = ['Nike', 'Zara', 'H&M', 'Gap', 'Lululemon', 'J.Crew']

const HomePage = () => {
  const { user, loading } = useAuthContext()
  const [brands, setBrands] = useState([])
  const [categories, setCategories] = useState([])
  const [featuredProduct, setFeaturedProduct] = useState(null)
  const [featuredProductLoading, setFeaturedProductLoading] = useState(true)
  const [featuredProductError, setFeaturedProductError] = useState(null)
  const [collections, setCollections] = useState({})
  const [collectionsLoading, setCollectionsLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [brandsData, categoriesData] = await Promise.all([
          brandService.fetchAllBrands(),
          categoryService.fetchAllCategories()
        ])
        // Filter to only show core brands
        const coreBrands = brandsData.filter(brand => CORE_BRANDS.includes(brand.name))
        setBrands(coreBrands)
        setCategories(categoriesData)
      } catch (error) {
        console.error("Error fetching data:", error)
      }
    }
    
    fetchData()
  }, [])

  // Fetch featured product
  useEffect(() => {
    const fetchFeaturedProduct = async () => {
      try {
        setFeaturedProductLoading(true)
        setFeaturedProductError(null)
        const product = await productService.getFeaturedProduct()
        setFeaturedProduct(product)
      } catch (error) {
        console.error("Error fetching featured product:", error)
        setFeaturedProductError("Failed to load featured product")
      } finally {
        setFeaturedProductLoading(false)
      }
    }
    
    fetchFeaturedProduct()
  }, [])

  // Fetch smart collections
  useEffect(() => {
    const fetchCollections = async () => {
      try {
        setCollectionsLoading(true)
        const smartCollections = await collectionService.generateAlgorithmicCollections()
        setCollections(smartCollections)
      } catch (error) {
        console.error("Error fetching collections:", error)
      } finally {
        setCollectionsLoading(false)
      }
    }
    
    fetchCollections()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-6 text-lg font-light text-gray-700">Loading your marketplace...</p>
          <div className="mt-4 w-32 h-1 bg-gray-200 mx-auto rounded-full overflow-hidden">
            <div className="h-full bg-gray-900 rounded-full animate-pulse"></div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <motion.section 
        className="relative bg-white"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="container mx-auto px-4 xl:px-8 max-w-6xl">
          <div className="grid md:grid-cols-5 gap-12 xl:gap-16 items-center pt-8 md:pt-6 pb-12 md:pb-16">
            {/* Content Side */}
            <div className="md:col-span-2 space-y-8">
              <div className="space-y-6">
                <div className="space-y-2">
                  <span className="text-sm font-medium text-red-600 tracking-wide uppercase marketplace-label">SITEWIDE SALE HAPPENING NOW</span>
                  <h1 className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-tight text-gray-900 leading-[1.05]">
                    Buy & <span className="font-light">Sell.</span>
                  </h1>
                </div>
                <p className="text-xl xl:text-2xl text-gray-600 max-w-2xl leading-relaxed marketplace-body">
                  Modern Marketplace Application showcasing full-stack development
                </p>
              </div>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-3">
                <Link
                  to="/products"
                  className="inline-flex items-center px-6 py-3 text-sm bg-gradient-to-r from-gray-900 via-gray-800 to-black text-white hover:from-gray-800 hover:via-gray-700 hover:to-gray-900 transition-all duration-300 font-medium shadow-md rounded-lg hover:shadow-lg group"
                >
                  Shop
                  <ArrowRight size={16} className="ml-2 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
                <Link
                  to={user ? "/create-listing" : "/login"}
                  className="inline-flex items-center px-6 py-3 text-sm bg-white border-2 border-gray-900 text-gray-900 hover:bg-gradient-to-r hover:from-gray-900 hover:via-gray-800 hover:to-black hover:text-white transition-all duration-300 font-medium rounded-lg hover:shadow-md"
                >
                  Sell
                </Link>
              </div>
            </div>

            {/* Hero Image */}
            <div className="order-1 md:order-2 md:col-span-3 relative">
              <div className="h-full overflow-hidden">
                <img
                  src="https://www.fashiongonerogue.com/wp-content/uploads/2025/02/Bottega-Veneta-Summer-2025-Campaign01-768x960.jpg"
                  alt="Featured collection showcase"
                  className="object-cover rounded-sm w-full h-full"
                />
              </div>
            
              {/* Sale Badge */}
              <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-2 rounded-sm shadow-sm">
                <div className="text-xs font-medium marketplace-label">UP TO 70% OFF</div>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Shop by Category  */}
      <motion.section 
        className="pt-12 pb-16 bg-white"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="container mx-auto px-4 xl:px-8 max-w-6xl">
          <div className="text-center mb-12">
            <div className="space-y-4">
              <span className="text-xs font-medium text-gray-600 tracking-wide marketplace-label">SHOP BY CATEGORY</span>
              <h2 className="text-3xl font-light text-gray-900 tracking-tight">Explore collections</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto marketplace-body">Browse products filtered by category</p>
            </div>
          </div>
          <CategoryCarousel />
        </div>
      </motion.section>

      <motion.section 
        className="py-12 bg-white"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
      >
        <div className="container mx-auto px-4 xl:px-8 max-w-6xl">
          <div className="text-center mb-12">
            <div className="space-y-4">
              <span className="text-xs font-medium text-gray-600 tracking-wide marketplace-label">TOP BRANDS SPOTLIGHT</span>
              <h2 className="text-3xl font-light text-gray-900 tracking-tight">Shop from trusted brands</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto marketplace-body">Browse products filtered by brand</p>
            </div>
          </div>
          
          <div className="grid grid-cols-3 md:grid-cols-6 gap-12 items-center justify-center">
            {brands.slice(0, 6).map((brand) => (
              <Link
                key={brand.id}
                to={`/products?brand=${encodeURIComponent(brand.name)}`}
                className="flex items-center justify-center transition-all duration-300 hover:scale-105 group cursor-pointer p-4  rounded-lg"
              >
                <img
                  src={brand.image || "https://via.placeholder.com/150x100/f8fafc/64748b?text=" + encodeURIComponent(brand.name)}
                  alt={brand.name}
                  className="h-14 object-contain opacity-60 group-hover:opacity-100 transition-opacity duration-300"
                />
              </Link>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Trending Now */}
      <motion.section 
        className="py-12 bg-white"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
      >
        <div className="container mx-auto px-4 xl:px-8 max-w-6xl">
          <div className="flex justify-between items-center mb-8">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-xs font-medium text-gray-600 tracking-wide marketplace-label">TRENDING PRODUCTS</span>
              </div>
              <h2 className="text-xl xl:text-2xl font-semibold text-gray-900 marketplace-title">Most Popular This Week</h2>
              <p className="text-sm text-gray-600 marketplace-body">See products with highest like count</p>
            </div>
            <Link to="/products?sort=popular" className="text-gray-700 text-sm font-medium flex items-center group">
              View All
              <ArrowRight size={16} className="ml-2 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
          <ProductCarousel filterType="popular" />
        </div>
      </motion.section>

       {/* Affordable Find */}
       <motion.section 
         className="py-12"
         initial={{ opacity: 0, y: 30 }}
         whileInView={{ opacity: 1, y: 0 }}
         viewport={{ once: true, margin: "-100px" }}
         transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
       >
        <div className="container mx-auto px-4 xl:px-8 max-w-6xl">
          <div className="flex justify-between items-center mb-8">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-xs font-medium text-gray-600 tracking-wide marketplace-label">AFFORDABLE FINDS</span>
              </div>
              <h2 className="text-xl xl:text-2xl font-semibold text-gray-900 marketplace-title">Lowest Prices</h2>
              <p className="text-sm text-gray-600 marketplace-body">See products with lowest price</p>
            </div>
            <Link to="/products?sort=price_low" className="text-gray-700 text-sm font-medium flex items-center group">
              View All
              <ArrowRight size={16} className="ml-2 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
          <ProductCarousel filterType="price_low" />
        </div>
      </motion.section>

      {/* Featured Product Section */}
      <motion.section 
        className="relative py-16 bg-gradient-to-br from-gray-50 to-white overflow-hidden"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        {/* Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-32 h-32 bg-blue-100 rounded-full opacity-20 blur-3xl"></div>
          <div className="absolute bottom-20 right-20 w-40 h-40 bg-purple-100 rounded-full opacity-20 blur-3xl"></div>
        </div>

        <div className="relative container mx-auto px-4 xl:px-8 max-w-6xl">
          {featuredProductLoading ? (
            <div className="animate-pulse space-y-8">
              <div className="text-center space-y-4">
                <div className="h-4 bg-gray-200 rounded w-32 mx-auto"></div>
                <div className="h-8 bg-gray-200 rounded w-64 mx-auto"></div>
              </div>
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div className="space-y-6">
                  <div className="h-6 bg-gray-200 rounded w-48"></div>
                  <div className="h-12 bg-gray-200 rounded w-3/4"></div>
                  <div className="space-y-3">
                    <div className="h-4 bg-gray-200 rounded"></div>
                    <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                  </div>
                  <div className="h-12 bg-gray-200 rounded w-32"></div>
                </div>
                <div className="h-96 bg-gray-200 rounded-2xl"></div>
              </div>
            </div>
          ) : featuredProduct ? (
            <>
              {/* Section Header */}
              <div className="text-center mb-12 space-y-4">
                <span className="text-xs font-medium text-gray-500 tracking-wide uppercase marketplace-label">SPOTLIGHT</span>
                <h2 className="text-3xl font-light text-gray-900 tracking-tight">Product of the Day</h2>
                <p className="text-gray-600 max-w-2xl mx-auto marketplace-body">
                                      Intelligent product recommendation based on custom algorithm
                </p>
              </div>

              {/* Featured Product Card */}
              <div className="bg-white border border-gray-200/50 overflow-hidden">
                <div className="grid md:grid-cols-2 gap-0">
                  {/* Product Info */}
                  <div className="p-8 md:p-12 flex flex-col justify-center space-y-6">
                    {/* Brand Badge */}
                    <div className="inline-flex items-center w-fit">
                      <span className="bg-gray-900 text-white px-3 py-1 text-xs font-medium rounded-full marketplace-label">
                        FEATURED
                      </span>
                    </div>

                    {/* Product Details */}
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <h3 className="text-2xl md:text-3xl font-light text-gray-900 leading-tight tracking-tight">
                          {featuredProduct.title}
                        </h3>
                        <p className="text-lg font-medium text-gray-700 tracking-wide uppercase marketplace-body" style={{ letterSpacing: '0.1em' }}>
                          {featuredProduct.brand_name}
                        </p>
                      </div>
                      
                      <div className="flex items-center gap-4">
                        <div className="text-3xl font-bold text-gray-900 marketplace-title">
                          ${featuredProduct.price}
                        </div>
                        {featuredProduct.original_price && (
                          <div className="text-lg text-gray-500 line-through marketplace-body">
                            ${featuredProduct.original_price}
                          </div>
                        )}
                      </div>

                      {/* Product Features */}
                      <div className="grid grid-cols-2 gap-4 py-4">
                        <div className="space-y-1">
                          <div className="text-xs text-gray-500 marketplace-label">CONDITION</div>
                          <div className="text-sm font-medium text-gray-900 capitalize marketplace-body">
                            {featuredProduct.condition_name || "Excellent"}
                          </div>
                        </div>
                        {featuredProduct.seller_name && (
                          <div className="space-y-1">
                            <div className="text-xs text-gray-500 marketplace-label">SELLER</div>
                            <div className="flex items-center gap-2">
                              <img
                                src={featuredProduct.seller_photo || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face"}
                                alt={featuredProduct.seller_name}
                                className="w-5 h-5 rounded-full object-cover"
                              />
                              <div className="text-sm font-medium text-gray-900 marketplace-body">
                                {featuredProduct.seller_name}
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* CTA Button */}
                    <Link
                      to={`/products/${featuredProduct.id || featuredProduct.product_id}`}
                      className="bg-gradient-to-r from-gray-900 via-gray-800 to-black text-white hover:from-gray-800 hover:via-gray-700 hover:to-gray-900 transition-all duration-300 px-6 py-3 text-sm font-medium rounded-lg shadow-lg hover:shadow-xl w-fit"
                    >
                      View Product
                    </Link>
                  </div>

                  {/* Product Image */}
                  <div className="relative bg-gray-50">
                    <div className="aspect-square md:aspect-auto md:h-full relative overflow-hidden">
                      <img
                        src={featuredProduct.image || "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&h=600&fit=crop&crop=center"}
                        alt={featuredProduct.title}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                      />

                      <div className="absolute top-4 right-4">
                        <WishlistButton
                          productId={featuredProduct.id || featuredProduct.product_id}
                          className="bg-white/90 backdrop-blur-sm hover:bg-white transition-colors shadow-lg"
                          size={20}
                          likeCount={featuredProduct.num_likes}
                          showLikeCount={true}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom CTA */}
              <div className="text-center mt-12">
                <Link
                  to="/products"
                  className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors font-medium marketplace-body"
                >
                  Explore all products
                  <ArrowRight size={16} className="ml-2" />
                </Link>
              </div>
            </>
          ) : (
            <div className="text-center py-16">
              <div className="text-gray-500 marketplace-body">No featured product available</div>
            </div>
          )}
        </div>
      </motion.section>

      <motion.section 
        className="py-12"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
      >
        <div className="container mx-auto px-4 xl:px-8 max-w-6xl">
          <div className="flex justify-between items-center mb-8">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-xs font-medium text-gray-600 tracking-wide marketplace-label">JUST ARRIVED</span>
              </div>
              <h2 className="text-xl xl:text-2xl font-semibold text-gray-900 marketplace-title">New Arrivals</h2>
              <p className="text-sm text-gray-600 marketplace-body">See latest products</p>
            </div>
            <Link to="/products?sort=price_low" className="text-gray-700 text-sm font-medium flex items-center group">
              View All
              <ArrowRight size={16} className="ml-2 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
          <ProductCarousel filterType="new" />
        </div>
      </motion.section>

      {!user && (
        <motion.section 
          className="bg-white overflow-hidden"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <div className="grid md:grid-cols-2 items-center min-h-[500px]">
            {/* Content Column */}
            <div className="bg-white px-8 md:px-12 lg:px-16 py-16 md:py-20">
              <div className="max-w-lg">
                <div className="space-y-6">
                  <div className="space-y-4">
                    <span className="text-xs font-medium text-gray-600 tracking-wide marketplace-label">GET STARTED</span>
                    <h2 className="text-3xl md:text-4xl font-light text-gray-900 tracking-tight">Join Our Marketplace</h2>
                    <p className="text-lg text-gray-600 leading-relaxed marketplace-body">
                      Start buying and selling today. It's quick, easy, and free to get started.
                    </p>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Link
                      to="/login"
                      className="inline-flex items-center justify-center px-6 py-3 text-sm bg-gradient-to-r from-gray-900 via-gray-800 to-black text-white hover:from-gray-800 hover:via-gray-700 hover:to-gray-900 transition-all duration-300 font-medium shadow-md rounded-lg hover:shadow-lg"
                    >
                      Sign In
                    </Link>
                    <Link
                      to="/register"
                      className="inline-flex items-center justify-center px-6 py-3 text-sm bg-white border-2 border-gray-900 text-gray-900 hover:bg-gradient-to-r hover:from-gray-900 hover:via-gray-800 hover:to-black hover:text-white transition-all duration-300 font-medium rounded-lg hover:shadow-md"
                    >
                      Create Account
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Image Column */}
            <div className="relative h-[400px] md:h-[500px] bg-gray-50">
              <img
                src={editorial1}
                alt="Fashion marketplace editorial"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
            </div>
          </div>
        </motion.section>
      )}

      <motion.section 
        className="relative py-16 bg-white overflow-hidden"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            opacity: '0.1'
          }}
        />
        <div className="relative container mx-auto px-4 xl:px-8 text-center max-w-4xl">
          <div className="space-y-8">
            <div className="space-y-4">
              <span className="text-xs font-medium text-gray-600 tracking-wide marketplace-label">STAY UPDATED</span>
              <h2 className="text-2xl xl:text-3xl font-semibold text-gray-900 marketplace-title">Never Miss a Deal</h2>
              <p className="text-base text-gray-600 max-w-2xl mx-auto marketplace-body">
                Get updates on new arrivals and featured items delivered to your inbox.
              </p>
            </div>
            <NewsletterForm />
          </div>
        </div>
      </motion.section>
    </div>
  )
}

const TrustBadge = ({ icon, title, description }) => (
  <div className="flex items-center gap-6 group">
    <div className="p-4 bg-white group-hover:bg-gray-100 transition-all duration-300 text-gray-700 shadow-sm">
      {icon}
    </div>
    <div>
      <h3 className="font-medium xl:text-lg text-gray-900">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  </div>
)

const NewsletterForm = () => {
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [message, setMessage] = useState("")
  const [isSuccess, setIsSuccess] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setMessage("")
    
    try {
      await newsletterService.subscribe(email)
      setEmail("")
      setMessage("Successfully subscribed! Thank you for joining.")
      setIsSuccess(true)
      setTimeout(() => {
        setMessage("")
        setIsSuccess(false)
      }, 5000)
    } catch (error) {
      setMessage(error.message || "Failed to subscribe. Please try again.")
      setIsSuccess(false)
      setTimeout(() => setMessage(""), 5000)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="max-w-md mx-auto">
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
        <input
          type="email"
          placeholder="Enter your email address"
          className="flex-grow bg-white border border-gray-200 text-gray-900 placeholder-gray-500 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-gray-900 rounded-lg shadow-sm marketplace-body"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={isSubmitting}
          aria-label="Email address"
        />
        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-gradient-to-r from-gray-900 via-gray-800 to-black text-white hover:from-gray-800 hover:via-gray-700 hover:to-gray-900 transition-all duration-300 px-5 py-2.5 text-sm font-medium whitespace-nowrap shadow-lg rounded-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label="Subscribe"
        >
          {isSubmitting ? "Subscribing..." : "Subscribe"}
        </button>
      </form>
      {message && (
        <div className={`mt-3 text-sm text-center ${isSuccess ? 'text-green-600' : 'text-red-600'}`}>
          {message}
        </div>
      )}
    </div>
  )
}

export default HomePage