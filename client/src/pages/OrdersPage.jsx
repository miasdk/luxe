// pages/OrdersPage.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext';
import { API_BASE_URL } from '../config/constants';
import { 
    ShoppingBag, 
    AlertCircle, 
    Package,
    ArrowRight,
    Eye,
    Clock,
    CheckCircle2,
    Truck,
    PackageCheck
} from 'lucide-react';

const OrdersPage = () => {
    const { user } = useAuthContext();
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    useEffect(() => {
        const fetchOrders = async () => {
            if (!user) {
                setLoading(false);
                setOrders([]);
                return;
            }
            
            try {
                const response = await fetch(`${API_BASE_URL}/api/orders/user/${user.uid}`);
                if (response.ok) {
                    const data = await response.json();
                    
                    // If data is empty array, just set empty orders
                    if (!data || data.length === 0) {
                        setOrders([]);
                        setLoading(false);
                        return;
                    }
                    
                    // Process the data we already have
                    const groupedOrders = data.reduce((acc, item) => {
                        if (!acc[item.order_id]) {
                            acc[item.order_id] = {
                                id: item.order_id,
                                date: new Date(item.created_at),
                                status: item.status,
                                totalPrice: parseFloat(item.total_price),
                                items: []
                            };
                        }
                        
                        acc[item.order_id].items.push({
                            product_title: item.product_title,
                            quantity: item.quantity,
                            unitPrice: parseFloat(item.unit_price)
                        });
                        
                        return acc;
                    }, {});
                    
                    setOrders(Object.values(groupedOrders));
                    setLoading(false);
                    return;
                } else if (response.status === 404) {
                    // User has no orders yet - this is normal
                    setOrders([]);
                    setLoading(false);
                    return;
                } else {
                    throw new Error('Failed to fetch orders');
                }
            } catch (err) {
                console.error('Error fetching orders:', err);
                // Handle network errors more gracefully
                if (err.message.includes('Failed to fetch') || err.message.includes('NetworkError')) {
                    setError('Unable to connect to server. Please check your internet connection and try again.');
                } else {
                    setError(err.message);
                }
                setLoading(false);
            }
        };
        
        fetchOrders();
    }, [user]);
    
    if (!user) {
        return (
            <div className="bg-white min-h-screen flex items-center justify-center px-4">
                <div className="max-w-md w-full text-center">
                    <ShoppingBag size={48} className="text-gray-300 mx-auto mb-4" />
                    <h1 className="text-xl font-medium text-gray-900 mb-2">Sign in to view your orders</h1>
                    <p className="text-gray-600 mb-6">
                        Track your orders and view your purchase history.
                    </p>
                    <Link
                        to="/login"
                        className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
                    >
                        Sign in
                    </Link>
                </div>
            </div>
        );
    }
    
    if (loading) {
        return (
            <div className="bg-white min-h-screen">
                <div className="container mx-auto px-4 xl:px-8 py-8 max-w-7xl">
                    <div className="animate-pulse">
                        <div className="h-8 bg-gray-200 rounded w-48 mb-6"></div>
                        <div className="space-y-4">
                            {[...Array(3)].map((_, index) => (
                                <div key={index} className="border border-gray-200 rounded-lg p-6">
                                    <div className="flex justify-between mb-4">
                                        <div className="space-y-2">
                                            <div className="h-4 bg-gray-200 rounded w-32"></div>
                                            <div className="h-4 bg-gray-200 rounded w-24"></div>
                                        </div>
                                        <div className="space-y-2">
                                            <div className="h-4 bg-gray-200 rounded w-24"></div>
                                            <div className="h-4 bg-gray-200 rounded w-32"></div>
                                        </div>
                                    </div>
                                    <div className="space-y-3">
                                        {[...Array(2)].map((_, i) => (
                                            <div key={i} className="flex items-center gap-4">
                                                <div className="w-16 h-16 bg-gray-200 rounded"></div>
                                                <div className="flex-1 space-y-2">
                                                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                                                    <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
    
    if (error) {
        return (
            <div className="bg-white min-h-screen">
                <div className="container mx-auto px-4 xl:px-8 py-8 max-w-7xl">
                    <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
                        <AlertCircle size={48} className="text-red-500 mx-auto mb-4" />
                        <h2 className="text-lg font-medium text-gray-900 mb-2">Something went wrong</h2>
                        <p className="text-gray-600 mb-6">{error}</p>
                        <button 
                            onClick={() => window.location.reload()} 
                            className="inline-flex items-center px-4 py-2 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 transition-colors"
                        >
                            Try again
                        </button>
                    </div>
                </div>
            </div>
        );
    }
    
    if (orders.length === 0) {
        return (
            <div className="bg-white min-h-screen">
                <div className="container mx-auto px-4 xl:px-8 py-8 max-w-7xl">
                    <div className="text-center py-16">
                        <Package size={48} className="text-gray-300 mx-auto mb-4" />
                        <h2 className="text-lg font-normal text-gray-900 mb-2">No orders yet</h2>
                        <p className="text-gray-600 mb-6 max-w-md mx-auto">
                            When you make a purchase, your orders will appear here.
                        </p>
                        <Link
                            to="/products"
                            className="inline-flex items-center px-6 py-2 bg-blue-600 text-white font-medium rounded hover:bg-blue-700 transition-colors"
                        >
                            Start shopping
                        </Link>
                    </div>
                </div>
            </div>
        );
    }
    
    const getStatusIcon = (status) => {
        switch (status) {
            case 'delivered':
                return <PackageCheck className="text-green-500" size={20} />;
            case 'shipped':
                return <Truck className="text-blue-500" size={20} />;
            case 'paid':
                return <CheckCircle2 className="text-purple-500" size={20} />;
            default:
                return <Clock className="text-gray-500" size={20} />;
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'delivered':
                return 'text-green-600 bg-green-50';
            case 'shipped':
                return 'text-blue-600 bg-blue-50';
            case 'paid':
                return 'text-purple-600 bg-purple-50';
            default:
                return 'text-gray-600 bg-gray-50';
        }
    };
    
    return (
        <div className="bg-white min-h-screen">
            <div className="container mx-auto px-4 xl:px-8 py-8 max-w-7xl">
                <div className="mb-8">
                    <h1 className="text-3xl font-light text-gray-900 mb-3 tracking-tight">
                        My Orders
                    </h1>
                    <p className="text-sm text-gray-600">
                        {orders.length} order{orders.length === 1 ? '' : 's'}
                    </p>
                </div>
                
                <div className="space-y-6">
                    {orders.map(order => (
                        <div key={order.id} className="bg-white border border-gray-200 rounded-xl overflow-hidden">
                            <div className="p-6 border-b border-gray-100">
                                <div className="flex flex-wrap items-center justify-between gap-4">
                                    <div className="flex items-center gap-3">
                                        <div className={`px-3 py-1 rounded-full text-sm font-medium flex items-center gap-2 ${getStatusColor(order.status)}`}>
                                            {getStatusIcon(order.status)}
                                            {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                                        </div>
                                        <span className="text-sm text-gray-500">
                                            {order.date.toLocaleDateString()}
                                        </span>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-sm text-gray-500">Order total</p>
                                        <p className="text-lg font-medium text-gray-900">${order.totalPrice.toFixed(2)}</p>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="divide-y divide-gray-100">
                                {order.items.map((item, index) => (
                                    <div key={index} className="p-6 flex items-start justify-between">
                                        <div className="flex-1 min-w-0">
                                            <h3 className="text-sm font-medium text-gray-900 mb-1">
                                                {item.product_title}
                                            </h3>
                                            <p className="text-sm text-gray-500">
                                                Quantity: {item.quantity}
                                            </p>
                                        </div>
                                        
                                        <div className="text-right">
                                            <p className="text-sm font-medium text-gray-900">
                                                ${item.unitPrice.toFixed(2)}
                                            </p>
                                            <p className="text-sm text-gray-500">
                                                ${(item.unitPrice * item.quantity).toFixed(2)}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            
                            <div className="p-6 bg-gray-50 border-t border-gray-100">
                                <Link 
                                    to={`/order-confirmation/${order.id}`}
                                    className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-800"
                                >
                                    View order details
                                    <ArrowRight size={16} className="ml-1" />
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default OrdersPage;