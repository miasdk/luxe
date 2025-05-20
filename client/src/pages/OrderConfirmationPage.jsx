// pages/OrderConfirmationPage.jsx
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { API_BASE_URL } from '../config/constants';

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
        return <div className="container mx-auto p-4">Loading order details...</div>;
    }
    
    if (error) {
        return (
            <div className="container mx-auto p-4">
                <div className="bg-red-100 text-red-800 p-4 rounded-lg">
                    {error}
                </div>
                <Link to="/orders" className="mt-4 text-blue-500 hover:underline block">
                    View All Orders
                </Link>
            </div>
        );
    }
    
    return (
        <div className="container mx-auto p-4">
            <div className="bg-green-100 text-green-800 p-4 rounded-lg mb-6">
                <h1 className="text-xl font-bold">Order Confirmed!</h1>
                <p>Your order has been successfully placed.</p>
            </div>
            
            <div className="bg-white shadow-md rounded-lg p-6 mb-6">
                <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
                <div className="mb-4">
                    <p><span className="font-medium">Order ID:</span> {orderId}</p>
                    <p><span className="font-medium">Date:</span> {new Date(order[0].created_at).toLocaleDateString()}</p>
                    <p><span className="font-medium">Status:</span> {order[0].status}</p>
                </div>
                
                <h3 className="text-lg font-medium mb-2">Items</h3>
                <div className="divide-y">
                    {order.map((item, index) => (
                        <div key={index} className="py-3 flex justify-between">
                            <div>
                                <p className="font-medium">{item.product_title}</p>
                                <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                            </div>
                            <p className="font-medium">${parseFloat(item.unit_price).toFixed(2)}</p>
                        </div>
                    ))}
                </div>
                
                <div className="mt-4 pt-3 border-t">
                    <div className="flex justify-between font-semibold">
                        <span>Total:</span>
                        <span>${parseFloat(order[0].total_price).toFixed(2)}</span>
                    </div>
                </div>
                
                {/* Shipping Info */}
                {order[0].shipping_name && (
                    <div className="mt-4 pt-3 border-t">
                        <h3 className="text-lg font-medium mb-2">Shipping Information</h3>
                        <p>{order[0].shipping_name}</p>
                        <p>{order[0].shipping_address}</p>
                        <p>{order[0].shipping_city}, {order[0].shipping_state} {order[0].shipping_zip}</p>
                        <p>{order[0].shipping_email}</p>
                    </div>
                )}
            </div>
            
            <div className="flex justify-between">
                <Link to="/" className="text-blue-500 hover:underline">
                    Continue Shopping
                </Link>
                <Link to="/orders" className="text-blue-500 hover:underline">
                    View All Orders
                </Link>
            </div>
        </div>
    );
};

export default OrderConfirmationPage;