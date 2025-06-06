import { Link } from 'react-router-dom';
import { auth } from '../firebase/client';
import { signOut } from 'firebase/auth';
import { FaRegUserCircle, FaChevronDown, FaChevronUp } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { useState, useRef, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { Heart, ShoppingCart } from 'lucide-react';
import { useWishlist } from '../context/WishlistContext';
import CartModal from './CartModal';

export default function TopNavBar({ user, loading }) {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isCartModalOpen, setIsCartModalOpen] = useState(false);
    const dropdownRef = useRef(null);
    const navigate = useNavigate();

    const { cart } = useCart(); 
    const { wishlistItems } = useWishlist();

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropdownOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const toggleCartModal = () => {
        setIsCartModalOpen(!isCartModalOpen);
    };

    const handleLogout = async () => {
        try {
            await signOut(auth);  
            navigate('/');
        } catch (error) {
            console.error("Logout error:", error);
        }
    };
  
    if (loading) return null;

    return (
        <>
            <nav className="sticky top-0 bg-white z-50 border-solid p-1 shadow-sm">
                <div className="container mx-auto flex justify-between items-center">
                    {user ? (
                        <div className="relative" ref={dropdownRef}>
                            <button 
                                onClick={toggleDropdown}
                                className="flex items-center space-x-2 focus:outline-none hover:bg-gray-50 rounded-lg p-2 transition-colors"
                            >
                                <div className="flex-shrink-0">
                                    {user.photoURL ? (
                                        <img 
                                            src={user.photoURL} 
                                            alt="Profile"
                                            className="w-8 h-8 rounded-full border-2 border-gray-200 object-cover"
                                            onError={(e) => {
                                                console.log('Image failed to load:', user.photoURL);
                                                e.target.style.display = 'none';
                                                e.target.parentNode.querySelector('.fallback-icon').style.display = 'block';
                                            }}
                                        />
                                    ) : null}
                                    <FaRegUserCircle 
                                        className={`text-2xl text-gray-600 fallback-icon ${user.photoURL ? 'hidden' : 'block'}`} 
                                    />
                                </div>
                                
                                <div className="flex items-center space-x-1">
                                    <span className="hidden sm:inline-block text-xs font-medium text-gray-700">
                                        Signed in as {user.displayName || user.email?.split('@')[0] || 'Account'}
                                    </span>
                                    {isDropdownOpen ? 
                                        <FaChevronUp className="text-xs text-gray-500" /> : 
                                        <FaChevronDown className="text-xs text-gray-500" />
                                    }
                                </div>
                            </button>
                            
                            {isDropdownOpen && (
                                <div className="absolute left-0 mt-2 w-64 bg-white rounded-xl shadow-lg border border-gray-100 py-2 z-50">
                                    <div className="px-4 py-3 border-b border-gray-100">
                                        <div className="flex items-center space-x-3">
                                            {user.photoURL ? (
                                                <img 
                                                    src={user.photoURL} 
                                                    alt="Profile"
                                                    className="w-10 h-10 rounded-full"
                                                />
                                            ) : (
                                                <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                                                    <FaRegUserCircle className="text-xl text-gray-500" />
                                                </div>
                                            )}
                                            <div className="flex-1 min-w-0">
                                                <p className="text-sm font-medium text-gray-900 truncate">
                                                    {user.displayName || 'User'}
                                                </p>
                                                <p className="text-xs text-gray-500 truncate">
                                                    {user.email}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div className="py-1">
                                        <Link
                                            to="/profile"
                                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                                            onClick={() => setIsDropdownOpen(false)}
                                        >
                                            Your Profile
                                        </Link>
                                        <Link
                                            to="/orders"
                                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                                            onClick={() => setIsDropdownOpen(false)}
                                        >
                                            Your Orders
                                        </Link>
                                        <hr className="my-1 border-gray-100" />
                                        <button
                                            onClick={handleLogout}
                                            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                                        >
                                            Sign Out
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    ) : (
                        <span className="hidden sm:inline-block text-xs">
                            Welcome to eCart!<Link to="/login" className="text-blue-400 hover:underline"> Login</Link> or <Link to="/register" className="text-blue-400 hover:underline"> Register</Link>
                        </span>
                    )}

                    <div className="flex items-center space-x-4">
                        {user ? (
                            <>
                                <Link to="/create-listing" className="py-2 hover:underline">
                                    <span className="text-xs">Sell</span>
                                </Link>
                                <Link 
                                    to="/wishlist"
                                    className="flex items-center gap-1 px-3 py-2 text-sm text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors"
                                >
                                    <div className="relative flex items-center">
                                        <Heart size={20} />
                                        {wishlistItems.length > 0 && (
                                            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                                                {wishlistItems.length}
                                            </span>
                                        )}
                                    </div>
                                </Link>
                                
                                <button 
                                    onClick={toggleCartModal}
                                    className="relative flex items-center p-2 hover:bg-gray-100 rounded-md transition-colors"
                                    aria-label="Shopping cart"
                                >
                                    <div className="relative">
                                        <ShoppingCart size={20} />
                                        {cart && cart.length > 0 && ( 
                                            <span className="absolute -top-1 -right-1 bg-blue-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center font-medium">
                                                {cart.length} 
                                            </span>
                                        )}
                                    </div>
                                </button>
                            </>
                        ) : (
                            <>
                                <Link to="/login" className="hover:underline text-sm">Login</Link>
                                <Link to="/register" className="hover:underline text-sm">Register</Link>
                            </>
                        )}
                    </div>
                </div>
            </nav>

            <CartModal 
                isOpen={isCartModalOpen} 
                onClose={() => setIsCartModalOpen(false)} 
            />
        </>
    );
}