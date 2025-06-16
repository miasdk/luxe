import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Heart, ShoppingBag, User } from 'lucide-react';

const Navbar = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const [user, setUser] = useState(null);
    const [wishlistItems, setWishlistItems] = useState([]);
    const [cart, setCart] = useState([]);

    const handleSearch = () => {
    };

    const handleLogout = () => {
    };

    return (
        <nav className="bg-white border-b border-gray-100 sticky top-0 z-50">
            <div className="container mx-auto px-4 xl:px-8 max-w-6xl">
                <div className="flex items-center h-16">
                    <Link to="/" className="flex-shrink-0 mr-8">
                        <span className="text-2xl font-light text-gray-900">eCart</span>
                    </Link>

                    <div className="flex-1 max-w-3xl">
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Search for products..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                onKeyPress={(e) => {
                                    if (e.key === 'Enter') {
                                        handleSearch();
                                    }
                                }}
                                className="w-full h-10 pl-4 pr-10 text-sm text-gray-900 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                            <button
                                onClick={handleSearch}
                                className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                            >
                                <Search size={18} />
                            </button>
                        </div>
                    </div>

                    {/* Navigation Links */}
                    <div className="flex items-center gap-6 ml-8">
                        <Link
                            to="/products"
                            className="text-sm text-gray-600 hover:text-gray-900"
                        >
                            Shop
                        </Link>
                        <Link
                            to="/categories"
                            className="text-sm text-gray-600 hover:text-gray-900"
                        >
                            Categories
                        </Link>
                        {user ? (
                            <div className="flex items-center gap-4">
                                <Link
                                    to="/wishlist"
                                    className="text-gray-600 hover:text-gray-900 relative"
                                >
                                    <Heart size={20} />
                                    {wishlistItems.length > 0 && (
                                        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                                            {wishlistItems.length}
                                        </span>
                                    )}
                                </Link>
                                <Link
                                    to="/cart"
                                    className="text-gray-600 hover:text-gray-900 relative"
                                >
                                    <ShoppingBag size={20} />
                                    {cart.length > 0 && (
                                        <span className="absolute -top-2 -right-2 bg-blue-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                                            {cart.length}
                                        </span>
                                    )}
                                </Link>
                                <div className="relative">
                                    <button
                                        onClick={() => setIsProfileOpen(!isProfileOpen)}
                                        className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
                                    >
                                        <User size={20} />
                                        <span className="text-sm">{user.display_name}</span>
                                    </button>
                                    {isProfileOpen && (
                                        <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-100 py-2">
                                            <Link
                                                to="/profile"
                                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                                            >
                                                Profile
                                            </Link>
                                            <Link
                                                to="/orders"
                                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                                            >
                                                Orders
                                            </Link>
                                            <button
                                                onClick={handleLogout}
                                                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                                            >
                                                Sign out
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ) : (
                            <div className="flex items-center gap-4">
                                <Link
                                    to="/login"
                                    className="text-sm text-gray-600 hover:text-gray-900"
                                >
                                    Sign in
                                </Link>
                                <Link
                                    to="/register"
                                    className="text-sm bg-gray-900 text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors"
                                >
                                    Register
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar; 