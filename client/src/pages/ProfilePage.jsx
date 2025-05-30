import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext';
import { 
    User, 
    MapPin, 
    Calendar, 
    Heart, 
    ShoppingBag, 
    Settings, 
    Star,
    TrendingUp,
    DollarSign,
    Package,
    Users,
    Camera,
    Edit3,
    Badge,
    Grid3X3,
    List,
    Filter,
    Share2,
    Construction,
    Clock,
    AlertCircle,
    ArrowLeft,
    Hammer,
    HardHat
} from 'lucide-react';

export default function ProfilePage() {
    const { user } = useAuthContext();
    const [activeTab, setActiveTab] = useState('listings');
    const [viewMode, setViewMode] = useState('grid');

    const profileData = {
        bio: "",
        location: "",
        joinDate: "May 2025",
        followers: 0,
        following: 0,
        totalSales: 0,
        rating: 0,
        responseTime: "Usually responds within hours",
        profileImage: "",
        coverImage: ""
    };

    const userListings = [];

    const salesStats = {
        thisMonth: { sales: 0, revenue: 0 },
        totalRevenue: 0,
        avgSalePrice: 0,
        repeatCustomers: 0
    };

    // Filter listings based on active tab
    const getFilteredListings = () => {
        if (activeTab === 'sold') {
            return userListings.filter(item => item.status === 'sold');
        }
        return userListings.filter(item => item.status === 'active');
    };

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

    return (
        <div className="min-h-screen bg-white">
            <div className="container mx-auto px-4 py-16">
                <div className="max-w-2xl mx-auto text-center">
                    <div className="relative mb-8">
                        <div className="w-32 h-32 mx-auto bg-orange-100 rounded-full flex items-center justify-center">
                            <Construction size={64} className="text-orange-600" />
                        </div>
                        <div className="absolute -top-2 -right-2 w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center animate-bounce">
                            <HardHat size={24} className="text-yellow-600" />
                        </div>
                        <div className="absolute -bottom-2 -left-2 w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center animate-pulse">
                            <Hammer size={20} className="text-gray-600" />
                        </div>
                    </div>

                    <h1 className="text-4xl font-bold text-gray-900 mb-4">
                        Profile Page Under Construction
                    </h1>
                    
                    <p className="text-xl text-gray-600 mb-8">
                            This page will be ready soon.
                    </p>

                    <div className="bg-gray-50 rounded-xl p-6 mb-8">
                        <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center justify-center gap-2">
                            <Settings size={20} />
                            Coming Soon
                        </h2>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
                            <div className="flex items-center gap-3 p-3 bg-white rounded-lg">
                                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                                    <User size={16} className="text-blue-600" />
                                </div>
                                <span className="text-gray-700">Profile Management</span>
                            </div>
                            
                            <div className="flex items-center gap-3 p-3 bg-white rounded-lg">
                                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                                    <Camera size={16} className="text-green-600" />
                                </div>
                                <span className="text-gray-700">Photo Upload</span>
                            </div>
                            
                            <div className="flex items-center gap-3 p-3 bg-white rounded-lg">
                                <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                                    <TrendingUp size={16} className="text-purple-600" />
                                </div>
                                <span className="text-gray-700">Seller Dashboard</span>
                            </div>
                            
                            <div className="flex items-center gap-3 p-3 bg-white rounded-lg">
                                <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                                    <Star size={16} className="text-red-600" />
                                </div>
                                <span className="text-gray-700">Reviews & Ratings</span>
                            </div>
                            
                            <div className="flex items-center gap-3 p-3 bg-white rounded-lg">
                                <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
                                    <Package size={16} className="text-yellow-600" />
                                </div>
                                <span className="text-gray-700">Listing Management</span>
                            </div>
                            
                            <div className="flex items-center gap-3 p-3 bg-white rounded-lg">
                                <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center">
                                    <DollarSign size={16} className="text-indigo-600" />
                                </div>
                                <span className="text-gray-700">Sales Analytics</span>
                            </div>
                        </div>
                    </div>

                    <div className="bg-blue-50 rounded-xl p-6 mb-8">
                        <div className="flex items-center justify-center gap-2 mb-3">
                            <Clock size={20} className="text-blue-600" />
                            <h3 className="text-lg font-medium text-blue-900">Expected Timeline</h3>
                        </div>
                        <p className="text-blue-700 text-lg font-medium">July 2025</p>
                        <p className="text-blue-600 text-sm mt-1">Stay tuned for updates!</p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                            to="/products"
                            className="inline-flex items-center gap-2 px-6 py-3 bg-gray-900 text-white font-medium rounded-lg hover:bg-gray-800 transition-colors"
                        >
                            <ShoppingBag size={20} />
                            Continue Shopping
                        </Link>
                        
                        <Link
                            to="/wishlist"
                            className="inline-flex items-center gap-2 px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors"
                        >
                            <Heart size={20} />
                            View Wishlist
                        </Link>
                    </div>

                    <div className="mt-12 pt-8 border-t border-gray-200">
                        <div className="flex items-center justify-center gap-2 text-gray-500">
                            <div className="w-2 h-2 bg-orange-400 rounded-full animate-pulse"></div>
                            <span className="text-sm">Building in progress</span>
                            <div className="w-2 h-2 bg-orange-400 rounded-full animate-pulse delay-150"></div>
                            <span className="text-sm">Please check back soon</span>
                            <div className="w-2 h-2 bg-orange-400 rounded-full animate-pulse delay-300"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}