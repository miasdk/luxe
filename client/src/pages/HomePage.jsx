import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { useAuthContext } from "../context/AuthContext"
import ProductCarousel from "../components/ProductCarousel"
import CategoryCarousel from "../components/CategoryCarousel"
import { Truck, RotateCcw, ArrowRight, Heart, Shield } from "lucide-react"
import brandService from "../services/brandService"
import categoryService from "../services/categoryService"

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
      <section className="relative bg-gradient-to-br from-gray-50 to-white overflow-hidden">
        <div className="container mx-auto px-4 xl:px-8 py-20 md:py-28 xl:py-36 max-w-7xl">
          <div className="grid md:grid-cols-2 xl:grid-cols-5 gap-16 xl:gap-20 items-center">
            <div className="xl:col-span-3 space-y-10">
              <div>
                <h1 className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-light tracking-tight text-gray-900 leading-tight">
                  Discover <span className="font-normal">Exceptional</span> Pieces
                </h1>
                <p className="mt-8 text-xl xl:text-2xl text-gray-600 max-w-2xl leading-relaxed">
                  A curated marketplace for those who appreciate quality, craftsmanship, and timeless design.
                </p>
              </div>

              <div className="flex flex-wrap gap-6">
                <Link
                  to="/products"
                  className="inline-flex items-center px-8 py-4 text-lg bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-all duration-300 font-medium shadow-sm"
                >
                  Explore Collection
                </Link>
                <Link
                  to="/create-listing"
                  className="inline-flex items-center px-8 py-4 text-lg bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-all duration-300 font-medium"
                >
                  Start Selling
                </Link>
              </div>
            </div>

            <div className="xl:col-span-2 relative">
              <div className="aspect-square xl:aspect-[4/5] max-w-lg mx-auto overflow-hidden rounded-3xl shadow-2xl">
                <img
                  src="https://www.fashiongonerogue.com/wp-content/uploads/2025/02/Bottega-Veneta-Summer-2025-Campaign01-768x960.jpg"
                  alt="Featured collection showcase"
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="absolute -bottom-8 -left-8 md:-left-16 bg-white p-8 rounded-2xl shadow-xl max-w-sm">
                <p className="text-sm text-gray-500 mb-2">Featured Collection</p>
                <p className="text-xl font-medium text-gray-900">Timeless Essentials</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="absolute top-1/4 right-0 w-96 h-96 bg-gray-100 rounded-full opacity-30 -mr-48" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-gray-100 rounded-full opacity-30 -ml-40 -mb-40" />
      </section>

      <section className="bg-gray-50 py-16 border-b border-gray-100">
        <div className="container mx-auto px-4 xl:px-8 max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <TrustBadge
              icon={<Truck size={24} />}
              title="Complimentary Shipping"
              description="On orders over $100"
            />
            <TrustBadge
              icon={<RotateCcw size={24} />}
              title="Hassle-Free Returns"
              description="30-day return policy"
            />
            <TrustBadge
              icon={<Shield size={24} />}
              title="Buyer Protection"
              description="Secure transactions guaranteed"
            />
          </div>
        </div>
      </section>

      <section className="py-10 bg-white">
        <div className="container mx-auto px-4 xl:px-8 max-w-7xl">
          <div className="flex justify-between items-center mb-16">
            <h2 className="text-4xl font-light text-gray-900">New Arrivals</h2>
            <Link to="/products" className="text-gray-700 xl:text-lg font-medium flex items-center group">
              View All
              <ArrowRight size={20} className="ml-2 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
          <ProductCarousel />
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 xl:px-8 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-5 gap-16 xl:gap-20 items-center">
            <div className="order-2 lg:order-1 xl:col-span-3">
              <div className="inline-block bg-white text-gray-700 text-sm font-medium px-4 py-2 rounded-full mb-6 shadow-sm">
                FEATURED PRODUCT
              </div>
              <h2 className="text-4xl xl:text-5xl font-light mb-6 leading-tight text-gray-900">The Essential Oversized Blazer</h2>
              <p className="text-gray-600 xl:text-xl mb-8 leading-relaxed max-w-2xl">
                Crafted from premium Italian wool, our signature blazer combines timeless design with modern
                proportions. A versatile staple that effortlessly elevates any outfit.
              </p>
              <div className="mb-8">
                <div className="flex items-center gap-3">
                  <span className="text-3xl xl:text-4xl font-light text-gray-900">$289.00</span>
                  <span className="text-sm bg-green-50 text-green-700 px-3 py-1 rounded-full">Free shipping</span>
                </div>
              </div>
              <div className="flex gap-6">
                <Link
                  to="/products"
                  className="bg-gray-900 text-white hover:bg-gray-800 transition-all duration-300 px-8 py-4 text-lg rounded-lg font-medium shadow-sm"
                >
                  Shop Now
                </Link>
                <button className="border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 transition-all duration-300 px-8 py-4 text-lg rounded-lg font-medium flex items-center shadow-sm">
                  <Heart size={20} className="mr-2" />
                  Add to Favorites
                </button>
              </div>
            </div>
            
            <div className="order-1 lg:order-2 xl:col-span-2 relative">
              <div className="grid grid-cols-2 gap-6 max-w-6xl xl:max-w-none mx-auto">
                <div className="aspect-[4/5] xl:aspect-[3/4] overflow-hidden rounded-lg shadow-xl">
                  <img
                    src="https://www.net-a-porter.com/variants/images/1647597326342291/in/w2000_q80.jpg"
                    alt="Essential Blazer - Front View"
                    className="object-cover h-full w-full hover:scale-105 transition-transform duration-700"
                  />
                </div>
                
                <div className="aspect-[4/5] xl:aspect-[3/4] overflow-hidden rounded-lg shadow-xl">
                  <img
                    src="https://www.net-a-porter.com/variants/images/1647597326342291/ou/w2000_q80.jpg"
                    alt="Essential Blazer - Detail View"
                    className="object-cover h-full w-full hover:scale-105 transition-transform duration-700"
                  />
                </div>
              </div>
              
              <div className="absolute top-6 right-6 bg-white/95 backdrop-blur-sm text-gray-900 px-6 py-3 text-sm font-medium rounded-xl shadow-lg">
                BESTSELLER
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 xl:px-8 max-w-7xl">
          <h2 className="text-4xl font-light text-gray-900 mb-16">Shop by Category</h2>
          <CategoryCarousel />
        </div>
      </section>

      {!user && (
        <section className="bg-gray-900 text-white py-24">
          <div className="container mx-auto px-4 xl:px-8 text-center max-w-4xl">
            <h2 className="text-4xl xl:text-5xl font-light mb-6">Join Our Marketplace</h2>
            <p className="text-gray-300 xl:text-xl mb-12 max-w-2xl mx-auto leading-relaxed">
              Sign up for exclusive access to special collections, personalized recommendations, and a seamless shopping
              experience.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link
                to="/login"
                className="bg-white text-gray-900 hover:bg-gray-100 transition-all duration-300 px-10 py-4 text-lg rounded-lg font-medium shadow-sm"
              >
                Sign In
              </Link>
              <Link
                to="/register"
                className="bg-gray-800 text-white hover:bg-gray-700 border border-gray-700 transition-all duration-300 px-10 py-4 text-lg rounded-lg font-medium"
              >
                Create Account
              </Link>
            </div>
          </div>
        </section>
      )}

      <section className="bg-gray-50 py-20 border-t border-gray-100">
        <div className="container mx-auto px-4 xl:px-8 max-w-7xl">
          <h2 className="text-4xl font-light text-gray-900 mb-16 text-center">Our Brands</h2>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-12 items-center justify-center">
            {brands.slice(0, 6).map((brand) => (
              <div
                key={brand.id}
                className="flex items-center justify-center transition-all duration-300 hover:scale-110"
              >
                <img
                  src={brand.image || "/placeholder.svg"}
                  alt={brand.name}
                  className="h-16 object-contain opacity-70 hover:opacity-100 transition-opacity duration-300"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gray-900 text-white py-24">
        <div className="container mx-auto px-4 xl:px-8 max-w-4xl text-center">
          <h2 className="text-4xl font-light mb-6">Subscribe to Our Newsletter</h2>
          <p className="text-gray-300 xl:text-xl mb-12 max-w-2xl mx-auto">
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
    <div className="p-4 rounded-2xl bg-white group-hover:bg-gray-100 transition-all duration-300 text-gray-700 shadow-sm">
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
    console.log("Newsletter subscription for:", email)
    setEmail("")
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
      <input
        type="email"
        placeholder="Your email address"
        className="flex-grow bg-white/10 border border-white/20 text-white placeholder-white/60 px-6 py-4 text-lg rounded-lg focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-white/40"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        aria-label="Email address"
      />
      <button
        type="submit"
        className="bg-white text-gray-900 hover:bg-gray-100 transition-colors duration-300 px-8 py-4 text-lg rounded-lg font-medium whitespace-nowrap shadow-sm"
        aria-label="Subscribe"
      >
        Subscribe
      </button>
    </form>
  )
}

export default HomePage