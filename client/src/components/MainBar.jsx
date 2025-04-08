import { Link } from "react-router-dom";
export default function MainBar() {
    return (
        <nav className="bg-gray-800 text-white p-4">
            <div className="container mx-auto flex justify-between items-center p-2">
                <h1 className="text-4xl font-bold">
                    <Link to="/">ecart</Link>
                </h1>
                <ul className="flex space-x-4">
                    <li>
                        <Link to="/" className="hover:text-gray-300">Home</Link>
                    </li>
                    <li>
                        <Link to="/products" className="hover:text-gray-300">Products</Link>
                    </li>
                    <li>
                        <Link to="/cart" className="hover:text-gray-300">Cart</Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
}