import { useShoppingCart } from "../context/CartContext";
import formatCurrency from "../utilities/formatCurrency";

const CartItem = ({ product }) => {
    const { removeFromCart } = useShoppingCart();
    const quantity = product.quantity;

    return (
       <div className="flex items-center justify-between border-b py-2">
        <img src={product.image} alt={product.title} className="w-16 h-16 object-cover rounded" />
        <div className="flex-1 ml-4">
            <p className="font-medium">{product.title}</p>
            <p className="text-sm text-gray-500">${product.price} x {quantity} </p>      
        </div>
        <div className="text-right">
            <p className="font-bold">{formatCurrency(product.price * quantity)}</p>
            <button 
                className="text-red-500 text-sm hover:text-red-700 mt-1"
                onClick={() => removeFromCart(product.id)}
            >
                Remove
            </button>
        </div>
       </div>
    )
}

export default CartItem;