import React from "react";
import { Link } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import ProductCarousel from "../components/ProductCarousel";

const HomePage = () => {
  const { user, loading } = useAuthContext(); 
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-lg">Loading your experience...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-blue-500 to-gray-800 text-white py-24 md:py-32">
        <div className="max-w-7xl mx-auto text-center px-4">
          <h2 className="text-5xl font-extrabold mb-4 leading-tight">
            Your Favorite Products, Now at Unbeatable Prices
          </h2>
          <p className="text-xl mb-8">
            Shop our top picks, enjoy fast delivery, and experience superior customer service.
          </p>
          <Link
            to={user ? "/products" : "/login"}
            className="bg-white text-blue-600 py-3 px-8 rounded-lg font-semibold text-lg hover:bg-gray-100 transition duration-300 inline-block"
          >
            Shop Now
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto py-16 ">
        {user ? (
          <>
            <h2 className="text-3xl font-bold mb-4">Welcome back, {user.displayName || user.email}!</h2>
            <p className="text-lg mb-8">
              Explore our latest products and enjoy personalized recommendations.
            </p>
            <ProductCarousel />
          </>
        ) : (
          <>
            <h2 className="text-3xl font-bold mb-4">Discover Amazing Products</h2>
            <p className="text-lg mb-8">
              Sign in to access personalized recommendations
            </p>
            <div className="flex justify-center gap-4">
              <Link
                to="/login"
                className="bg-blue-600 text-white py-3 px-8 rounded-lg font-semibold text-lg hover:bg-blue-700 transition duration-300"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="bg-white text-blue-600 py-3 px-8 rounded-lg font-semibold text-lg border border-blue-600 hover:bg-blue-50 transition duration-300"
              >
                Register
              </Link>
            </div>
            <div className="mt-12">
              <h3 className="text-xl font-semibold mb-6">Featured Products</h3>
              <ProductCarousel />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default HomePage;