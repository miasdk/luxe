import React from 'react';
import { useCart } from '../context/CartContext';
import { X, ShoppingBag, Trash2, Plus, Minus } from 'lucide-react';
import { Link } from 'react-router-dom';

const CartModal = ({ isOpen, onClose }) => {
    const { 
        cart,
        subtotal,
        totalItems,
        removeFromCart, 
        addToCart,
        clearCart,
        loading
    } = useCart();

    if (!isOpen) return null;

    return (
        <>
            <div 
                className="fixed inset-0  bg-opacity-100 z-40"
                onClick={onClose}
                aria-label="Close cart modal"
            />
            
            <div className="fixed top-0 right-0 h-full w-full max-w-md bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out border-l border-gray-200">
                <div className="flex items-center justify-between p-6 border-b border-gray-100">
                    <div className="flex items-center gap-3">
                        <ShoppingBag size={24} className="text-gray-700" />
                        <h2 className="text-xl font-semibold text-gray-900">
                            Shopping Cart ({totalItems})
                        </h2>
                    </div>
                    <button 
                        onClick={onClose}
                        className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                    >
                        <X size={20} className="text-gray-500" />
                    </button>
                </div>

                <div className="flex flex-col" style={{ height: 'calc(100vh - 73px)' }}>
                    {loading ? (
                        <div className="flex-1 flex items-center justify-center">
                            <div className="text-gray-500">Loading cart...</div>
                        </div>
                    ) : cart.length === 0 ? (
                        <div className="flex-1 flex flex-col items-center justify-center text-center p-8">
                            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                                <ShoppingBag size={24} className="text-gray-400" />
                            </div>
                            <h3 className="text-lg font-medium text-gray-900 mb-2">Your cart is empty</h3>
                            <p className="text-gray-500 mb-6">Add some items to get started</p>
                            <button 
                                onClick={onClose}
                                className="px-6 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
                            >
                                Continue Shopping
                            </button>
                        </div>
                    ) : (
                        <>
                            {/* Clear Cart Button */}
                            <div className="px-6 py-3 border-b border-gray-100">
                                <button 
                                    onClick={clearCart}
                                    className="text-red-500 text-sm hover:text-red-700 transition-colors"
                                >
                                    Clear all items
                                </button>
                            </div>

                            <div className="flex-1 overflow-y-auto">
                                <div className="divide-y divide-gray-100">
                                    {cart.map((item) => (
                                        <div key={item.product_id} className="p-6">
                                            <div className="flex gap-4">
                                                <Link 
                                                    to={`/products/${item.product_id}`}
                                                    onClick={onClose}
                                                    className="w-20 h-20 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0"
                                                >
                                                    <img 
                                                        src={item.image} 
                                                        alt={item.title} 
                                                        className="w-full h-full object-cover hover:opacity-80 transition-opacity cursor-pointer" 
                                                    />
                                                </Link>
                                                
                                                <div className="flex-1 min-w-0">
                                                    <div className="flex justify-between items-start mb-2">
                                                        <div>
                                                            <h4 className="font-medium text-gray-900 text-sm leading-tight">
                                                                {item.title}
                                                            </h4>
                                                            {item.brand_name && (
                                                                <p className="text-xs text-gray-500 mt-1">{item.brand_name}</p>
                                                            )}
                                                        </div>
                                                        <button 
                                                            onClick={() => removeFromCart(item.product_id, item.quantity)}
                                                            className="p-1 text-gray-400 hover:text-red-500 transition-colors"
                                                            title="Remove all"
                                                        >
                                                            <Trash2 size={16} />
                                                        </button>
                                                    </div>
                                                    
                                                    <div className="flex justify-between items-center">
                                                        <div className="flex items-center border border-gray-200 rounded-md">
                                                            <button 
                                                                onClick={() => removeFromCart(item.product_id, 1)}
                                                                disabled={item.quantity <= 1}
                                                                className="p-1 hover:bg-gray-50 disabled:opacity-50 transition-colors"
                                                                title="Remove one"
                                                            >
                                                                <Minus size={14} />
                                                            </button>
                                                            <span className="px-3 py-1 text-sm font-medium">{item.quantity}</span>
                                                            <button 
                                                                onClick={() => addToCart(item, 1)}
                                                                className="p-1 hover:bg-gray-50 transition-colors"
                                                                title="Add one"
                                                            >
                                                                <Plus size={14} />
                                                            </button>
                                                        </div>
                                                        
                                                        {/* Price */}
                                                        <div className="text-right">
                                                            <p className="font-semibold text-gray-900">
                                                                ${(item.price * item.quantity).toFixed(2)}
                                                            </p>
                                                            {item.quantity > 1 && (
                                                                <p className="text-xs text-gray-500">
                                                                    ${item.price} each
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

                            <div className="border-t border-gray-100 p-6 bg-gray-50 mt-auto">
                                <div className="flex justify-between items-center mb-4">
                                    <span className="text-lg font-medium text-gray-900">Subtotal</span>
                                    <span className="text-xl font-bold text-gray-900">${subtotal.toFixed(2)}</span>
                                </div>
                                
                                <p className="text-xs text-gray-500 mb-4 text-center">
                                    Free shipping • Taxes calculated at checkout
                                </p>
                                
                                <Link to="/checkout">
                                    <button
                                        onClick={() => {
                                            onClose();
                                        }}
                                        className="w-full bg-gray-900 text-white py-3 px-4 rounded-lg hover:bg-gray-800 transition-all duration-200 font-medium flex items-center justify-center gap-2"
                                    >
                                        <ShoppingBag size={18} />
                                        Checkout
                                    </button>
                                </Link>
                                <Link to="/products">
                                    <button 
                                        onClick={onClose}
                                        className="w-full mt-3 text-gray-600 hover:text-gray-900 transition-colors text-sm font-medium"
                                    >
                                        Continue Shopping
                                    </button>
                                </Link>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </>
    );
};

export default CartModal;