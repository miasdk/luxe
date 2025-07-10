import { useShoppingCart } from '../../../context/CartContext';
import CartItem from './CartItem';

const Cart = () => {
    const { cart, isOpen, toggleCart, clearCart } = useShoppingCart();
    
    const totalItems = cart.reduce((total, product) => total + product.quantity, 0);
    const subtotal = cart.reduce((total, product) => total + product.price * product.quantity, 0);

    return isOpen ? (
        <div className="fixed top-0 right-0 w-80 h-full bg-white shadow-lg z-50 p-4 overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">My eCart ({totalItems})</h2>
                <button onClick={toggleCart} className="text-gray-500 hover:text-black">x</button>
            </div>
            
            {cart.length === 0 ? (
                <p className="text-gray-500 text-center py-8">Your cart is empty</p>
            ) : (
                <>
                    <div className="mb-4">
                        <button 
                            onClick={clearCart}
                            className="text-red-500 text-sm hover:text-red-700"
                        >
                            Clear Cart
                        </button>
                    </div>
                    
                    <div className="max-h-96 overflow-y-auto mb-4">
                        {cart.map((product) => (
                            <CartItem key={product.product_id} product={product} />
                        ))}
                    </div>
                    
                    <div className="border-t pt-4">
                        <div className="flex justify-between text-sm mb-2">
                            <span>Subtotal:</span>
                            <span>${subtotal.toFixed(2)}</span>
                        </div>
                        
                        <div className="flex justify-between font-bold text-lg mb-4">
                            <span>Total:</span>
                            <span>${subtotal.toFixed(2)}</span>
                        </div>
                        
                        <button className="bg-blue-600 hover:bg-blue-700 text-white w-full py-2 rounded">
                            Checkout
                        </button>
                    </div>
                </>
            )}
        </div>
    ) : null;
};

export default Cart;