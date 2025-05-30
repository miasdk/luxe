import React from 'react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';
import { Trash2, Plus, Minus, ShoppingBag, ArrowLeft } from 'lucide-react';

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
            <div className="min-h-screen bg-gray-50">
                <div className="container mx-auto px-4 py-16 max-w-4xl">
                    <div className="text-center py-20">
                        <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-8">
                            <ShoppingBag size={32} className="text-gray-400" />
                        </div>
                        <h1 className="text-3xl font-light text-gray-900 mb-4">Your cart is empty</h1>
                        <p className="text-gray-600 mb-8 text-lg">Discover our curated collection of exceptional pieces.</p>
                        <Link 
                            to="/products" 
                            className="inline-flex items-center px-8 py-4 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-all duration-300 font-medium text-lg"
                        >
                            <ArrowLeft size={20} className="mr-3" />
                            Start Shopping
                        </Link>
                    </div>
                </div>
            </div>
        );
    }
    
    return (
        <div className="min-h-screen bg-gray-50">
            <div className="container mx-auto px-4 py-12 max-w-7xl">
                {/* Header */}
                <div className="mb-12">
                    <div className="flex items-center gap-4 mb-6">
                        <Link 
                            to="/products"
                            className="p-2 rounded-full bg-white border border-gray-200 hover:bg-gray-50 transition-colors"
                        >
                            <ArrowLeft size={20} className="text-gray-600" />
                        </Link>
                        <h1 className="text-4xl font-light text-gray-900">Shopping Cart</h1>
                    </div>
                    <p className="text-gray-600">{cartItems.length} {cartItems.length === 1 ? 'item' : 'items'} in your cart</p>
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {/* Cart Items */}
                    <div className="lg:col-span-2">
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                            <div className="divide-y divide-gray-100">
                                {cartItems.map((item, index) => (
                                    <div key={item.product_id} className="p-8">
                                        <div className="flex items-start gap-6">
                                            {/* Product Image */}
                                            <div className="w-32 h-32 bg-gray-50 rounded-xl overflow-hidden flex-shrink-0">
                                                <img 
                                                    src={item.image} 
                                                    alt={item.title} 
                                                    className="w-full h-full object-cover" 
                                                />
                                            </div>
                                            
                                            {/* Product Details */}
                                            <div className="flex-1 min-w-0">
                                                <div className="flex justify-between items-start mb-4">
                                                    <div>
                                                        <h3 className="text-xl font-medium text-gray-900 mb-1">{item.title}</h3>
                                                        {item.brand_name && (
                                                            <p className="text-gray-500">{item.brand_name}</p>
                                                        )}
                                                    </div>
                                                    <button 
                                                        className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all duration-200"
                                                        onClick={() => removeFromCart(item.product_id)}
                                                        aria-label="Remove item"
                                                    >
                                                        <Trash2 size={18} />
                                                    </button>
                                                </div>
                                                
                                                <div className="flex justify-between items-center">
                                                    {/* Quantity Controls */}
                                                    <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden">
                                                        <button 
                                                            className="p-3 hover:bg-gray-50 transition-colors disabled:opacity-50"
                                                            onClick={() => updateQuantity(item.product_id, item.quantity - 1)}
                                                            disabled={item.quantity <= 1}
                                                        >
                                                            <Minus size={16} />
                                                        </button>
                                                        <span className="px-6 py-3 text-lg font-medium">{item.quantity}</span>
                                                        <button 
                                                            className="p-3 hover:bg-gray-50 transition-colors"
                                                            onClick={() => updateQuantity(item.product_id, item.quantity + 1)}
                                                        >
                                                            <Plus size={16} />
                                                        </button>
                                                    </div>
                                                    
                                                    {/* Price */}
                                                    <div className="text-right">
                                                        <p className="text-2xl font-light text-gray-900">
                                                            ${(item.price * item.quantity).toFixed(2)}
                                                        </p>
                                                        {item.quantity > 1 && (
                                                            <p className="text-sm text-gray-500">
                                                                ${item.price.toFixed(2)} each
                                                            </p>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    
                    {/* Order Summary */}
                    <div>
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 sticky top-8">
                            <h2 className="text-2xl font-light text-gray-900 mb-8">Order Summary</h2>
                            
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
                            
                            <button
                                onClick={proceedToCheckout}
                                className="mt-8 w-full bg-gray-900 text-white py-4 px-6 rounded-lg hover:bg-gray-800 transition-all duration-300 font-medium text-lg flex items-center justify-center"
                            >
                                <ShoppingBag size={20} className="mr-3" />
                                Proceed to Checkout
                            </button>
                            
                            <div className="mt-6 text-center">
                                <Link 
                                    to="/products" 
                                    className="text-gray-600 hover:text-gray-900 transition-colors font-medium"
                                >
                                    Continue Shopping
                                </Link>
                            </div>
                            
                            {/* Trust Indicators */}
                            <div className="mt-8 pt-6 border-t border-gray-100 space-y-3">
                                <div className="flex items-center text-sm text-gray-600">
                                    <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                                    Secure checkout
                                </div>
                                <div className="flex items-center text-sm text-gray-600">
                                    <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                                    Free shipping on orders over $100
                                </div>
                                <div className="flex items-center text-sm text-gray-600">
                                    <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                                    30-day return policy
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CartPage;