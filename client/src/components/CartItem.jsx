import { useShoppingCart } from "../context/CartContext";
import formatCurrency from "../utilities/formatCurrency";

const CartItem = ({ product }) => {
    const { removeFromCart, addToCart } = useShoppingCart();
    const quantity = product.quantity;

    return (
       <div className="flex items-center justify-between py-2">
            <img 
                src={product.image} 
                alt={product.title} 
                className="w-16 h-16 object-cover rounded" 
            />
            <div className="flex-1 ml-4">
                <p className="font-medium">{product.title}</p>
                <p className="text-sm text-gray-500">${product.price} x {quantity}</p>
                <div className="flex items-center mt-1">
                    <button 
                        className="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300"
                        onClick={() => removeFromCart(product.product_id, 1)}
                    >
                        -
                    </button>
                    <span className="mx-2">{quantity}</span>
                    <button 
                        className="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300"
                        onClick={() => addToCart(product)}
                    >
                        +
                    </button>
                </div>
            </div>
            <div className="text-right">
                <p className="font-bold">{formatCurrency(product.price * quantity)}</p>
                <div className="flex flex-col">
                    <button 
                        className="text-red-500 text-sm hover:text-red-700 mt-1"
                        onClick={() => removeFromCart(product.product_id, quantity)}
                    >
                        Remove All
                    </button>
                </div>
            </div>
       </div>
    );
};

export default CartItem;