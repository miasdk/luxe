"use client"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { useAuthContext } from "../context/AuthContext"
import ProductCarousel from "../components/ProductCarousel"
import CategoryCarousel from "../components/CategoryCarousel"
import { Truck, RotateCcw, ArrowRight, ChevronDown, Search, Heart, Shield, Star } from "lucide-react"
import editorialImage1 from "../assets/images/editorial1.jpg"
import editorialImage2 from "../assets/images/editorial2.jpg"
import brandService from "../services/brandService"
import { use } from "react"
const HomePage = () => {
  const { user, loading } = useAuthContext()
  const [isScrolled, setIsScrolled] = useState(false)
  const [brands, setBrands] = useState([])
  const [activeCategory, setActiveCategory] = useState("All")
  const [searchQuery, setSearchQuery] = useState("")

  const categories = [
    "All",
    "Fashion",
    "Electronics",
    "Home",
    "Sports",
    "Collectibles",
    "Jewelry",
    "Toys",
    "Automotive",
  ]

  const trendingItems = [
    {
      id: 1,
      title: "Vintage Leather Jacket",
      price: 129.99,
      image: "https://product-images.therealreal.com/WCINQ86972_1_enlarged.jpg?width=1500",
      rating: 4.8,
      reviews: 24,
    },
    {
      id: 2,
      title: "Designer Sunglasses",
      price: 89.99,
      image: "/placeholder.svg",
      rating: 4.6,
      reviews: 18,
    },
    {
      id: 3,
      title: "Premium Watch",
      price: 349.99,
      image: "/placeholder.svg",
      rating: 4.9,
      reviews: 36,
    },
    {
      id: 4,
      title: "Designer Handbag",
      price: 199.99,
      image: "/placeholder.svg",
      rating: 4.7,
      reviews: 29,
    },
  ]
  
  const fetchBrands = async () => {
    try {
      const data = await brandService.fetchAllBrands()
      setBrands(data)
    } catch (error) {
      console.error("Error fetching brands:", error)
    }
  }

  useEffect(() => {
    fetchBrands()
  }, [])
  
  console.log("Brands:", brands)
  // Add scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleSearch = (e) => {
    e.preventDefault()
    // Implement search functionality
    console.log("Searching for:", searchQuery)
  }

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
      {/* Main navigation categories - Elegant style */}
      <div
        className={`bg-white border-b border-gray-200 sticky top-0 z-30 transition-shadow ${isScrolled ? "shadow-sm" : ""}`}
      >
        <div className="container mx-auto px-4">
          <div className="flex overflow-x-auto py-3 gap-8 scrollbar-hide">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`whitespace-nowrap px-2 py-1 text-sm font-medium transition-all ${
                  activeCategory === category
                    ? "text-gray-900 border-b border-gray-900"
                    : "text-gray-500 hover:text-gray-900"
                }`}
                aria-current={activeCategory === category ? "page" : undefined}
              >
                {category}
              </button>
            ))}
            <button className="whitespace-nowrap px-2 py-1 text-sm font-medium text-gray-500 hover:text-gray-900 flex items-center">
              More <ChevronDown size={14} className="ml-1" />
            </button>
          </div>
        </div>
      </div>

      {/* Refined Hero section */}
      <div className="relative bg-gradient-to-r from-gray-50 to-gray-100 overflow-hidden">
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

              <form onSubmit={handleSearch} className="relative max-w-md">
                <input
                  type="text"
                  placeholder="Search for anything..."
                  className="w-full py-3 px-4 pr-12 bg-white border border-gray-200 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-200 focus:border-transparent transition-all"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  aria-label="Search products"
                />
                <button
                  type="submit"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  aria-label="Submit search"
                >
                  <Search size={20} />
                </button>
              </form>

              <div className="flex flex-wrap gap-4">
                <Link
                  to="/products"
                  className="inline-flex items-center px-6 py-3 bg-gray-900 text-white rounded-md hover:bg-gray-800 transition-colors"
                >
                  Explore Collection
                </Link>
                <Link
                  to="/sell"
                  className="inline-flex items-center px-6 py-3 bg-white border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
                >
                  Start Selling
                </Link>
              </div>
            </div>

            <div className="relative">
              <div className="aspect-square max-w-md mx-auto overflow-hidden rounded-2xl shadow-xl">
                <img
                  src={editorialImage2 || "/placeholder.svg"}
                  alt="Featured product"
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
        <div className="absolute top-1/4 right-0 w-64 h-64 bg-gray-200 rounded-full opacity-20 -mr-32"></div>
        <div className="absolute bottom-0 left-0 w-40 h-40 bg-gray-200 rounded-full opacity-20 -ml-20 -mb-20"></div>
      </div>

      {/* Elegant benefits bar */}
      <div className="bg-white py-8 border-b border-gray-100">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex items-center gap-4 group">
              <div className="p-3 rounded-full bg-gray-100 group-hover:bg-gray-200 transition-all duration-300">
                <Truck size={20} className="text-gray-700" />
              </div>
              <div>
                <h3 className="font-medium text-gray-900">Complimentary Shipping</h3>
                <p className="text-sm text-gray-500">On orders over $100</p>
              </div>
            </div>
            <div className="flex items-center gap-4 group">
              <div className="p-3 rounded-full bg-gray-100 group-hover:bg-gray-200 transition-all duration-300">
                <RotateCcw size={20} className="text-gray-700" />
              </div>
              <div>
                <h3 className="font-medium text-gray-900">Hassle-Free Returns</h3>
                <p className="text-sm text-gray-500">30-day return policy</p>
              </div>
            </div>
            <div className="flex items-center gap-4 group">
              <div className="p-3 rounded-full bg-gray-100 group-hover:bg-gray-200 transition-all duration-300">
                <Shield size={20} className="text-gray-700" />
              </div>
              <div>
                <h3 className="font-medium text-gray-900">Buyer Protection</h3>
                <p className="text-sm text-gray-500">Secure transactions guaranteed</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Trending Items - Elegant Grid */}
      {/* }

      <div className="container mx-auto px-4 py-16">
        <div className="flex justify-between items-center mb-10">
          <h2 className="text-2xl font-light text-gray-900">Trending Now</h2>
          <Link to="/products" className="text-gray-700 font-medium flex items-center group">
            View All
            <ArrowRight size={16} className="ml-2 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {trendingItems.map((item) => (
            <Link key={item.id} to={`/products/${item.id}`} className="group">
              <div className="bg-white overflow-hidden rounded-xl shadow-sm hover:shadow-md transition-all duration-300">
                <div className="relative aspect-square">
                  <img
                    src={item.image || "/placeholder.svg"}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <button
                    className="absolute top-4 right-4 bg-white/80 backdrop-blur-sm p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    aria-label="Add to favorites"
                  >
                    <Heart size={18} className="text-gray-700" />
                  </button>
                </div>

                <div className="p-5">
                  <h3 className="font-medium text-gray-900 mb-2 group-hover:text-gray-700 transition-colors">
                    {item.title}
                  </h3>
                  <div className="flex items-center justify-between">
                    <p className="text-lg font-medium text-gray-900">${item.price.toFixed(2)}</p>
                    <div className="flex items-center">
                      <Star size={14} className="text-yellow-500 fill-yellow-500" />
                      <span className="ml-1 text-sm text-gray-500">
                        {item.rating} ({item.reviews})
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
      */}

      {/* Categories section - Elegant version */}
      <div className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-light text-gray-900 mb-10 text-center">Shop by Category</h2>
          <CategoryCarousel />
        </div>
      </div>

      {/* Featured product - Elegant version */}
      <div className="py-16 bg-white">
        <div className="container mx-auto px-4">
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
                  to="/products/essential-blazer"
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
              <div className="aspect-[4/5] overflow-hidden rounded-xl shadow-lg">
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
      </div>

      {/* New Arrivals with elegant styling */}
      <div className="py-16 bg-white">
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
      </div>


      {/* Join section for non-logged in users - Elegant version */}
      {!user && (
        <div className="bg-gray-900 text-white py-16">
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
        </div>
      )}

      {/* Editorial section - Elegant version */}
      <div className="container mx-auto px-4 py-16">
        <h2 className="text-2xl font-light text-gray-900 mb-10 text-center">Editorial</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 group">
            <div className="relative h-80 overflow-hidden">
              <img
                src={editorialImage1 || "/placeholder.svg"}
                alt="Editorial"
                className="object-cover h-full w-full transition-transform duration-700 group-hover:scale-105"
              />
            </div>
            <div className="p-8">
              <h3 className="font-light text-2xl mb-3">Spring 2025 Style Guide</h3>
              <p className="text-gray-600 mb-4 leading-relaxed">
                Discover this season's essential pieces and how to style them for any occasion.
              </p>
              <Link to="/style-guide" className="text-gray-900 font-medium flex items-center group">
                Read More
                <ArrowRight size={16} className="ml-2 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
          <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 group">
            <div className="relative h-80 overflow-hidden">
              <img
                src={editorialImage2 || "/placeholder.svg"}
                alt="Editorial"
                className="object-cover h-full w-full transition-transform duration-700 group-hover:scale-105"
              />
            </div>
            <div className="p-8">
              <h3 className="font-light text-2xl mb-3">Sustainability Commitment</h3>
              <p className="text-gray-600 mb-4 leading-relaxed">
                Learn about our eco-friendly materials and ethical manufacturing processes.
              </p>
              <Link to="/sustainability" className="text-gray-900 font-medium flex items-center group">
                Read More
                <ArrowRight size={16} className="ml-2 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Brands section - Elegant version */}
      <div className="bg-gray-50 py-16 border-t border-gray-100">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-light text-gray-900 mb-10 text-center">Featured Brands</h2>
          <div className="grid grid-cols-2 md:grid-cols-6 gap-8 items-center">
            {brands.slice(0, 6).map((brand) => (
              <div
                key={brand.id}
                className="flex items-center justify-center bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-all duration-300"
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
      </div>

      <div className="bg-black text-white py-20">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h2 className="text-2xl font-light mb-4">Subscribe to Our Newsletter</h2>
          <p className="text-gray-300 mb-8 max-w-xl mx-auto">
            Be the first to know about new collections, exclusive offers, and curated selections.
          </p>
          <form className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
            <input
              type="email"
              placeholder="Your email address"
              className="flex-grow bg-white/10 border border-white/20 text-white px-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-white/30"
              required
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
        </div>
      </div>
    </div>
  )
}

export default HomePage
