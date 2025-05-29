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
      <section className="relative bg-gradient-to-r from-gray-50 to-gray-100 overflow-hidden">
        <div className="container mx-auto px-4 xl:px-8 2xl:px-12 py-16 md:py-24 xl:py-32 max-w-7xl 2xl:max-w-8xl">
          <div className="grid md:grid-cols-2 xl:grid-cols-5 gap-12 xl:gap-16 items-center">
            <div className="xl:col-span-3 space-y-8 xl:space-y-12">
              <div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl font-light tracking-tight text-gray-900 leading-tight">
                  Discover <span className="font-medium">Exceptional</span> Pieces
                </h1>
                <p className="mt-6 xl:mt-8 text-lg xl:text-xl 2xl:text-2xl text-gray-600 max-w-md xl:max-w-2xl leading-relaxed">
                  A curated marketplace for those who appreciate quality, craftsmanship, and timeless design.
                </p>
              </div>

              <div className="flex flex-wrap gap-4 xl:gap-6">
                <Link
                  to="/products"
                  className="inline-flex items-center px-6 xl:px-8 py-3 xl:py-4 text-base xl:text-lg bg-gray-900 text-white rounded-md hover:bg-gray-800 transition-colors font-medium"
                >
                  Explore Collection
                </Link>
                <Link
                  to="/create-listing"
                  className="inline-flex items-center px-6 xl:px-8 py-3 xl:py-4 text-base xl:text-lg bg-white border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors font-medium"
                >
                  Start Selling
                </Link>
              </div>
            </div>

            <div className="xl:col-span-2 relative">
              <div className="aspect-square xl:aspect-[4/5] max-w-md xl:max-w-lg 2xl:max-w-xl mx-auto overflow-hidden rounded-2xl xl:rounded-3xl shadow-xl">
                <img
                  src="https://www.fashiongonerogue.com/wp-content/uploads/2025/02/Bottega-Veneta-Summer-2025-Campaign01-768x960.jpg"
                  alt="Featured collection showcase"
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="absolute -bottom-6 xl:-bottom-8 -left-6 md:-left-12 xl:-left-16 bg-white p-4 md:p-6 xl:p-8 rounded-lg xl:rounded-xl shadow-lg max-w-xs xl:max-w-sm">
                <p className="text-sm xl:text-base text-gray-500 mb-1">Featured Collection</p>
                <p className="text-lg xl:text-xl font-medium">Timeless Essentials</p>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute top-1/4 right-0 w-64 xl:w-96 2xl:w-[32rem] h-64 xl:h-96 2xl:h-[32rem] bg-gray-200 rounded-full opacity-20 -mr-32 xl:-mr-48 2xl:-mr-64" />
        <div className="absolute bottom-0 left-0 w-40 xl:w-60 2xl:w-80 h-40 xl:h-60 2xl:h-80 bg-gray-200 rounded-full opacity-20 -ml-20 xl:-ml-30 2xl:-ml-40 -mb-20 xl:-mb-30 2xl:-mb-40" />
      </section>

      <section className="bg-white py-8 xl:py-12 border-b border-gray-100">
        <div className="container mx-auto px-4 xl:px-8 2xl:px-12 max-w-7xl 2xl:max-w-8xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 xl:gap-16">
            <TrustBadge
              icon={<Truck size={20} className="xl:w-6 xl:h-6" />}
              title="Complimentary Shipping"
              description="On orders over $100"
            />
            <TrustBadge
              icon={<RotateCcw size={20} className="xl:w-6 xl:h-6" />}
              title="Hassle-Free Returns"
              description="30-day return policy"
            />
            <TrustBadge
              icon={<Shield size={20} className="xl:w-6 xl:h-6" />}
              title="Buyer Protection"
              description="Secure transactions guaranteed"
            />
          </div>
        </div>
      </section>

      <section className="py-16 xl:py-24 bg-gray-50">
        <div className="container mx-auto px-4 xl:px-8 2xl:px-12 max-w-7xl 2xl:max-w-8xl">
          <h2 className="text-2xl xl:text-3xl 2xl:text-4xl font-light text-gray-900 mb-10 xl:mb-16 text-center">Shop by Category</h2>
          <CategoryCarousel />
        </div>
      </section>

      <section className="py-16 xl:py-24 bg-white">
        <div className="container mx-auto px-4 xl:px-8 2xl:px-12 max-w-7xl 2xl:max-w-8xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-5 gap-16 xl:gap-20 items-center">
            <div className="order-2 lg:order-1 xl:col-span-3">
              <div className="inline-block bg-gray-100 text-gray-700 text-xs xl:text-sm font-medium px-3 xl:px-4 py-1 xl:py-2 rounded-full mb-4 xl:mb-6">
                FEATURED PRODUCT
              </div>
              <h2 className="text-3xl xl:text-4xl 2xl:text-5xl font-light mb-4 xl:mb-6 leading-tight">The Essential Oversized Blazer</h2>
              <p className="text-gray-600 xl:text-lg 2xl:text-xl mb-6 xl:mb-8 leading-relaxed max-w-2xl">
                Crafted from premium Italian wool, our signature blazer combines timeless design with modern
                proportions. A versatile staple that effortlessly elevates any outfit.
              </p>
              <div className="mb-6 xl:mb-8">
                <div className="flex items-center gap-2 xl:gap-3">
                  <span className="text-2xl xl:text-3xl 2xl:text-4xl font-light text-gray-900">$289.00</span>
                  <span className="text-sm xl:text-base bg-gray-100 text-gray-700 px-2 xl:px-3 py-0.5 xl:py-1 rounded-full">Free shipping</span>
                </div>
                <div className="flex items-center mt-2 xl:mt-3">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={16} className="xl:w-5 xl:h-5 text-yellow-400 fill-yellow-400" />
                    ))}
                  </div>
                  <span className="ml-2 xl:ml-3 text-sm xl:text-base text-gray-600">128 reviews</span>
                </div>
              </div>
              <div className="flex gap-4 xl:gap-6">
                <Link
                  to="/products"
                  className="bg-gray-900 text-white hover:bg-gray-800 transition-all duration-300 px-6 xl:px-8 py-3 xl:py-4 text-base xl:text-lg rounded-md font-medium"
                >
                  Shop Now
                </Link>
                <button className="border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 transition-all duration-300 px-6 xl:px-8 py-3 xl:py-4 text-base xl:text-lg rounded-md font-medium flex items-center">
                  <Heart size={16} className="xl:w-5 xl:h-5 mr-2" />
                  Add to Favorites
                </button>
              </div>
            </div>
            <div className="order-1 lg:order-2 xl:col-span-2 relative">
              <div className="aspect-[4/5] xl:aspect-[3/4] 2xl:aspect-[4/5] overflow-hidden rounded-xl xl:rounded-2xl max-w-lg xl:max-w-none mx-auto">
                <img
                  src="https://product-images.therealreal.com/WCINQ86972_1_enlarged.jpg?width=1500"
                  alt="Essential Blazer"
                  className="object-cover h-full w-full"
                />
              </div>
              <div className="absolute top-4 xl:top-6 right-4 xl:right-6 bg-white/90 backdrop-blur-sm text-gray-900 px-4 xl:px-6 py-2 xl:py-3 text-xs xl:text-sm font-medium rounded-md xl:rounded-lg shadow-sm">
                BESTSELLER
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 xl:py-24 bg-white">
        <div className="container mx-auto px-4 xl:px-8 2xl:px-12 max-w-7xl 2xl:max-w-8xl">
          <div className="flex justify-between items-center mb-10 xl:mb-16">
            <h2 className="text-2xl xl:text-3xl 2xl:text-4xl font-light text-gray-900">New Arrivals</h2>
            <Link to="/products" className="text-gray-700 xl:text-lg font-medium flex items-center group">
              View All
              <ArrowRight size={16} className="xl:w-5 xl:h-5 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
          <ProductCarousel />
        </div>
      </section>

      {!user && (
        <section className="bg-gray-900 text-white py-16 xl:py-24">
          <div className="container mx-auto px-4 xl:px-8 2xl:px-12 text-center max-w-4xl xl:max-w-5xl 2xl:max-w-6xl">
            <h2 className="text-2xl md:text-3xl xl:text-4xl 2xl:text-5xl font-light mb-4 xl:mb-6">Join Our Marketplace</h2>
            <p className="text-gray-300 xl:text-lg 2xl:text-xl mb-8 xl:mb-12 max-w-xl xl:max-w-3xl mx-auto leading-relaxed">
              Sign up for exclusive access to special collections, personalized recommendations, and a seamless shopping
              experience.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 xl:gap-6 justify-center">
              <Link
                to="/login"
                className="bg-white text-gray-900 hover:bg-gray-100 transition-all duration-300 px-8 xl:px-10 py-3 xl:py-4 text-base xl:text-lg rounded-md font-medium"
              >
                Sign In
              </Link>
              <Link
                to="/register"
                className="bg-gray-800 text-white hover:bg-gray-700 border border-gray-700 transition-all duration-300 px-8 xl:px-10 py-3 xl:py-4 text-base xl:text-lg rounded-md font-medium"
              >
                Create Account
              </Link>
            </div>
          </div>
        </section>
      )}

   <section className="bg-gray-50 py-16 xl:py-24 border-t border-gray-100">
      <div className="container mx-auto px-4 xl:px-8 2xl:px-12 max-w-7xl 2xl:max-w-8xl">
        <h2 className="text-2xl xl:text-3xl 2xl:text-4xl font-light text-gray-900 mb-10 xl:mb-16 text-center">Our Brands</h2>
        <div className="grid grid-cols-3 gap-8 xl:gap-12 items-center justify-center">
          {brands.slice(0, 6).map((brand) => (
            <div
              key={brand.id}
              className="flex items-center justify-center transition-all duration-300 hover:scale-105"
            >
              <img
                src={brand.image || "/placeholder.svg"}
                alt={brand.name}
                className="h-12 xl:h-16 2xl:h-20 object-contain opacity-80 hover:opacity-100 transition-opacity"
              />
            </div>
          ))}
        </div>
      </div>
    </section>

      <section className="bg-black text-white py-20 xl:py-32">
        <div className="container mx-auto px-4 xl:px-8 2xl:px-12 max-w-4xl xl:max-w-5xl 2xl:max-w-6xl text-center">
          <h2 className="text-2xl xl:text-3xl 2xl:text-4xl font-light mb-4 xl:mb-6">Subscribe to Our Newsletter</h2>
          <p className="text-gray-300 xl:text-lg 2xl:text-xl mb-8 xl:mb-12 max-w-xl xl:max-w-3xl mx-auto">
            Be the first to know about new collections, exclusive offers, and curated selections.
          </p>
          <NewsletterForm />
        </div>
      </section>
    </div>
  )
}

const TrustBadge = ({ icon, title, description }) => (
  <div className="flex items-center gap-4 xl:gap-6 group">
    <div className="p-3 xl:p-4 rounded-full bg-gray-100 group-hover:bg-gray-200 transition-all duration-300 text-gray-700">
      {icon}
    </div>
    <div>
      <h3 className="font-medium xl:text-lg text-gray-900">{title}</h3>
      <p className="text-sm xl:text-base text-gray-500">{description}</p>
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
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 xl:gap-6 max-w-lg xl:max-w-2xl mx-auto">
      <input
        type="email"
        placeholder="Your email address"
        className="flex-grow bg-white/10 border border-white/20 text-white placeholder-white/50 px-4 xl:px-6 py-3 xl:py-4 text-base xl:text-lg rounded-md focus:outline-none focus:ring-2 focus:ring-white/30"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        aria-label="Email address"
      />
      <button
        type="submit"
        className="bg-white text-gray-900 hover:bg-gray-100 transition-colors duration-300 px-6 xl:px-8 py-3 xl:py-4 text-base xl:text-lg rounded-md font-medium whitespace-nowrap"
        aria-label="Subscribe"
      >
        Subscribe
      </button>
    </form>
  )
}

export default HomePage