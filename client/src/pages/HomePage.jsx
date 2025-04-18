"use client"

import React from "react"
import { Link } from "react-router-dom"
import { useAuthContext } from "../context/AuthContext"
import ProductCarousel from "../components/ProductCarousel"
import CategoryCarousel from "../components/CategoryCarousel"
import { Truck, RotateCcw, Clock, ArrowRight, ChevronDown } from "lucide-react"
import heroImage from "../assets/images/hero.jpg"
import editorialImage1 from "../assets/images/editorial1.jpg"
import editorialImage2 from "../assets/images/editorial2.jpg"

const HomePage = () => {
  const { user, loading } = useAuthContext()
  const [isScrolled, setIsScrolled] = React.useState(false)

  // Add scroll effect
  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black mx-auto"></div>
          <p className="mt-4 text-lg font-medium text-gray-700">Loading your style...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="relative bg-neutral-100 overflow-hidden">
      <div className="container mx-auto px-4 py-20 md:py-28 flex flex-col md:flex-row items-center">
        <div className="md:w-1/2 z-10 mb-12 md:mb-0 pr-0 md:pr-12">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 leading-tight text-gray-900">Elevate Your <span className="italic">Style</span></h1>
          <p className="text-lg md:text-xl mb-8 text-gray-700 max-w-md">
            Discover this season's most coveted pieces. Designed for those who appreciate refined aesthetics.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link to="/products" className="bg-black text-white hover:bg-gray-800 transition-colors px-6 py-3 rounded-none font-medium flex items-center justify-center">
              SHOP COLLECTION <ArrowRight size={18} className="ml-2" />
            </Link>
            <Link to="/create-listing" className="border border-black text-black hover:bg-black hover:text-white transition-colors px-6 py-3 rounded-none font-medium">
              SELLING SOMETHING? 
            </Link>
          </div>
        </div>
        <div className="md:w-1/2 flex justify-center md:justify-end">
          <div className="relative h-96 w-80 md:h-110 md:w-96 bg-gray-200">
            <div className="absolute inset-0 flex items-center justify-center text-gray-400">
              <img src={heroImage} alt="Model" className="object-cover h-full w-full " />
            </div>
            <div className="absolute bottom-0 left-0 right-0 bg-white py-3 px-4">
              <p className="text-xs text-gray-500 uppercase tracking-wider">Spring Collection 2025</p>
              <p className="text-sm font-medium">Minimalist Essentials</p>
            </div>
          </div>
        </div>
      </div>
      {/* Decorative elements */}
      <div className="absolute top-10 right-10 h-24 w-24 border border-gray-300 opacity-50"></div>
      <div className="absolute bottom-10 left-10 h-32 w-32 border border-gray-300 opacity-50"></div>
    </div>

    <div className="bg-black text-white py-5">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-center justify-center md:justify-start gap-3 group cursor-pointer">
              <div className="p-2 rounded-full bg-white/10 group-hover:bg-white/20 transition-all duration-300">
                <Truck size={16} className="text-white" />
              </div>
              <span className="text-sm tracking-wide">FREE SHIPPING ON ORDERS OVER $100</span>
            </div>
            <div className="flex items-center justify-center gap-3 group cursor-pointer">
              <div className="p-2 rounded-full bg-white/10 group-hover:bg-white/20 transition-all duration-300">
                <RotateCcw size={16} className="text-white" />
              </div>
              <span className="text-sm tracking-wide">EASY 30-DAY RETURNS</span>
            </div>
            <div className="flex items-center justify-center md:justify-end gap-3 group cursor-pointer">
              <div className="p-2 rounded-full bg-white/10 group-hover:bg-white/20 transition-all duration-300">
                <Clock size={16} className="text-white" />
              </div>
              <span className="text-sm tracking-wide">NEXT-DAY DELIVERY AVAILABLE</span>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-20">
        <div className="flex justify-between items-center mb-10">
          <h2 className="text-2xl md:text-3xl font-light text-gray-900 tracking-wide">NEW ARRIVALS</h2>
          <Link to="/products" className="text-gray-900 font-medium flex items-center group">
            SHOP ALL
            <ArrowRight size={16} className="ml-2 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>
        <ProductCarousel />
      </div>

      <div className="py-16 bg-white border-t border-b border-gray-100">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1">
              <p className="text-sm uppercase tracking-widest text-gray-500 mb-3">Featured Product</p>
              <h2 className="text-3xl md:text-4xl font-light mb-6 leading-tight">The Essential Oversized Blazer</h2>
              <p className="text-gray-700 mb-8 leading-relaxed">
                Crafted from premium Italian wool, our signature blazer combines timeless design with modern
                proportions. A versatile staple that effortlessly elevates any outfit.
              </p>
              <div className="mb-8">
                <p className="text-2xl font-light">$289.00</p>
              </div>
              <Link
                to="/products/essential-blazer"
                className="inline-block bg-black text-white hover:bg-gray-800 transition-all duration-300 px-8 py-4 font-medium"
              >
                SHOP NOW
              </Link>
            </div>
            <div className="order-1 md:order-2 relative h-[28rem] bg-neutral-50">
              <div className="absolute inset-0 flex items-center justify-center">
                <img
                  src="https://product-images.therealreal.com/WCINQ86972_1_enlarged.jpg?width=1500"
                  alt="Essential Blazer"
                  className="object-cover h-full w-full"
                />
              </div>
              <div className="absolute top-4 right-4 bg-white px-3 py-1 text-xs font-medium">BESTSELLER</div>
            </div>
          </div>
        </div>
      </div>

      <div className="py-20 bg-neutral-100 hidden md:block">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-light text-gray-900 mb-10 text-center tracking-wide">
            TRENDING COLLECTIONS
          </h2>
          <CategoryCarousel />
        </div>
      </div>

      {!user && (
        <div className="bg-white border-t border-b border-gray-200 py-20">
          <div className="container mx-auto px-4 text-center max-w-3xl">
            <h2 className="text-2xl md:text-3xl font-light text-gray-900 mb-5 tracking-wide">JOIN OUR STYLE CLUB</h2>
            <p className="text-gray-700 mb-10 max-w-xl mx-auto leading-relaxed">
              Sign up for exclusive access to early releases, members-only discounts, and style inspiration directly to
              your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-5 justify-center">
              <Link
                to="/login"
                className="bg-black text-white hover:bg-gray-800 transition-all duration-300 px-10 py-4 rounded-none font-medium"
              >
                SIGN IN
              </Link>
              <Link
                to="/register"
                className="border border-black text-black hover:bg-black hover:text-white transition-all duration-300 px-10 py-4 rounded-none font-medium"
              >
                CREATE ACCOUNT
              </Link>
            </div>
          </div>
        </div>
      )}

      <div className="container mx-auto px-4 py-20">
      <h2 className="text-2xl md:text-3xl font-light text-gray-900 mb-10 text-center tracking-wide">
            EDITORIAL
          </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="relative h-[28rem] bg-gray-200 group overflow-hidden">
            <img
              src={editorialImage1 || "/placeholder.svg"}
              alt="Editorial"
              className="object-cover h-full w-full transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute bottom-0 left-0 right-0 transition-all duration-300 transform translate-y-0 group-hover:translate-y-0">
              <div className="bg-white p-6">
                <h3 className="font-medium text-xl mb-3">Spring 2025 Style Guide</h3>
                <p className="text-gray-600 mb-4 leading-relaxed">
                  Discover this season's essential pieces and how to style them for any occasion.
                </p>
                <Link to="/style-guide" className="text-black font-medium flex items-center group">
                  READ MORE
                  <ArrowRight size={16} className="ml-2 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          </div>
          <div className="relative h-[28rem] bg-gray-200 group overflow-hidden">
            <img
              src={editorialImage2 || "/placeholder.svg"}
              alt="Editorial"
              className="object-cover h-full w-full transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute bottom-0 left-0 right-0 transition-all duration-300 transform translate-y-0 group-hover:translate-y-0">
              <div className="bg-white p-6">
                <h3 className="font-medium text-xl mb-3">Sustainability Commitment</h3>
                <p className="text-gray-600 mb-4 leading-relaxed">
                  Learn about our eco-friendly materials and ethical manufacturing processes.
                </p>
                <Link to="/sustainability" className="text-black font-medium flex items-center group">
                  READ MORE
                  <ArrowRight size={16} className="ml-2 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-black text-white py-20">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h2 className="text-2xl md:text-3xl font-light mb-4 tracking-wide">SUBSCRIBE TO OUR NEWSLETTER</h2>
          <p className="text-gray-300 mb-8 max-w-xl mx-auto">
            Be the first to know about new collections, exclusive offers, and style inspiration.
          </p>
          <form className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
            <input
              type="email"
              placeholder="Your email address"
              className="flex-grow bg-white/10 border border-white/20 text-white px-4 py-3 focus:outline-none focus:ring-1 focus:ring-white/50"
              required
            />
            <button
              type="submit"
              className="bg-white text-black hover:bg-gray-200 transition-colors duration-300 px-6 py-3 font-medium"
            >
              SUBSCRIBE
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default HomePage
