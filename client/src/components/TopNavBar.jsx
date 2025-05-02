import { Link } from 'react-router-dom';
import { auth } from '../firebase/client';
import { signOut } from 'firebase/auth';
import { FaShoppingCart, FaRegUserCircle, FaShoppingBag, FaRegHeart, FaChevronDown, FaChevronUp } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { useState, useRef, useEffect } from 'react';
import { useShoppingCart } from '../context/CartContext';
import Badge from '@mui/material/Badge';

export default function TopNavBar({ user, loading }) {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);
    const navigate = useNavigate();

    const { cart, toggleCart } = useShoppingCart();

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
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
        <nav className=" border-solid p-1">
            <div className="container mx-auto flex justify-between items-center">
                { user ? (
                     <div className="relative" ref={dropdownRef}>
                     <button 
                         onClick={toggleDropdown}
                         className="flex items-center space-x-1 focus:outline-none"
                     >
                         <FaRegUserCircle className="text-lg" />
                         {isOpen ? <FaChevronUp className="text-xs" /> : <FaChevronDown className="text-xs" />}
                         <span className="hidden sm:inline-block text-xs">
                            Signed in as {user.displayName || user.email}
                         </span>
                     </button>
                     
                     {isOpen && (
                         <div className="absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                             <Link
                                 to="/profile"
                                 className="block px-4 py-2 text-xs text-gray-700 hover:bg-gray-100"
                                 onClick={() => setIsOpen(false)}
                             >
                                 Your Profile
                             </Link>
                                <Link
                                    to="/orders"
                                    className="block px-4 py-2 text-xs text-gray-700 hover:bg-gray-100"
                                    onClick={() => setIsOpen(false)}
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
                            <Link to="/wishlist" className="py-2 hover:underline">
                                <FaRegHeart className="text-md" />
                            </Link>
                            <button onClick={toggleCart} className="relative">
                                <Badge badgeContent={cart.length} color="primary">
                                    <FaShoppingCart className="text-md" />
                                </Badge>
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
    );
}