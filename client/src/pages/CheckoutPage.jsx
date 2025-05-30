import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import PaymentForm from '../components/PaymentForm';
import { ArrowLeft, ShoppingBag, Check, Lock, Truck } from 'lucide-react';
import { Link } from 'react-router-dom';

const CheckoutPage = () => {
    const { user } = useAuthContext();
    const { cartItems, cartTotal, clearCart } = useCart();
    const navigate = useNavigate();
    
    const [shippingInfo, setShippingInfo] = useState({
        name: '',
        address: '',
        city: '',
        state: '',
        zip: '',
        email: user?.email || ''
    });
    
    const [orderCreated, setOrderCreated] = useState(false);
    const [orderId, setOrderId] = useState(null);
    const [currentStep, setCurrentStep] = useState(1);
    
    // Redirect to login if not authenticated
    useEffect(() => {
        if (!user) {
            navigate('/login', { state: { from: '/checkout' } });
        }
    }, [user, navigate]);
    
    // Redirect to cart if cart is empty
    useEffect(() => {
        if (cartItems.length === 0 && !orderCreated) {
            navigate('/cart');
        }
    }, [cartItems, navigate, orderCreated]);
    
    // Handle shipping info changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setShippingInfo(prev => ({
            ...prev,
            [name]: value
        }));
    };
    
    // Format cart items for order creation
    const getOrderItems = () => {
        return cartItems.map(item => ({
            productId: item.product_id,
            quantity: item.quantity,
            unitPrice: item.price
        }));
    };
    
    // Handle successful payment
    const handlePaymentSuccess = (orderId) => {
        setOrderCreated(true);
        setOrderId(orderId);
        clearCart();
        
        // Redirect to order confirmation
        setTimeout(() => {
            navigate(`/order-confirmation/${orderId}`);
        }, 1500);
    };

    // Validate shipping form
    const isShippingValid = () => {
        return shippingInfo.name && shippingInfo.address && shippingInfo.city && 
               shippingInfo.state && shippingInfo.zip && shippingInfo.email;
    };
    
    if (!user || (cartItems.length === 0 && !orderCreated)) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading checkout...</p>
                </div>
            </div>
        );
    }
    
    return (
        <div className="min-h-screen bg-gray-50">
            <div className="container mx-auto px-4 py-12 max-w-6xl">
                {/* Header */}
                <div className="mb-12">
                    <div className="flex items-center gap-4 mb-6">
                        <Link 
                            to="/cart"
                            className="p-2 rounded-full bg-white border border-gray-200 hover:bg-gray-50 transition-colors"
                        >
                            <ArrowLeft size={20} className="text-gray-600" />
                        </Link>
                        <h1 className="text-4xl font-light text-gray-900">Checkout</h1>
                    </div>
                    
                    {/* Progress Steps */}
                    <div className="flex items-center space-x-4">
                        <div className={`flex items-center ${currentStep >= 1 ? 'text-gray-900' : 'text-gray-400'}`}>
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${
                                currentStep >= 1 ? 'bg-gray-900 border-gray-900 text-white' : 'border-gray-300'
                            }`}>
                                {currentStep > 1 ? <Check size={16} /> : '1'}
                            </div>
                            <span className="ml-2 font-medium">Shipping</span>
                        </div>
                        <div className={`w-16 h-0.5 ${currentStep >= 2 ? 'bg-gray-900' : 'bg-gray-300'}`}></div>
                        <div className={`flex items-center ${currentStep >= 2 ? 'text-gray-900' : 'text-gray-400'}`}>
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${
                                currentStep >= 2 ? 'bg-gray-900 border-gray-900 text-white' : 'border-gray-300'
                            }`}>
                                {currentStep > 2 ? <Check size={16} /> : '2'}
                            </div>
                            <span className="ml-2 font-medium">Payment</span>
                        </div>
                        <div className={`w-16 h-0.5 ${currentStep >= 3 ? 'bg-gray-900' : 'bg-gray-300'}`}></div>
                        <div className={`flex items-center ${currentStep >= 3 ? 'text-gray-900' : 'text-gray-400'}`}>
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${
                                currentStep >= 3 ? 'bg-gray-900 border-gray-900 text-white' : 'border-gray-300'
                            }`}>
                                <Check size={16} />
                            </div>
                            <span className="ml-2 font-medium">Complete</span>
                        </div>
                    </div>
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Order Summary */}
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
                            <h2 className="text-2xl font-light text-gray-900 mb-6">Order Summary</h2>
                            <div className="space-y-4">
                                {cartItems.map(item => (
                                    <div key={item.product_id} className="flex items-center gap-4 py-4 border-b border-gray-100 last:border-0">
                                        <div className="w-16 h-16 bg-gray-50 rounded-lg overflow-hidden">
                                            <img 
                                                src={item.image} 
                                                alt={item.title} 
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="font-medium text-gray-900">{item.title}</h3>
                                            <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                                        </div>
                                        <p className="font-medium text-gray-900">${(item.price * item.quantity).toFixed(2)}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                        
                        {/* Shipping Information */}
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
                            <div className="flex items-center gap-3 mb-6">
                                <Truck size={24} className="text-gray-700" />
                                <h2 className="text-2xl font-light text-gray-900">Shipping Information</h2>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={shippingInfo.name}
                                        onChange={handleInputChange}
                                        className="w-full p-4 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={shippingInfo.email}
                                        onChange={handleInputChange}
                                        className="w-full p-4 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all"
                                        required
                                    />
                                </div>
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
                                    <input
                                        type="text"
                                        name="address"
                                        value={shippingInfo.address}
                                        onChange={handleInputChange}
                                        className="w-full p-4 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
                                    <input
                                        type="text"
                                        name="city"
                                        value={shippingInfo.city}
                                        onChange={handleInputChange}
                                        className="w-full p-4 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all"
                                        required
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">State</label>
                                        <input
                                            type="text"
                                            name="state"
                                            value={shippingInfo.state}
                                            onChange={handleInputChange}
                                            className="w-full p-4 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">ZIP Code</label>
                                        <input
                                            type="text"
                                            name="zip"
                                            value={shippingInfo.zip}
                                            onChange={handleInputChange}
                                            className="w-full p-4 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all"
                                            required
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        {/* Payment */}
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
                            <div className="flex items-center gap-3 mb-6">
                                <Lock size={24} className="text-gray-700" />
                                <h2 className="text-2xl font-light text-gray-900">Payment</h2>
                            </div>
                            <PaymentForm 
                                userId={user.uid}
                                orderItems={getOrderItems()}
                                shippingInfo={shippingInfo}
                                onPaymentSuccess={handlePaymentSuccess}
                                disabled={!isShippingValid()}
                            />
                        </div>
                    </div>
                    
                    {/* Order Total */}
                    <div>
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 sticky top-8">
                            <h3 className="text-2xl font-light text-gray-900 mb-8">Order Total</h3>
                            
                            <div className="space-y-6">
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-600">Subtotal</span>
                                    <span className="text-xl font-light">${cartTotal.toFixed(2)}</span>
                                </div>
                                
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-600">Shipping</span>
                                    <span className="text-green-600 font-medium">FREE</span>
                                </div>
                                
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-600">Tax</span>
                                    <span className="text-gray-600">Calculated at checkout</span>
                                </div>
                                
                                <div className="border-t border-gray-100 pt-6">
                                    <div className="flex justify-between items-center">
                                        <span className="text-xl font-medium text-gray-900">Total</span>
                                        <span className="text-3xl font-light text-gray-900">${cartTotal.toFixed(2)}</span>
                                    </div>
                                </div>
                            </div>
                            
                            {/* Security Features */}
                            <div className="mt-8 pt-6 border-t border-gray-100 space-y-3">
                                <div className="flex items-center text-sm text-gray-600">
                                    <Lock size={16} className="mr-3 text-green-600" />
                                    256-bit SSL encryption
                                </div>
                                <div className="flex items-center text-sm text-gray-600">
                                    <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                                    Money-back guarantee
                                </div>
                                <div className="flex items-center text-sm text-gray-600">
                                    <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                                    Free returns within 30 days
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                {orderCreated && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                        <div className="bg-white rounded-2xl p-8 max-w-md mx-4 text-center">
                            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                <Check size={32} className="text-green-600" />
                            </div>
                            <h3 className="text-2xl font-medium text-gray-900 mb-4">Order Confirmed!</h3>
                            <p className="text-gray-600 mb-6">
                                Your order has been placed successfully. You'll receive a confirmation email shortly.
                            </p>
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto"></div>
                            <p className="text-sm text-gray-500 mt-4">Redirecting to order confirmation...</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CheckoutPage;