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
                                className="flex items-center space-x-1 focus:outline-none"
                            >
                                <FaRegUserCircle className="text-lg" />
                                {isDropdownOpen ? <FaChevronUp className="text-xs" /> : <FaChevronDown className="text-xs" />}
                                <span className="hidden sm:inline-block text-xs">
                                    Signed in as {user.displayName || user.email}
                                </span>
                            </button>
                            
                            {isDropdownOpen && (
                                <div className="absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                                    <Link
                                        to="/profile"
                                        className="block px-4 py-2 text-xs text-gray-700 hover:bg-gray-100"
                                        onClick={() => setIsDropdownOpen(false)}
                                    >
                                        Your Profile
                                    </Link>
                                    <Link
                                        to="/orders"
                                        className="block px-4 py-2 text-xs text-gray-700 hover:bg-gray-100"
                                        onClick={() => setIsDropdownOpen(false)}
                                    >
                                        Your Orders
                                    </Link>
                                    <button
                                        onClick={handleLogout}
                                        className="block w-full text-left px-4 py-2 text-xs text-gray-700 hover:bg-gray-100"
                                    >
                                        Sign Out
                                    </button>
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

            {/* Cart Modal */}
            <CartModal 
                isOpen={isCartModalOpen} 
                onClose={() => setIsCartModalOpen(false)} 
            />
        </>
    );
}