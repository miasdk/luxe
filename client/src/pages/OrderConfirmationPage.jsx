import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { API_BASE_URL } from '../config/constants';
import { 
    CheckCircle, 
    Package, 
    Truck, 
    ArrowLeft, 
    Download, 
    Mail,
    MapPin,
    Calendar,
    CreditCard
} from 'lucide-react';

const OrderConfirmationPage = () => {
    const { orderId } = useParams();
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    useEffect(() => {
        const fetchOrderDetails = async () => {
            try {
                const response = await fetch(`${API_BASE_URL}/api/orders/${orderId}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch order details');
                }
                
                const data = await response.json();
                setOrder(data);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };
        
        fetchOrderDetails();
    }, [orderId]);
    
    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading order details...</p>
                </div>
            </div>
        );
    }
    
    if (error) {
        return (
            <div className="min-h-screen bg-gray-50">
                <div className="container mx-auto px-4 py-16 max-w-4xl">
                    <div className="text-center">
                        <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-8">
                            <Package size={32} className="text-red-500" />
                        </div>
                        <h1 className="text-3xl font-light text-gray-900 mb-4">Order Not Found</h1>
                        <p className="text-red-600 mb-8 text-lg">{error}</p>
                        <div className="flex gap-4 justify-center">
                            <Link 
                                to="/orders" 
                                className="inline-flex items-center px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-all duration-300 font-medium"
                            >
                                View All Orders
                            </Link>
                            <Link 
                                to="/" 
                                className="inline-flex items-center px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-all duration-300 font-medium"
                            >
                                <ArrowLeft size={18} className="mr-2" />
                                Back to Home
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
    
    const orderData = order[0];
    const estimatedDelivery = new Date(Date.now() + 5 * 24 * 60 * 60 * 1000); // 5 days from now
    
    return (
        <div className="min-h-screen bg-gray-50">
            <div className="container mx-auto px-4 py-12 max-w-4xl">
                <div className="text-center mb-16">
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <CheckCircle size={40} className="text-green-600" />
                    </div>
                    <h1 className="text-4xl font-light text-gray-900 mb-4">Order Confirmed!</h1>
                    <p className="text-xl text-gray-600 mb-6">
                        Thank you for your purchase. Your order has been successfully placed.
                    </p>
                    <div className="inline-flex items-center gap-3 bg-white border border-gray-200 rounded-lg px-6 py-3">
                        <span className="text-sm font-medium text-gray-600">Order Number:</span>
                        <span className="text-lg font-mono text-gray-900">#{orderId}</span>
                    </div>
                </div>

                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 mb-8">
                    <h2 className="text-2xl font-light text-gray-900 mb-8">Order Timeline</h2>
                    <div className="relative">
                        <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gray-200"></div>
                        
                        <div className="relative flex items-center mb-6">
                            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center z-10">
                                <CheckCircle size={24} className="text-green-600" />
                            </div>
                            <div className="ml-6">
                                <h3 className="font-medium text-gray-900">Order Confirmed</h3>
                                <p className="text-sm text-gray-600">{new Date(orderData.created_at).toLocaleString()}</p>
                            </div>
                        </div>
                        
                        <div className="relative flex items-center mb-6">
                            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center z-10">
                                <Package size={24} className="text-blue-600" />
                            </div>
                            <div className="ml-6">
                                <h3 className="font-medium text-gray-900">Processing</h3>
                                <p className="text-sm text-gray-600">We're preparing your order</p>
                            </div>
                        </div>
                        
                        <div className="relative flex items-center">
                            <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center z-10">
                                <Truck size={24} className="text-gray-400" />
                            </div>
                            <div className="ml-6">
                                <h3 className="font-medium text-gray-900">Estimated Delivery</h3>
                                <p className="text-sm text-gray-600">{estimatedDelivery.toLocaleDateString()}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
                        <h2 className="text-2xl font-light text-gray-900 mb-8">Order Details</h2>
                        
                        <div className="space-y-6 mb-8">
                            <div className="flex items-center gap-3">
                                <Calendar size={20} className="text-gray-400" />
                                <div>
                                    <p className="font-medium text-gray-900">Order Date</p>
                                    <p className="text-gray-600">{new Date(orderData.created_at).toLocaleDateString()}</p>
                                </div>
                            </div>
                            
                            <div className="flex items-center gap-3">
                                <CreditCard size={20} className="text-gray-400" />
                                <div>
                                    <p className="font-medium text-gray-900">Payment Status</p>
                                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                                        {orderData.status}
                                    </span>
                                </div>
                            </div>
                        </div>
                        
                        <h3 className="text-lg font-medium text-gray-900 mb-4">Items Ordered</h3>
                        <div className="space-y-4 mb-6">
                            {order.map((item, index) => (
                                <div key={index} className="flex justify-between items-center py-3 border-b border-gray-100 last:border-0">
                                    <div>
                                        <p className="font-medium text-gray-900">{item.product_title}</p>
                                        <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                                    </div>
                                    <p className="font-medium text-gray-900">${parseFloat(item.unit_price).toFixed(2)}</p>
                                </div>
                            ))}
                        </div>
                        
                        <div className="border-t border-gray-100 pt-4">
                            <div className="flex justify-between items-center text-xl font-medium text-gray-900">
                                <span>Total</span>
                                <span>${parseFloat(orderData.total_price).toFixed(2)}</span>
                            </div>
                        </div>
                    </div>
                    
                    <div className="space-y-8">
                        {orderData.shipping_name && (
                            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
                                <div className="flex items-center gap-3 mb-6">
                                    <MapPin size={24} className="text-gray-700" />
                                    <h2 className="text-2xl font-light text-gray-900">Shipping Address</h2>
                                </div>
                                <div className="space-y-2">
                                    <p className="font-medium text-gray-900">{orderData.shipping_name}</p>
                                    <p className="text-gray-600">{orderData.shipping_address}</p>
                                    <p className="text-gray-600">
                                        {orderData.shipping_city}, {orderData.shipping_state} {orderData.shipping_zip}
                                    </p>
                                    <p className="text-gray-600">{orderData.shipping_email}</p>
                                </div>
                            </div>
                        )}
                        
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
                            <h3 className="text-xl font-medium text-gray-900 mb-6">What's Next?</h3>
                            <div className="space-y-4">
                                <button className="w-full flex items-center justify-center gap-3 px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-all duration-300 font-medium">
                                    <Download size={18} />
                                    Download Receipt
                                </button>
                                
                                <button className="w-full flex items-center justify-center gap-3 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-all duration-300 font-medium">
                                    <Mail size={18} />
                                    Email Confirmation
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div className="mt-16 text-center">
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link 
                            to="/" 
                            className="inline-flex items-center px-8 py-4 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-all duration-300 font-medium text-lg"
                        >
                            Continue Shopping
                        </Link>
                        <Link 
                            to="/orders" 
                            className="inline-flex items-center px-8 py-4 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-all duration-300 font-medium text-lg"
                        >
                            View All Orders
                        </Link>
                    </div>
                </div>

                <div className="mt-16 bg-gray-100 rounded-2xl p-8 text-center">
                    <h3 className="text-xl font-medium text-gray-900 mb-4">Need Help?</h3>
                    <p className="text-gray-600 mb-6">
                        If you have any questions about your order, please don't hesitate to contact us.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link 
                            to="/support" 
                            className="inline-flex items-center px-6 py-3 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-all duration-300 font-medium"
                        >
                            Contact Support
                        </Link>
                        <Link 
                            to="/faq" 
                            className="inline-flex items-center px-6 py-3 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-all duration-300 font-medium"
                        >
                            View FAQ
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderConfirmationPage;