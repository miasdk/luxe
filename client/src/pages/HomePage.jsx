import React from "react";
import { Link } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";



const HomePage = () => {
  const { user } = useAuthContext();

  return (
    <div className="min-h-screen bg-gray-50">
      
      <div className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-24 md:py-32">
        <div className="max-w-7xl mx-auto text-center px-4">
          <h2 className="text-5xl font-extrabold mb-4 leading-tight">
            Your Favorite Products, Now at Unbeatable Prices
          </h2>
          <p className="text-xl mb-8">
            Shop our top picks, enjoy fast delivery, and experience superior customer service. Find what you love today.
          </p>
          {user ? (
            <Link
              to="/products"
              className="bg-white text-blue-600 py-3 px-8 rounded-lg font-semibold text-lg hover:bg-gray-100 transition duration-300"
            >
              Shop Now
            </Link>
          ) : (
            <Link
              to="/login"
              className="bg-white text-blue-600 py-3 px-8 rounded-lg font-semibold text-lg hover:bg-gray-100 transition duration-300"
            >
              Shop Now
            </Link>
          )}
          
        </div>
      </div>

      {user ? (
        <div className="max-w-7xl mx-auto py-16 px-4 text-center">
          <h2 className="text-xl">Hello, {user.displayName || user.email} !</h2>
          <p className="mt-4">
            Welcome back! Explore our latest products and enjoy exclusive offers.
          </p>
        </div>
      ) : (
        <>
          <div className="max-w-7xl min-h-screen mx-auto py-16 px-4 text-center">
            <h2 className="text-xl">Welcome to Our Store!</h2>
            <p className="mt-4">
              Sign up or log in to access exclusive deals and personalized recommendations.
            </p>
            <Link
              to="/login"
              className="mt-4 inline-block bg-blue-600 text-white py-3 px-8 rounded-lg font-semibold text-lg hover:bg-blue-700 transition duration-300"
            >
              Login to get started
            </Link>
          </div>
          <div className="max-w-full mx-auto text-center">
            <img 
              src="https://images.unsplash.com/photo-1732257119998-b66cda63dcfc?q=80&w=1330&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Placeholder"
              className="w-full max-h-96 object-cover mx-auto"
            />
          </div>
        </>
      
      )}

    </div>
  );
};

export default HomePage;
