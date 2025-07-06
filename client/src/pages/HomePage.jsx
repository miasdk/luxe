import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { useAuthContext } from "../context/AuthContext"
import ProductCarousel from "../components/ProductCarousel"
import CategoryCarousel from "../components/CategoryCarousel"
import { Truck, RotateCcw, ArrowRight, Heart, Shield, Star, Zap, TrendingUp } from "lucide-react"
import brandService from "../services/brandService"
import categoryService from "../services/categoryService"

// Core brands to display on homepage
const CORE_BRANDS = ['Nike', 'Zara', 'H&M', 'Gap', 'Lululemon', 'J.Crew']

const HomePage = () => {
  const { user, loading } = useAuthContext()
  const [brands, setBrands] = useState([])
  const [categories, setCategories] = useState([])

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

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-4 text-lg font-light text-gray-700">Loading your marketplace...</p>
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
                  CURATED LUXURY MARKETPLACE
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
                  className="inline-flex items-center px-10 py-5 text-lg bg-gray-900 text-white hover:bg-gray-800 transition-all duration-300 font-medium shadow-sm"
                >
                  Explore Collection
                </Link>
                <Link
                  to={user ? "/create-listing" : "/login"}
                  className="inline-flex items-center px-10 py-5 text-lg bg-white border-2 border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white transition-all duration-300 font-medium"
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
              <div className="absolute -bottom-8 -left-8 md:-left-12 bg-white p-8 shadow-xl border border-gray-100 max-w-sm">
                <p className="text-sm text-gray-500 mb-2 tracking-wide">FEATURED COLLECTION</p>
                <p className="text-xl font-medium text-gray-900">Timeless Essentials</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section - New addition for credibility
      <section className="py-16 bg-white border-b border-gray-100">
        <div className="container mx-auto px-4 xl:px-8 max-w-6xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="space-y-2">
              <div className="text-3xl xl:text-4xl font-light text-gray-900">10K+</div>
              <div className="text-sm text-gray-600 tracking-wide">CURATED PIECES</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl xl:text-4xl font-light text-gray-900">500+</div>
              <div className="text-sm text-gray-600 tracking-wide">VERIFIED SELLERS</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl xl:text-4xl font-light text-gray-900">98%</div>
              <div className="text-sm text-gray-600 tracking-wide">SATISFACTION</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl xl:text-4xl font-light text-gray-900">24/7</div>
              <div className="text-sm text-gray-600 tracking-wide">SUPPORT</div>
            </div>
          </div>
        </div>
      </section> */}

        {/* Brands Section - Enhanced */}
        <section className="bg-white py-20 border-t border-gray-100">
        <div className="container mx-auto px-4 xl:px-8 max-w-6xl">
          
          <div className="grid grid-cols-3 md:grid-cols-6 gap-12 items-center justify-center">
            {brands.slice(0, 6).map((brand) => (
              <Link
                key={brand.id}
                to={`/products?brand=${encodeURIComponent(brand.name)}`}
                className="flex items-center justify-center transition-all duration-300 hover:scale-110 group cursor-pointer"
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

      {/* Popular Products - Enhanced spacing */}
      <section className="py-20 bg-white">
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

      {/* Value Products - Enhanced */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 xl:px-8 max-w-6xl">
          <div className="flex justify-between items-center mb-12">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-sm font-medium text-gray-600 tracking-wide">EXCEPTIONAL VALUE</span>
              </div>
              <h2 className="text-3xl xl:text-4xl font-light text-gray-900">Luxury for Less</h2>
            </div>
            <Link to="/products?sort=price_low" className="text-gray-700 text-base font-medium flex items-center group">
              View All
              <ArrowRight size={18} className="ml-2 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
          <ProductCarousel filterType="price_low" />
        </div>
      </section>

      {/* Featured Product - Enhanced with better layout */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 xl:px-8 max-w-6xl">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-block bg-gray-900 text-white text-sm font-medium px-4 py-2 mb-8 tracking-wide">
                FEATURED PRODUCT
              </div>
              <h2 className="text-4xl xl:text-5xl font-light mb-8 leading-tight text-gray-900">The Essential Oversized Blazer</h2>
              <p className="text-xl text-gray-600 mb-10 leading-relaxed max-w-xl">
                Crafted from premium materials, our signature blazer combines timeless design with modern
                proportions. A versatile staple that effortlessly elevates any outfit.
              </p>
              <div className="mb-10">
                <div className="flex items-center gap-4">
                  <span className="text-4xl xl:text-5xl font-light text-gray-900">$289.00</span>
                  <span className="text-sm bg-green-50 text-green-700 px-4 py-2 font-medium tracking-wide">FREE SHIPPING</span>
                </div>
              </div>
              <div className="flex gap-6">
                <Link
                  to="/products"
                  className="bg-gray-900 text-white hover:bg-gray-800 transition-all duration-300 px-10 py-5 text-lg font-medium shadow-sm"
                >
                  Shop Now
                </Link>
              </div>
            </div>
            
            <div className="relative">
              <div className="grid grid-cols-2 gap-8">
                <div className="aspect-[4/5] overflow-hidden shadow-xl">
                  <img
                    src="https://www.net-a-porter.com/variants/images/1647597326342291/in/w2000_q80.jpg"
                    alt="Featured product"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="aspect-[4/5] overflow-hidden shadow-xl">
                  <img
                    src="https://www.net-a-porter.com/variants/images/1647597326342291/ou/w2000_q80.jpg"
                    alt="Featured product detail"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories - Enhanced */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 xl:px-8 max-w-6xl">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-2 mb-4">
              <span className="text-sm font-medium text-gray-600 tracking-wide">SHOP BY CATEGORY</span>
            </div>
            <h2 className="text-3xl xl:text-4xl font-light text-gray-900">Explore Collections</h2>
          </div>
          <CategoryCarousel />
        </div>
      </section>

      {/* CTA Section - Enhanced */}
      {!user && (
        <section className="bg-gray-900 text-white py-24">
          <div className="container mx-auto px-4 xl:px-8 text-center max-w-4xl">
            <h2 className="text-4xl xl:text-5xl font-light mb-6">Join Our Marketplace</h2>
            <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto leading-relaxed">
              Sign up for exclusive access to special collections, personalized recommendations, and a seamless shopping
              experience.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link
                to="/login"
                className="bg-white text-gray-900 hover:bg-gray-100 transition-all duration-300 px-10 py-5 text-lg font-medium shadow-sm"
              >
                Sign In
              </Link>
              <Link
                to="/register"
                className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-gray-900 transition-all duration-300 px-10 py-5 text-lg font-medium"
              >
                Create Account
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Brands Section - Enhanced */}
      <section className="bg-white py-20 border-t border-gray-100">
        <div className="container mx-auto px-4 xl:px-8 max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl xl:text-4xl font-light text-gray-900 mb-4">Our Brands</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Discover exceptional pieces from the world's most coveted brands
            </p>
          </div>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-12 items-center justify-center">
            {brands.slice(0, 6).map((brand) => (
              <Link
                key={brand.id}
                to={`/products?brand=${encodeURIComponent(brand.name)}`}
                className="flex items-center justify-center transition-all duration-300 hover:scale-110 group cursor-pointer"
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

      {/* Newsletter - Enhanced */}
      <section className="bg-gray-900 text-white py-28">
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
        placeholder="Your email address"
        className="flex-grow bg-white/10 border border-white/20 text-white placeholder-white/60 px-6 py-4 text-lg focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-white/40"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        aria-label="Email address"
      />
      <button
        type="submit"
        className="bg-white text-gray-900 hover:bg-gray-100 transition-colors duration-300 px-8 py-4 text-lg font-medium whitespace-nowrap shadow-sm"
        aria-label="Subscribe"
      >
        Subscribe
      </button>
    </form>
  )
}

export default HomePage