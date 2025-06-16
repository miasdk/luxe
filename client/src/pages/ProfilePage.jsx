import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { API_BASE_URL } from '../config/constants';
import { 
    User, 
    Calendar, 
    Heart, 
    ShoppingBag, 
    Settings, 
    Star,
    TrendingUp,
    DollarSign,
    Package,
    Camera,
    Construction,
    Clock,
    HardHat,
    Hammer,
    Mail,
    Shield
} from 'lucide-react';

export default function ProfilePage() {
    const { user } = useAuthContext();
    const { cart } = useCart();
    const { wishlistItems } = useWishlist();
    const [totalOrders, setTotalOrders] = useState(0);
    const [loadingOrders, setLoadingOrders] = useState(true);

    // Fetch user's orders to get count
    useEffect(() => {
        const fetchOrderCount = async () => {
            if (!user) return;
            
            try {
                const response = await fetch(`${API_BASE_URL}/api/orders/user/${user.uid}`);
                if (response.ok) {
                    const data = await response.json();
                    
                    // Group orders by order_id to get unique order count
                    const uniqueOrders = data.reduce((acc, item) => {
                        if (!acc[item.order_id]) {
                            acc[item.order_id] = true;
                        }
                        return acc;
                    }, {});
                    
                    setTotalOrders(Object.keys(uniqueOrders).length);
                }
            } catch (error) {
                console.error('Error fetching orders:', error);
            } finally {
                setLoadingOrders(false);
            }
        };
        
        fetchOrderCount();
    }, [user]);

    if (!user) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
                <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8 text-center">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <User size={28} className="text-gray-400" />
                    </div>
                    <h1 className="text-2xl font-bold text-gray-900 mb-3">Sign in to view profile</h1>
                    <p className="text-gray-600 mb-8">Access your profile, listings, and account settings.</p>
                    <Link
                        to="/login"
                        className="w-full inline-flex items-center justify-center px-6 py-3 bg-black text-white font-medium rounded-xl hover:bg-gray-800 transition-colors"
                    >
                        Sign In
                    </Link>
                </div>
            </div>
        );
    }

    // Format join date
    const formatJoinDate = () => {
        return new Date().toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'long' 
        });
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="container mx-auto px-4 py-8">
                <div className="max-w-4xl mx-auto">
                    
                    <div className="bg-white rounded-2xl shadow-sm p-8 mb-8">
                        <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                            <div className="relative">
                                {user.photoURL ? (
                                    <img 
                                        src={user.photoURL} 
                                        alt="Profile"
                                        className="w-24 h-24 rounded-full border-4 border-gray-100"
                                    />
                                ) : (
                                    <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center border-4 border-gray-200">
                                        <User size={32} className="text-gray-400" />
                                    </div>
                                )}
                                <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-100 rounded-full flex items-center justify-center border-2 border-white">
                                    <Shield size={16} className="text-green-600" />
                                </div>
                            </div>
                            
                            <div className="flex-1">
                                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                                    {user.displayName || user.email?.split('@')[0] || 'User'}
                                </h1>
                                <div className="flex items-center gap-2 text-gray-600 mb-4">
                                    <Mail size={16} />
                                    <span>{user.email}</span>
                                </div>
                                <div className="flex items-center gap-6 text-sm text-gray-600">
                                    <div className="flex items-center gap-2">
                                        <Calendar size={16} />
                                        <span>Joined {formatJoinDate()}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Star size={16} className="text-yellow-500" />
                                        <span>New Member</span>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="flex gap-3">
                                <Link
                                    to="/orders"
                                    className="flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
                                >
                                    <ShoppingBag size={16} />
                                    Orders
                                </Link>
                                <Link
                                    to="/wishlist"
                                    className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                                >
                                    <Heart size={16} />
                                    Wishlist
                                </Link>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                        <div className="bg-white rounded-xl p-6 text-center">
                            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                                <ShoppingBag size={24} className="text-blue-600" />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900">
                                {loadingOrders ? '...' : totalOrders}
                            </h3>
                            <p className="text-gray-600">Total Orders</p>
                        </div>
                        
                        <div className="bg-white rounded-xl p-6 text-center">
                            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-3">
                                <Heart size={24} className="text-red-600" />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900">{wishlistItems ? wishlistItems.length : 0}</h3>
                            <p className="text-gray-600">Wishlist Items</p>
                        </div>
                    </div>

                    <div className="bg-white rounded-2xl p-8">
                        <div className="text-center mb-8">
                            <div className="relative mb-6">
                                <div className="w-20 h-20 mx-auto bg-orange-100 rounded-full flex items-center justify-center">
                                    <Construction size={40} className="text-orange-600" />
                                </div>
                                <div className="absolute -top-1 -right-4 w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center animate-bounce">
                                    <HardHat size={16} className="text-yellow-600" />
                                </div>
                                <div className="absolute -bottom-1 -left-4 w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center animate-pulse">
                                    <Hammer size={12} className="text-gray-600" />
                                </div>
                            </div>

                            <h2 className="text-2xl font-bold text-gray-900 mb-4">
                                Advanced Features Coming Soon
                            </h2>
                            
                            <p className="text-gray-600 mb-8">
                                We're working on exciting new features to enhance your profile experience.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                            <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
                                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                                    <Camera size={20} className="text-blue-600" />
                                </div>
                                <div>
                                    <h3 className="font-medium text-gray-900">Photo Upload</h3>
                                    <p className="text-sm text-gray-600">Custom profile pictures</p>
                                </div>
                            </div>
                            
                            <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
                                <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                                    <TrendingUp size={20} className="text-purple-600" />
                                </div>
                                <div>
                                    <h3 className="font-medium text-gray-900">Seller Dashboard</h3>
                                    <p className="text-sm text-gray-600">Advanced analytics</p>
                                </div>
                            </div>
                            
                            <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
                                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                                    <Package size={20} className="text-green-600" />
                                </div>
                                <div>
                                    <h3 className="font-medium text-gray-900">Listing Management</h3>
                                    <p className="text-sm text-gray-600">Enhanced product tools</p>
                                </div>
                            </div>
                            
                            <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
                                <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center">
                                    <DollarSign size={20} className="text-yellow-600" />
                                </div>
                                <div>
                                    <h3 className="font-medium text-gray-900">Sales Analytics</h3>
                                    <p className="text-sm text-gray-600">Revenue tracking</p>
                                </div>
                            </div>
                            
                            <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
                                <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                                    <Star size={20} className="text-red-600" />
                                </div>
                                <div>
                                    <h3 className="font-medium text-gray-900">Reviews System</h3>
                                    <p className="text-sm text-gray-600">Customer feedback</p>
                                </div>
                            </div>
                            
                            <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
                                <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center">
                                    <Settings size={20} className="text-indigo-600" />
                                </div>
                                <div>
                                    <h3 className="font-medium text-gray-900">Account Settings</h3>
                                    <p className="text-sm text-gray-600">Privacy & preferences</p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-blue-50 rounded-xl p-6 text-center">
                            <div className="flex items-center justify-center gap-2 mb-3">
                                <Clock size={20} className="text-blue-600" />
                                <h3 className="text-lg font-medium text-blue-900">Expected Release</h3>
                            </div>
                            <p className="text-blue-700 text-xl font-semibold">July 2025</p>
                            <p className="text-blue-600 text-sm mt-1">Stay tuned for updates!</p>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl p-6">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                                <TrendingUp size={20} className="text-gray-600" />
                            </div>
                            <h3 className="text-lg font-medium text-gray-900">Advanced Features Coming Soon</h3>
                        </div>
                        <div className="space-y-4">
                            <div className="flex items-center gap-3 text-gray-600">
                                <Clock size={18} />
                                <span>Order History & Tracking</span>
                            </div>
                            <div className="flex items-center gap-3 text-gray-600">
                                <Mail size={18} />
                                <span>Email Notifications</span>
                            </div>
                            <div className="flex items-center gap-3 text-gray-600">
                                <Shield size={18} />
                                <span>Enhanced Security Features</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}