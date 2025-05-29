// pages/OrdersPage.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext';
import { API_BASE_URL } from '../config/constants';

const OrdersPage = () => {
    const { user } = useAuthContext();
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    useEffect(() => {
        const fetchOrders = async () => {
            if (!user) return;
            
            try {
                const response = await fetch(`${API_BASE_URL}/api/orders/user/${user.uid}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch orders');
                }
                
                const data = await response.json();
                
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
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };
        
        fetchOrders();
    }, [user]);
    
    if (!user) {
        return (
            <div className="container mx-auto p-4">
                <p>Please log in to view your orders.</p>
                <Link to="/login" className="text-blue-500 hover:underline">
                    Log In
                </Link>
            </div>
        );
    }
    
    if (loading) {
        return <div className="container mx-auto p-4">Loading orders...</div>;
    }
    
    if (error) {
        return (
            <div className="container mx-auto p-4">
                <div className="bg-red-100 text-red-800 p-4 rounded-lg">
                    {error}
                </div>
            </div>
        );
    }
    
    if (orders.length === 0) {
        return (
            <div className="container mx-auto p-4">
                <h1 className="text-2xl font-bold mb-6">My Orders</h1>
                <div className="bg-gray-100 p-6 rounded-lg text-center">
                    <p className="mb-4">You don't have any orders yet.</p>
                    <Link to="/" className="text-blue-500 hover:underline">
                        Start Shopping
                    </Link>
                </div>
            </div>
        );
    }
    
    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-6">My Orders</h1>
            
            <div className="space-y-6">
                {orders.map(order => (
                    <div key={order.id} className="bg-white shadow-md rounded-lg p-6">
                        <div className="flex justify-between mb-4">
                            <div>
                                <p className="text-sm text-gray-500">Order placed</p>
                                <p className="font-medium">{order.date.toLocaleDateString()}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Order #</p>
                                <p className="font-medium">{order.id}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Total</p>
                                <p className="font-medium">${order.totalPrice.toFixed(2)}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Status</p>
                                <p className={`font-medium ${
                                    order.status === 'delivered' ? 'text-green-600' : 
                                    order.status === 'shipped' ? 'text-blue-600' : 
                                    order.status === 'paid' ? 'text-purple-600' :
                                    'text-gray-600'
                                }`}>
                                    {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                                </p>
                            </div>
                        </div>
                        
                        <div className="divide-y">
                            {order.items.map((item, index) => (
                                <div key={index} className="py-3 flex justify-between">
                                    <div>
                                        <p className="font-medium">{item.product_title}</p>
                                        <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                                    </div>
                                    <p className="font-medium">${item.unitPrice.toFixed(2)}</p>
                                </div>
                            ))}
                        </div>
                        
                        <Link 
                            to={`/order-confirmation/${order.id}`} 
                            className="mt-4 text-blue-500 hover:underline block text-right"
                        >
                            View Order Details
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default OrdersPage;