import React from 'react';
import { useCart } from '../../../context/CartContext';
import { X, ShoppingBag, Trash2, Plus, Minus, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const CartDropdown = ({ isOpen, onClose, position = 'right' }) => {
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
            {/* Backdrop */}
            <div 
                className="fixed inset-0 z-40"
                onClick={onClose}
                aria-label="Close cart dropdown"
            />
            
            {/* Dropdown */}
            <div className={`absolute top-full ${position === 'right' ? 'right-0' : 'left-0'} mt-2 w-96 bg-white shadow-2xl rounded-xl border border-gray-200 z-50 max-h-[80vh] flex flex-col`}>
                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b border-gray-100">
                    <div className="flex items-center gap-2">
                        <ShoppingBag size={20} className="text-gray-700" />
                        <h3 className="font-semibold text-gray-900">
                            Cart ({totalItems})
                        </h3>
                    </div>
                    <button 
                        onClick={onClose}
                        className="p-1 hover:bg-gray-100 rounded-full transition-colors"
                    >
                        <X size={18} className="text-gray-500" />
                    </button>
                </div>

                {loading ? (
                    <div className="flex items-center justify-center py-8">
                        <div className="text-gray-500 text-sm">Loading cart...</div>
                    </div>
                ) : cart.length === 0 ? (
                    <div className="flex flex-col items-center justify-center text-center py-8 px-4">
                        <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mb-3">
                            <ShoppingBag size={20} className="text-gray-400" />
                        </div>
                        <h4 className="font-medium text-gray-900 mb-1">Your cart is empty</h4>
                        <p className="text-sm text-gray-500 mb-4">Start adding items to see them here</p>
                        <button 
                            onClick={onClose}
                            className="px-4 py-2 bg-gray-900 text-white text-sm rounded-lg hover:bg-gray-800 transition-colors"
                        >
                            Continue Shopping
                        </button>
                    </div>
                ) : (
                    <>
                        {/* Clear Cart Button */}
                        <div className="px-4 py-2 border-b border-gray-100">
                            <button 
                                onClick={clearCart}
                                className="text-red-500 text-sm hover:text-red-700 transition-colors"
                            >
                                Clear all items
                            </button>
                        </div>

                        {/* Cart Items - Scrollable */}
                        <div className="flex-1 overflow-y-auto max-h-80">
                            <div className="divide-y divide-gray-50">
                                {cart.slice(0, 4).map((item) => (
                                    <div key={item.product_id} className="p-4">
                                        <div className="flex gap-3">
                                            <Link 
                                                to={`/products/${item.product_id}`}
                                                onClick={onClose}
                                                className="w-16 h-16 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0"
                                            >
                                                <img 
                                                    src={item.image} 
                                                    alt={item.title} 
                                                    className="w-full h-full object-cover hover:opacity-80 transition-opacity cursor-pointer" 
                                                />
                                            </Link>
                                            
                                            <div className="flex-1 min-w-0">
                                                <div className="flex justify-between items-start mb-2">
                                                    <div className="flex-1 min-w-0">
                                                        <h4 className="font-medium text-gray-900 text-sm leading-tight truncate">
                                                            {item.title}
                                                        </h4>
                                                        {item.brand_name && (
                                                            <p className="text-xs text-gray-500 mt-1">{item.brand_name}</p>
                                                        )}
                                                    </div>
                                                    <button 
                                                        onClick={() => removeFromCart(item.product_id, item.quantity)}
                                                        className="p-1 text-gray-400 hover:text-red-500 transition-colors ml-2"
                                                        title="Remove all"
                                                    >
                                                        <Trash2 size={14} />
                                                    </button>
                                                </div>
                                                
                                                <div className="flex justify-between items-center">
                                                    <div className="flex items-center border border-gray-200 rounded">
                                                        <button 
                                                            onClick={() => removeFromCart(item.product_id, 1)}
                                                            disabled={item.quantity <= 1}
                                                            className="p-1 hover:bg-gray-50 disabled:opacity-50 transition-colors"
                                                            title="Remove one"
                                                        >
                                                            <Minus size={12} />
                                                        </button>
                                                        <span className="px-2 py-1 text-sm font-medium min-w-[2rem] text-center">{item.quantity}</span>
                                                        <button 
                                                            onClick={() => addToCart(item, 1)}
                                                            className="p-1 hover:bg-gray-50 transition-colors"
                                                            title="Add one"
                                                        >
                                                            <Plus size={12} />
                                                        </button>
                                                    </div>
                                                    
                                                    <div className="text-right">
                                                        <p className="font-semibold text-gray-900 text-sm">
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
                                
                                {/* Show more items indicator */}
                                {cart.length > 4 && (
                                    <div className="px-4 py-2 text-center text-sm text-gray-500 bg-gray-50">
                                        +{cart.length - 4} more items
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Footer */}
                        <div className="border-t border-gray-100 p-4 bg-gray-50 rounded-b-xl">
                            <div className="flex justify-between items-center mb-3">
                                <span className="font-medium text-gray-900">Subtotal</span>
                                <span className="font-bold text-gray-900">${subtotal.toFixed(2)}</span>
                            </div>
                            
                            <p className="text-xs text-gray-500 mb-3 text-center">
                                Free shipping • Taxes calculated at checkout
                            </p>
                            
                            <div className="space-y-2">
                                <Link to="/checkout">
                                    <button
                                        onClick={onClose}
                                        className="w-full bg-gray-900 text-white py-2.5 px-4 rounded-lg hover:bg-gray-800 transition-all duration-200 font-medium flex items-center justify-center gap-2 text-sm"
                                    >
                                        <ShoppingBag size={16} />
                                        Checkout
                                    </button>
                                </Link>
                                
                                <Link to="/cart">
                                    <button 
                                        onClick={onClose}
                                        className="w-full border border-gray-300 text-gray-700 hover:text-gray-900 hover:border-gray-400 py-2.5 px-4 rounded-lg transition-colors text-sm font-medium flex items-center justify-center gap-2"
                                    >
                                        View Cart
                                        <ArrowRight size={14} />
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </>
    );
};

export default CartDropdown;