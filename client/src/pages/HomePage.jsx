import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { useAuthContext } from "../context/AuthContext"
import ProductCarousel from "../components/ProductCarousel"
import CategoryCarousel from "../components/CategoryCarousel"
import { Truck, RotateCcw, ArrowRight, Heart, Shield, Star, Zap, TrendingUp } from "lucide-react"
import brandService from "../services/brandService"
import categoryService from "../services/categoryService"
import productService from "../services/productService"

// Core brands to display on homepage
const CORE_BRANDS = ['Nike', 'Zara', 'H&M', 'Gap', 'Lululemon', 'J.Crew']

const HomePage = () => {
  const { user, loading } = useAuthContext()
  const [brands, setBrands] = useState([])
  const [categories, setCategories] = useState([])
  const [featuredProduct, setFeaturedProduct] = useState(null)
  const [featuredProductLoading, setFeaturedProductLoading] = useState(true)
  const [featuredProductError, setFeaturedProductError] = useState(null)

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
      {/* Hero Section - Enhanced with better visual hierarchy */}
      <section className="relative bg-gradient-to-br from-gray-50 to-white overflow-hidden">
        <div className="container mx-auto px-4 xl:px-8 py-20 md:py-24 xl:py-32 max-w-6xl">
          <div className="grid md:grid-cols-2 xl:grid-cols-5 gap-16 xl:gap-20 items-center">
            <div className="xl:col-span-3 space-y-10">
              <div className="space-y-8">
                <div className="inline-block bg-gray-900 text-white text-sm font-medium px-4 py-2 tracking-wide">
                  CURATED PREMIUM MARKETPLACE
                </div>
                <h1 className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-light tracking-tight text-gray-900 leading-[1.05]">
                  Discover <span className="font-normal">Exceptional</span> Pieces
                </h1>
                <p className="text-xl xl:text-2xl text-gray-600 max-w-2xl leading-relaxed">
                  A curated marketplace for those who appreciate quality, craftsmanship, and timeless design.
                </p>
              </div>

              <div className="flex flex-wrap gap-6">
                <Link
                  to="/products"
                  className="inline-flex items-center px-10 py-5 text-lg bg-gray-900 text-white hover:bg-gray-800 transition-all duration-300 font-medium shadow-sm rounded-lg hover:shadow-md group"
                >
                  Explore Collection
                  <ArrowRight size={18} className="ml-2 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
                <Link
                  to={user ? "/create-listing" : "/login"}
                  className="inline-flex items-center px-10 py-5 text-lg bg-white border-2 border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white transition-all duration-300 font-medium rounded-lg"
                >
                  Start Selling
                </Link>
              </div>
            </div>
            
            <div className="order-1 lg:order-2 xl:col-span-2 relative">
              <div className="aspect-square xl:aspect-[4/5] max-w-lg mx-auto overflow-hidden shadow-2xl">
                <img
                  src="https://www.fashiongonerogue.com/wp-content/uploads/2025/02/Bottega-Veneta-Summer-2025-Campaign01-768x960.jpg"
                  alt="Featured collection showcase"
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="absolute -bottom-8 -left-8 md:-left-12 bg-white p-8 shadow-xl border border-gray-100 max-w-sm rounded-lg">
                <p className="text-sm text-gray-500 mb-2 tracking-wide">FEATURED COLLECTION</p>
                <p className="text-xl font-medium text-gray-900">Timeless Essentials</p>
                <div className="mt-4 w-16 h-1 bg-gray-900 rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gray-50 py-24 border-t border-gray-200">
        <div className="container mx-auto px-4 xl:px-8 max-w-6xl">
          <div className="text-center mb-16">
            <span className="text-sm font-medium text-gray-600 tracking-wide">SHOP BRANDS</span>
          </div>
          
          <div className="grid grid-cols-3 md:grid-cols-6 gap-12 items-center justify-center">
            {brands.slice(0, 6).map((brand) => (
              <Link
                key={brand.id}
                to={`/products?brand=${encodeURIComponent(brand.name)}`}
                className="flex items-center justify-center transition-all duration-300 hover:scale-105 group cursor-pointer p-4 hover:bg-gray-50 rounded-lg"
              >
                <img
                  src={brand.image || "/placeholder.svg"}
                  alt={brand.name}
                  className="h-14 object-contain opacity-60 group-hover:opacity-100 transition-opacity duration-300"
                />
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-white border-t border-gray-100">
        <div className="container mx-auto px-4 xl:px-8 max-w-6xl">
          <div className="flex justify-between items-center mb-12">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-sm font-medium text-gray-600 tracking-wide">TRENDING NOW</span>
              </div>
              <h2 className="text-3xl xl:text-4xl font-light text-gray-900">Most Popular This Week</h2>
            </div>
            <Link to="/products?sort=popular" className="text-gray-700 text-base font-medium flex items-center group">
              View All
              <ArrowRight size={18} className="ml-2 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
          <ProductCarousel filterType="popular" />
        </div>
      </section>

      <section className="py-28 bg-gray-50 border-t border-gray-200">
        <div className="container mx-auto px-4 xl:px-8 max-w-6xl">
          {featuredProductLoading ? (
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <div className="space-y-6 animate-pulse">
                <div className="h-8 bg-gray-200 rounded w-48"></div>
                <div className="h-12 bg-gray-200 rounded w-3/4"></div>
                <div className="space-y-2">
                  <div className="h-4 bg-gray-200 rounded"></div>
                  <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                  <div className="h-4 bg-gray-200 rounded w-4/6"></div>
                </div>
                <div className="h-16 bg-gray-200 rounded w-1/2"></div>
                <div className="h-12 bg-gray-200 rounded w-32"></div>
              </div>
              <div className="aspect-square bg-gray-200 animate-pulse rounded-lg"></div>
            </div>
          ) : featuredProductError || !featuredProduct ? (
            <div className="text-center py-16">
              <p className="text-gray-500 text-lg">Featured product unavailable</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <div>
                <div className="inline-block bg-gray-900 text-white text-sm font-medium px-4 py-2 mb-8 tracking-wide">
                  FEATURED PRODUCT
                </div>
                <h2 className="text-4xl xl:text-5xl font-light mb-8 leading-tight text-gray-900">{featuredProduct.title}</h2>
                <p className="text-lg text-gray-600 mb-10 leading-relaxed max-w-xl">
                  {featuredProduct.description}
                </p>
                <div className="mb-10">
                  <div className="flex items-center gap-4">
                    <span className="text-4xl xl:text-5xl font-light text-gray-900">${featuredProduct.price}</span>
                  </div>
                  {featuredProduct.brand_name && (
                    <p className="text-sm text-gray-500 mt-2">by {featuredProduct.brand_name}</p>
                  )}
                </div>
                <div className="flex gap-6">
                  <Link
                    to={`/products/${featuredProduct.product_id}`}
                    className="bg-gray-900 text-white hover:bg-gray-800 transition-all duration-300 px-10 py-5 text-lg font-medium shadow-sm rounded-lg hover:shadow-md inline-flex items-center group"
                  >
                    Shop Now
                    <ArrowRight size={18} className="ml-2 transition-transform duration-300 group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>
              
              <div className="relative">
                <div className="aspect-square bg-white rounded-lg border border-gray-100 overflow-hidden shadow-sm">
                  <img
                    src={featuredProduct.image || "/placeholder.svg"}
                    alt={featuredProduct.title}
                    className="w-full h-full object-contain p-12"
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      <section className="py-24 bg-white border-t border-gray-100">
        <div className="container mx-auto px-4 xl:px-8 max-w-6xl">
          <div className="flex justify-between items-center mb-12">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-sm font-medium text-gray-600 tracking-wide">BEST DEALS</span>
              </div>
              <h2 className="text-3xl xl:text-4xl font-light text-gray-900">Lowest Prices</h2>
            </div>
            <Link to="/products?sort=price_low" className="text-gray-700 text-base font-medium flex items-center group">
              View All
              <ArrowRight size={18} className="ml-2 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
          <ProductCarousel filterType="price_low" />
        </div>
      </section>

      <section className="py-24 bg-gray-50 border-t border-gray-200">
        <div className="container mx-auto px-4 xl:px-8 max-w-6xl">
          <div className="mb-16">
            <div className="flex gap-2 mb-4">
              <span className="text-sm font-medium text-gray-600 tracking-wide">SHOP BY CATEGORY</span>
            </div>
            <h2 className="text-3xl xl:text-4xl font-light text-gray-900">Explore Collections</h2>
          </div>
          <CategoryCarousel />
        </div>
      </section>

      {!user && (
        <section className="bg-gray-800 text-white py-24 border-t border-gray-700">
          <div className="container mx-auto px-4 xl:px-8 text-center max-w-4xl">
            <h2 className="text-4xl xl:text-5xl font-light mb-6">Join Our Marketplace</h2>
            <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto leading-relaxed">
              Sign up for exclusive access to special collections, personalized recommendations, and a seamless shopping
              experience.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link
                to="/login"
                className="bg-white text-gray-900 hover:bg-gray-100 transition-all duration-300 px-10 py-5 text-lg font-medium shadow-sm rounded-lg hover:shadow-md"
              >
                Sign In
              </Link>
              <Link
                to="/register"
                className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-gray-900 transition-all duration-300 px-10 py-5 text-lg font-medium rounded-lg"
              >
                Create Account
              </Link>
            </div>
          </div>
        </section>
      )}

      <section className="bg-gray-900 text-white py-32 border-t border-gray-800">
        <div className="container mx-auto px-4 xl:px-8 max-w-4xl text-center">
          <h2 className="text-4xl xl:text-5xl font-light mb-8">Subscribe to Our Newsletter</h2>
          <p className="text-xl text-gray-300 mb-16 max-w-2xl mx-auto leading-relaxed">
            Be the first to know about new collections, exclusive offers, and curated selections.
          </p>
          <NewsletterForm />
        </div>
      </section>
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

  const handleSubmit = (e) => {
    e.preventDefault()
    setEmail("")
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
      <input
        type="email"
        placeholder="Enter your email address"
        className="flex-grow bg-white/10 border border-white/20 text-white placeholder-white/60 px-6 py-4 text-lg focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-white/40 rounded-lg backdrop-blur-sm"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        aria-label="Email address"
      />
      <button
        type="submit"
        className="bg-white text-gray-900 hover:bg-gray-100 transition-all duration-300 px-8 py-4 text-lg font-medium whitespace-nowrap shadow-sm rounded-lg hover:shadow-md"
        aria-label="Subscribe"
      >
        Subscribe
      </button>
    </form>
  )
}

export default HomePage