import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuthContext } from '../../../context/AuthContext';
import { API_BASE_URL } from '../../../config/constants';
import { 
    Plus, 
    Edit3, 
    Trash2, 
    Eye, 
    Heart, 
    Calendar,
    AlertCircle,
    Package
} from 'lucide-react';
import PriceDisplay from '../../common/ui/PriceDisplay';

export default function MyListings() {
    const { user } = useAuthContext();
    const [listings, setListings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [deletingId, setDeletingId] = useState(null);

    useEffect(() => {
        if (user?.uid) {
            fetchUserListings();
        } else {
            // If no user, set loading to false and listings to empty
            setLoading(false);
            setListings([]);
        }
    }, [user]);

    const fetchUserListings = async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/api/products/seller/${user.uid}`);
            if (response.ok) {
                const data = await response.json();
                setListings(Array.isArray(data) ? data : []);
            } else if (response.status === 404) {
                // User has no listings yet, this is normal
                setListings([]);
            } else {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData.message || `HTTP ${response.status}: Failed to fetch listings`);
            }
        } catch (err) {
            console.error('Error fetching listings:', err);
            // Only show error if it's not a network issue or empty result
            if (err.message.includes('Failed to fetch')) {
                setError('Unable to connect to server. Please check your internet connection.');
            } else {
                setError(err.message);
            }
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteListing = async (listingId) => {
        if (!window.confirm('Are you sure you want to delete this listing?')) {
            return;
        }

        setDeletingId(listingId);
        try {
            const response = await fetch(`${API_BASE_URL}/api/products/${listingId}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                setListings(listings.filter(listing => listing.product_id !== listingId));
            } else {
                throw new Error('Failed to delete listing');
            }
        } catch (err) {
            console.error('Error deleting listing:', err);
            alert('Failed to delete listing. Please try again.');
        } finally {
            setDeletingId(null);
        }
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    if (loading) {
        return (
            <div className="bg-white rounded-xl p-8">
                <div className="flex items-center justify-center py-12">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
                    <span className="ml-3 text-gray-600">Loading your listings...</span>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="bg-white rounded-xl p-8">
                <div className="flex items-center justify-center py-12">
                    <AlertCircle className="text-red-500 mr-3" size={24} />
                    <span className="text-red-600">Error: {error}</span>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-xl overflow-hidden">
            {/* Header */}
            <div className="px-6 py-4 border-b border-gray-100">
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-xl font-semibold text-gray-900">My Listings</h2>
                        <p className="text-sm text-gray-600 mt-1">
                            {listings.length} {listings.length === 1 ? 'listing' : 'listings'}
                        </p>
                    </div>
                    <Link
                        to="/create-listing"
                        className="inline-flex items-center px-4 py-2 bg-gray-900 text-white text-sm font-medium rounded-lg hover:bg-gray-800 transition-colors"
                    >
                        <Plus size={16} className="mr-2" />
                        New Listing
                    </Link>
                </div>
            </div>

            {/* Listings */}
            <div className="p-6">
                {listings.length === 0 ? (
                    <div className="text-center py-12">
                        <Package size={48} className="mx-auto text-gray-300 mb-4" />
                        <h3 className="text-lg font-medium text-gray-900 mb-2">No listings yet</h3>
                        <p className="text-gray-600 mb-6">Start selling by creating your first listing</p>
                        <Link
                            to="/create-listing"
                            className="inline-flex items-center px-6 py-3 bg-gray-900 text-white font-medium rounded-lg hover:bg-gray-800 transition-colors"
                        >
                            <Plus size={16} className="mr-2" />
                            Create Your First Listing
                        </Link>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {listings.map((listing) => (
                            <div
                                key={listing.product_id}
                                className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg hover:border-gray-300 transition-colors"
                            >
                                {/* Product Image */}
                                <div className="flex-shrink-0">
                                    <img
                                        src={listing.image}
                                        alt={listing.title}
                                        className="w-16 h-16 object-cover rounded-lg"
                                    />
                                </div>

                                {/* Product Details */}
                                <div className="flex-1 min-w-0">
                                    <h3 className="font-medium text-gray-900 truncate">
                                        {listing.title}
                                    </h3>
                                    <p className="text-sm text-gray-600 truncate">
                                        {listing.brand_name} • {listing.category_name}
                                    </p>
                                    <div className="flex items-center gap-4 mt-2">
                                        <PriceDisplay price={listing.price} />
                                        <div className="flex items-center gap-1 text-sm text-gray-500">
                                            <Heart size={14} />
                                            <span>{listing.num_likes || 0}</span>
                                        </div>
                                        <div className="flex items-center gap-1 text-sm text-gray-500">
                                            <Calendar size={14} />
                                            <span>{formatDate(listing.created_at)}</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Actions */}
                                <div className="flex items-center gap-2">
                                    <Link
                                        to={`/products/${listing.product_id}`}
                                        className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
                                        title="View listing"
                                    >
                                        <Eye size={16} />
                                    </Link>
                                    <Link
                                        to={`/update-listing/${listing.product_id}`}
                                        className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                        title="Edit listing"
                                    >
                                        <Edit3 size={16} />
                                    </Link>
                                    <button
                                        onClick={() => handleDeleteListing(listing.product_id)}
                                        disabled={deletingId === listing.product_id}
                                        className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
                                        title="Delete listing"
                                    >
                                        {deletingId === listing.product_id ? (
                                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-red-600"></div>
                                        ) : (
                                            <Trash2 size={16} />
                                        )}
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
} 