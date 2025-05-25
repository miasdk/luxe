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
    Share2
} from 'lucide-react';

export default function ProfilePage() {
    const { user } = useAuthContext();
    const [activeTab, setActiveTab] = useState('listings');
    const [viewMode, setViewMode] = useState('grid');

    // Static demo data - all empty
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
        <div className="min-h-screen bg-gray-50">
            {/* Cover Photo */}
            <div className="relative h-48 lg:h-64 bg-gradient-to-r from-purple-500 to-pink-500">
                <div className="absolute inset-0 bg-black bg-opacity-20"></div>
                <button className="absolute top-4 right-4 p-2 bg-white/20 backdrop-blur-sm text-white rounded-full hover:bg-white/30 transition-colors">
                    <Camera size={18} />
                </button>
            </div>

            <div className="container mx-auto px-4 -mt-16 relative z-10">
                {/* Profile Header */}
                <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
                    <div className="flex flex-col lg:flex-row lg:items-start gap-6">
                        {/* Profile Picture */}
                        <div className="relative">
                            <div className="w-24 h-24 lg:w-32 lg:h-32 rounded-full border-4 border-white shadow-lg bg-gray-200 flex items-center justify-center">
                                <User size={32} className="text-gray-400" />
                            </div>
                            <button className="absolute bottom-0 right-0 p-2 bg-black text-white rounded-full hover:bg-gray-800 transition-colors">
                                <Camera size={14} />
                            </button>
                        </div>

                        {/* Profile Info */}
                        <div className="flex-1">
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
                                <div>
                                    <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-1">
                                        {user.displayName || user.email.split('@')[0]}
                                    </h1>
                                    <div className="flex items-center gap-2 text-gray-600 mb-2">
                                        <MapPin size={16} />
                                        <span className="text-sm text-gray-400">Add your location</span>
                                        <Calendar size={16} className="ml-2" />
                                        <span className="text-sm">Joined {profileData.joinDate}</span>
                                    </div>
                                </div>
                                
                                <div className="flex gap-2">
                                    <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors">
                                        <Edit3 size={16} />
                                        Edit Profile
                                    </button>
                                    <button className="flex items-center gap-2 px-4 py-2 bg-black text-white rounded-xl hover:bg-gray-800 transition-colors">
                                        <Share2 size={16} />
                                        Share
                                    </button>
                                </div>
                            </div>

                            <p className="text-gray-400 mb-4 leading-relaxed italic">Tell us about yourself...</p>

                            {/* Stats */}
                            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                                <div className="text-center p-3 bg-gray-50 rounded-xl">
                                    <p className="text-2xl font-bold text-gray-900">{profileData.followers.toLocaleString()}</p>
                                    <p className="text-sm text-gray-600">Followers</p>
                                </div>
                                <div className="text-center p-3 bg-gray-50 rounded-xl">
                                    <p className="text-2xl font-bold text-gray-900">{profileData.following.toLocaleString()}</p>
                                    <p className="text-sm text-gray-600">Following</p>
                                </div>
                                <div className="text-center p-3 bg-gray-50 rounded-xl">
                                    <p className="text-2xl font-bold text-gray-900">{profileData.totalSales}</p>
                                    <p className="text-sm text-gray-600">Sales</p>
                                </div>
                                <div className="text-center p-3 bg-gray-50 rounded-xl">
                                    <div className="flex items-center justify-center gap-1">
                                        <Star size={16} className="text-gray-300" />
                                        <p className="text-2xl font-bold text-gray-900">{profileData.rating}</p>
                                    </div>
                                    <p className="text-sm text-gray-600">Rating</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Seller Dashboard Stats */}
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mb-6">
                    <div className="bg-white rounded-xl p-4 shadow-sm">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                                <DollarSign size={20} className="text-green-600" />
                            </div>
                            <div>
                                <p className="text-sm text-gray-600">This Month</p>
                                <p className="text-xl font-bold text-gray-900">${salesStats.thisMonth.revenue.toLocaleString()}</p>
                            </div>
                        </div>
                    </div>
                    
                    <div className="bg-white rounded-xl p-4 shadow-sm">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                                <TrendingUp size={20} className="text-blue-600" />
                            </div>
                            <div>
                                <p className="text-sm text-gray-600">Total Revenue</p>
                                <p className="text-xl font-bold text-gray-900">${salesStats.totalRevenue.toLocaleString()}</p>
                            </div>
                        </div>
                    </div>
                    
                    <div className="bg-white rounded-xl p-4 shadow-sm">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                                <Package size={20} className="text-purple-600" />
                            </div>
                            <div>
                                <p className="text-sm text-gray-600">Avg Sale</p>
                                <p className="text-xl font-bold text-gray-900">${salesStats.avgSalePrice}</p>
                            </div>
                        </div>
                    </div>
                    
                    <div className="bg-white rounded-xl p-4 shadow-sm">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                                <Users size={20} className="text-orange-600" />
                            </div>
                            <div>
                                <p className="text-sm text-gray-600">Repeat Buyers</p>
                                <p className="text-xl font-bold text-gray-900">{salesStats.repeatCustomers}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Tabs */}
                <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                    <div className="border-b border-gray-200">
                        <div className="flex items-center justify-between p-4">
                            <nav className="flex space-x-8">
                                {[
                                    { id: 'listings', label: 'My Listings', icon: Package },
                                    { id: 'sold', label: 'Sold Items', icon: Badge },
                                    { id: 'likes', label: 'Liked Items', icon: Heart },
                                    { id: 'reviews', label: 'Reviews', icon: Star }
                                ].map(tab => (
                                    <button
                                        key={tab.id}
                                        onClick={() => setActiveTab(tab.id)}
                                        className={`flex items-center gap-2 py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
                                            activeTab === tab.id
                                                ? 'border-black text-black'
                                                : 'border-transparent text-gray-500 hover:text-gray-700'
                                        }`}
                                    >
                                        <tab.icon size={16} />
                                        {tab.label}
                                    </button>
                                ))}
                            </nav>
                            
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
                                    className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                                >
                                    {viewMode === 'grid' ? <List size={18} /> : <Grid3X3 size={18} />}
                                </button>
                                <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                                    <Filter size={18} />
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Tab Content */}
                    <div className="p-6">
                        {(activeTab === 'listings' || activeTab === 'sold') && getFilteredListings().length === 0 && (
                            <div className="text-center py-12">
                                <Package size={48} className="mx-auto text-gray-300 mb-4" />
                                <h3 className="text-lg font-medium text-gray-900 mb-2">
                                    {activeTab === 'listings' ? 'No listings yet' : 'No sold items'}
                                </h3>
                                <p className="text-gray-600 mb-6">
                                    {activeTab === 'listings' ? 'Start selling by creating your first listing' : 'Your sold items will appear here'}
                                </p>
                                {activeTab === 'listings' && (
                                    <button className="inline-flex items-center px-6 py-3 bg-black text-white rounded-xl hover:bg-gray-800 transition-colors">
                                        <Package size={16} className="mr-2" />
                                        Create Listing
                                    </button>
                                )}
                            </div>
                        )}

                        {activeTab === 'likes' && (
                            <div className="text-center py-12">
                                <Heart size={48} className="mx-auto text-gray-300 mb-4" />
                                <h3 className="text-lg font-medium text-gray-900 mb-2">No liked items yet</h3>
                                <p className="text-gray-600">Items you like will appear here</p>
                            </div>
                        )}

                        {activeTab === 'reviews' && (
                            <div className="text-center py-12">
                                <Star size={48} className="mx-auto text-gray-300 mb-4" />
                                <h3 className="text-lg font-medium text-gray-900 mb-2">No reviews yet</h3>
                                <p className="text-gray-600">Customer reviews will appear here</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}