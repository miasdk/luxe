// pages/CheckoutPage.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import PaymentForm from '../components/PaymentForm';

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
    
    if (!user || (cartItems.length === 0 && !orderCreated)) {
        return <div className="container mx-auto p-4">Loading...</div>;
    }
    
    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-6">Checkout</h1>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                    <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
                    <div className="bg-gray-50 p-4 rounded-lg">
                        {cartItems.map(item => (
                            <div key={item.product_id} className="flex justify-between py-2 border-b">
                                <div>
                                    <p className="font-medium">{item.title}</p>
                                    <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                                </div>
                                <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                            </div>
                        ))}
                        
                        <div className="mt-4 pt-2 border-t">
                            <div className="flex justify-between font-semibold">
                                <span>Total:</span>
                                <span>${cartTotal.toFixed(2)}</span>
                            </div>
                        </div>
                    </div>
                    
                    <div className="mt-6">
                        <h2 className="text-xl font-semibold mb-4">Shipping Information</h2>
                        <div className="space-y-3">
                            <div>
                                <label className="block text-sm font-medium mb-1">Full Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={shippingInfo.name}
                                    onChange={handleInputChange}
                                    className="w-full p-2 border rounded"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Address</label>
                                <input
                                    type="text"
                                    name="address"
                                    value={shippingInfo.address}
                                    onChange={handleInputChange}
                                    className="w-full p-2 border rounded"
                                    required
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="block text-sm font-medium mb-1">City</label>
                                    <input
                                        type="text"
                                        name="city"
                                        value={shippingInfo.city}
                                        onChange={handleInputChange}
                                        className="w-full p-2 border rounded"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">State</label>
                                    <input
                                        type="text"
                                        name="state"
                                        value={shippingInfo.state}
                                        onChange={handleInputChange}
                                        className="w-full p-2 border rounded"
                                        required
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">ZIP Code</label>
                                <input
                                    type="text"
                                    name="zip"
                                    value={shippingInfo.zip}
                                    onChange={handleInputChange}
                                    className="w-full p-2 border rounded"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={shippingInfo.email}
                                    onChange={handleInputChange}
                                    className="w-full p-2 border rounded"
                                    required
                                />
                            </div>
                        </div>
                    </div>
                </div>
                
                <div>
                    <h2 className="text-xl font-semibold mb-4">Payment</h2>
                    <div className="bg-gray-50 p-4 rounded-lg">
                        <PaymentForm 
                            userId={user.uid}
                            orderItems={getOrderItems()}
                            shippingInfo={shippingInfo}
                            onPaymentSuccess={handlePaymentSuccess}
                        />
                    </div>
                </div>
            </div>
            
            {orderCreated && (
                <div className="mt-6 p-4 bg-green-100 text-green-800 rounded-lg">
                    Order created successfully! Redirecting to order confirmation...
                </div>
            )}
        </div>
    );
};

export default CheckoutPage;