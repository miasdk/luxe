import React from "react";
import { Link } from "react-router-dom";


const HomePage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-800 tracking-wider">My E-commerce</h1>
          <div className="flex space-x-6">
            <Link to="/" className="text-gray-800 hover:text-blue-600 font-medium transition-all duration-300">Home</Link>
            <Link to="/products" className="text-gray-800 hover:text-blue-600 font-medium transition-all duration-300">Products</Link>
            <Link to="/cart" className="text-gray-800 hover:text-blue-600 font-medium transition-all duration-300">Cart</Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-24 md:py-32">
        <div className="max-w-7xl mx-auto text-center px-4">
          <h2 className="text-5xl font-extrabold mb-4 leading-tight">
            Your Favorite Products, Now at Unbeatable Prices
          </h2>
          <p className="text-xl mb-8">
            Shop our top picks, enjoy fast delivery, and experience superior customer service. Find what you love today.
          </p>
          <Link
            to="/products"
            className="bg-white text-blue-600 py-3 px-8 rounded-lg font-semibold text-lg hover:bg-blue-50 transition duration-300"
          >
            Start Shopping
          </Link>
        </div>
      </div>

    
      {/* Footer */}
      <footer className="bg-white shadow-md mt-16">
        <div className="max-w-7xl mx-auto px-6 py-8 text-center">
          <p className="text-gray-600 text-sm">&copy; 2023 My E-commerce. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
