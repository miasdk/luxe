import React from 'react';
import { Link } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext';
import MyListings from '../components/features/orders/MyListings';
import { 
    User, 
    Calendar, 
    Mail
} from 'lucide-react';

export default function ProfilePage() {
    const { user } = useAuthContext();

    if (!user) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
                <div className="max-w-md w-full bg-white rounded-xl shadow-sm p-8 text-center">
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
                <div className="max-w-4xl mx-auto space-y-8">
                    
                    {/* Profile Header */}
                    <div className="bg-white rounded-xl shadow-sm p-8">
                        <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                            <div className="relative">
                                {user.photoURL ? (
                                    <img 
                                        src={user.photoURL} 
                                        alt="Profile"
                                        className="w-20 h-20 rounded-full"
                                    />
                                ) : (
                                    <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center">
                                        <User size={28} className="text-gray-400" />
                                    </div>
                                )}
                            </div>
                            
                            <div className="flex-1">
                                <h1 className="text-2xl font-bold text-gray-900 mb-2">
                                    {user.displayName || user.email?.split('@')[0] || 'User'}
                                </h1>
                                <div className="flex items-center gap-2 text-gray-600 mb-3">
                                    <Mail size={16} />
                                    <span>{user.email}</span>
                                </div>
                                                            <div className="flex items-center gap-2 text-sm text-gray-500">
                                <Calendar size={14} />
                                <span>Member since {formatJoinDate()}</span>
                            </div>
                            </div>
                        </div>
                    </div>



                    {/* My Listings Section */}
                    <MyListings />
                </div>
            </div>
        </div>
    );
}