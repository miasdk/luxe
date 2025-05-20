// pages/CartPage.jsx
import React from 'react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';

const CartPage = () => {
    const { 
        cartItems, 
        cartTotal, 
        removeFromCart, 
        updateQuantity, 
        proceedToCheckout 
    } = useCart();
    
    if (cartItems.length === 0) {
        return (
            <div className="container mx-auto p-4">
                <h1 className="text-2xl font-bold mb-6">Your Cart</h1>
                <div className="bg-gray-100 p-6 rounded-lg text-center">
                    <p className="mb-4">Your cart is empty.</p>
                    <Link to="/products" className="text-blue-500 hover:underline">
                        Start Shopping
                    </Link>
                </div>
            </div>
        );
    }
    
    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-6">Your Cart</h1>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-2">
                    <div className="bg-white shadow-md rounded-lg overflow-hidden">
                        <table className="w-full">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="py-3 px-4 text-left">Product</th>
                                    <th className="py-3 px-4 text-center">Quantity</th>
                                    <th className="py-3 px-4 text-right">Price</th>
                                    <th className="py-3 px-4 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {cartItems.map(item => (
                                    <tr key={item.product_id}>
                                        <td className="py-4 px-4">
                                            <div className="flex items-center">
                                                <img 
                                                    src={item.image} 
                                                    alt={item.title} 
                                                    className="w-16 h-16 object-cover rounded" 
                                                />
                                                <div className="ml-4">
                                                    <p className="font-medium">{item.title}</p>
                                                    <p className="text-sm text-gray-500">{item.brand_name}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="py-4 px-4">
                                            <div className="flex justify-center items-center">
                                                <button 
                                                    className="w-8 h-8 bg-gray-200 rounded-l-md flex items-center justify-center"
                                                    onClick={() => updateQuantity(item.product_id, item.quantity - 1)}
                                                >
                                                    -
                                                </button>
                                                <span className="w-10 text-center">{item.quantity}</span>
                                                <button 
                                                    className="w-8 h-8 bg-gray-200 rounded-r-md flex items-center justify-center"
                                                    onClick={() => updateQuantity(item.product_id, item.quantity + 1)}
                                                >
                                                    +
                                                </button>
                                            </div>
                                        </td>
                                        <td className="py-4 px-4 text-right">
                                            ${(item.price * item.quantity).toFixed(2)}
                                        </td>
                                        <td className="py-4 px-4 text-right">
                                            <button 
                                                className="text-red-500 hover:text-red-700"
                                                onClick={() => removeFromCart(item.product_id)}
                                            >
                                                Remove
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
                
                <div>
                    <div className="bg-white shadow-md rounded-lg p-6">
                        <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
                        
                        <div className="space-y-3">
                            <div className="flex justify-between">
                                <span>Subtotal</span>
                                <span>${cartTotal.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Shipping</span>
                                <span>FREE</span>
                            </div>
                            <div className="border-t pt-3 mt-3">
                                <div className="flex justify-between font-semibold">
                                    <span>Total</span>
                                    <span>${cartTotal.toFixed(2)}</span>
                                </div>
                            </div>
                        </div>
                        
                        <button
                            onClick={proceedToCheckout}
                            className="mt-6 w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                        >
                            Proceed to Checkout
                        </button>
                        
                        <div className="mt-4 text-center">
                            <Link to="/" className="text-blue-500 hover:underline">
                                Continue Shopping
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CartPage;