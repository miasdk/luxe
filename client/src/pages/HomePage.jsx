import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { useAuthContext } from "../context/AuthContext"
import ProductCarousel from "../components/ProductCarousel"
import CategoryCarousel from "../components/CategoryCarousel"
import { Truck, RotateCcw, ArrowRight, Heart, Shield, Star } from "lucide-react"
import brandService from "../services/brandService"
import categoryService from "../services/categoryService"

const HomePage = () => {
  const { user, loading } = useAuthContext()
  const [brands, setBrands] = useState([])
  const [categories, setCategories] = useState([])

  // Fetch data on mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [brandsData, categoriesData] = await Promise.all([
          brandService.fetchAllBrands(),
          categoryService.fetchAllCategories()
        ])
        setBrands(brandsData)
        setCategories(categoriesData)
      } catch (error) {
        console.error("Error fetching data:", error)
      }
    }
    
    fetchData()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-800 mx-auto"></div>
          <p className="mt-4 text-lg font-medium text-gray-700">Loading your marketplace...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-gray-50 to-gray-100 overflow-hidden">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-light tracking-tight text-gray-900 leading-tight">
                  Discover <span className="font-medium">Exceptional</span> Pieces
                </h1>
                <p className="mt-6 text-lg text-gray-600 max-w-md leading-relaxed">
                  A curated marketplace for those who appreciate quality, craftsmanship, and timeless design.
                </p>
              </div>

              <div className="flex flex-wrap gap-4">
                <Link
                  to="/products"
                  className="inline-flex items-center px-6 py-3 bg-gray-900 text-white rounded-md hover:bg-gray-800 transition-colors"
                >
                  Explore Collection
                </Link>
                <Link
                  to="/create-listing"
                  className="inline-flex items-center px-6 py-3 bg-white border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
                >
                  Start Selling
                </Link>
              </div>
            </div>

            <div className="relative">
              <div className="aspect-square max-w-md mx-auto overflow-hidden rounded-2xl shadow-xl">
                <img
                  src="https://www.fashiongonerogue.com/wp-content/uploads/2025/02/Bottega-Veneta-Summer-2025-Campaign01-768x960.jpg"
                  alt="Featured collection showcase"
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 md:-left-12 bg-white p-4 md:p-6 rounded-lg shadow-lg max-w-xs">
                <p className="text-sm text-gray-500 mb-1">Featured Collection</p>
                <p className="text-lg font-medium">Timeless Essentials</p>
              </div>
            </div>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-1/4 right-0 w-64 h-64 bg-gray-200 rounded-full opacity-20 -mr-32" />
        <div className="absolute bottom-0 left-0 w-40 h-40 bg-gray-200 rounded-full opacity-20 -ml-20 -mb-20" />
      </section>

      {/* Trust Badges */}
      <section className="bg-white py-8 border-b border-gray-100">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <TrustBadge
              icon={<Truck size={20} />}
              title="Complimentary Shipping"
              description="On orders over $100"
            />
            <TrustBadge
              icon={<RotateCcw size={20} />}
              title="Hassle-Free Returns"
              description="30-day return policy"
            />
            <TrustBadge
              icon={<Shield size={20} />}
              title="Buyer Protection"
              description="Secure transactions guaranteed"
            />
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-light text-gray-900 mb-10 text-center">Shop by Category</h2>
          <CategoryCarousel />
        </div>
      </section>

      {/* Featured Product */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div className="order-2 md:order-1">
              <div className="inline-block bg-gray-100 text-gray-700 text-xs font-medium px-3 py-1 rounded-full mb-4">
                FEATURED PRODUCT
              </div>
              <h2 className="text-3xl font-light mb-4 leading-tight">The Essential Oversized Blazer</h2>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Crafted from premium Italian wool, our signature blazer combines timeless design with modern
                proportions. A versatile staple that effortlessly elevates any outfit.
              </p>
              <div className="mb-6">
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-light text-gray-900">$289.00</span>
                  <span className="text-sm bg-gray-100 text-gray-700 px-2 py-0.5 rounded-full">Free shipping</span>
                </div>
                <div className="flex items-center mt-2">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={16} className="text-yellow-400 fill-yellow-400" />
                    ))}
                  </div>
                  <span className="ml-2 text-sm text-gray-600">128 reviews</span>
                </div>
              </div>
              <div className="flex gap-4">
                <Link
                  to="/products"
                  className="bg-gray-900 text-white hover:bg-gray-800 transition-all duration-300 px-6 py-3 rounded-md font-medium"
                >
                  Shop Now
                </Link>
                <button className="border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 transition-all duration-300 px-6 py-3 rounded-md font-medium flex items-center">
                  <Heart size={16} className="mr-2" />
                  Add to Favorites
                </button>
              </div>
            </div>
            <div className="order-1 md:order-2 relative">
              <div className="aspect-[4/5] overflow-hidden rounded-xl">
                <img
                  src="https://product-images.therealreal.com/WCINQ86972_1_enlarged.jpg?width=1500"
                  alt="Essential Blazer"
                  className="object-cover h-full w-full"
                />
              </div>
              <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm text-gray-900 px-4 py-2 text-xs font-medium rounded-md shadow-sm">
                BESTSELLER
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* New Arrivals */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-10">
            <h2 className="text-2xl font-light text-gray-900">New Arrivals</h2>
            <Link to="/products" className="text-gray-700 font-medium flex items-center group">
              View All
              <ArrowRight size={16} className="ml-2 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
          <ProductCarousel />
        </div>
      </section>

      {/* Sign Up CTA - Only show for non-authenticated users */}
      {!user && (
        <section className="bg-gray-900 text-white py-16">
          <div className="container mx-auto px-4 text-center max-w-3xl">
            <h2 className="text-2xl md:text-3xl font-light mb-4">Join Our Marketplace</h2>
            <p className="text-gray-300 mb-8 max-w-xl mx-auto leading-relaxed">
              Sign up for exclusive access to special collections, personalized recommendations, and a seamless shopping
              experience.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/login"
                className="bg-white text-gray-900 hover:bg-gray-100 transition-all duration-300 px-8 py-3 rounded-md font-medium"
              >
                Sign In
              </Link>
              <Link
                to="/register"
                className="bg-gray-800 text-white hover:bg-gray-700 border border-gray-700 transition-all duration-300 px-8 py-3 rounded-md font-medium"
              >
                Create Account
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Brands */}
      <section className="bg-gray-50 py-16 border-t border-gray-100">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-light text-gray-900 mb-10 text-center">Our Brands</h2>
          <div className="grid grid-cols-2 md:grid-cols-6 gap-8 items-center">
            {brands.slice(0, 6).map((brand) => (
              <div
                key={brand.id}
                className="flex items-center justify-center transition-all duration-300"
              >
                <img
                  src={brand.image || "/placeholder.svg"}
                  alt={brand.name}
                  className="h-12 object-contain opacity-80 hover:opacity-100 transition-opacity"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="bg-black text-white py-20">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h2 className="text-2xl font-light mb-4">Subscribe to Our Newsletter</h2>
          <p className="text-gray-300 mb-8 max-w-xl mx-auto">
            Be the first to know about new collections, exclusive offers, and curated selections.
          </p>
          <NewsletterForm />
        </div>
      </section>
    </div>
  )
}

// Extracted Components
const TrustBadge = ({ icon, title, description }) => (
  <div className="flex items-center gap-4 group">
    <div className="p-3 rounded-full bg-gray-100 group-hover:bg-gray-200 transition-all duration-300 text-gray-700">
      {icon}
    </div>
    <div>
      <h3 className="font-medium text-gray-900">{title}</h3>
      <p className="text-sm text-gray-500">{description}</p>
    </div>
  </div>
)

const NewsletterForm = () => {
  const [email, setEmail] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()
    // TODO: Implement newsletter subscription
    console.log("Newsletter subscription for:", email)
    setEmail("")
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
      <input
        type="email"
        placeholder="Your email address"
        className="flex-grow bg-white/10 border border-white/20 text-white placeholder-white/50 px-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-white/30"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        aria-label="Email address"
      />
      <button
        type="submit"
        className="bg-white text-gray-900 hover:bg-gray-100 transition-colors duration-300 px-6 py-3 rounded-md font-medium"
        aria-label="Subscribe"
      >
        Subscribe
      </button>
    </form>
  )
}

export default HomePage