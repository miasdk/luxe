import productsService from "../services/productService";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CreateListing() {
    const [product, setProduct] = useState({
        name: "",
        description: "",
        price: 0,
        imageUrl: "",
        category: "",
    });
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduct((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await productsService.createProduct(product);
            navigate("/products");
        } catch (error) {
            console.error("Error creating product:", error);
        }
    };

    return (
        <div className="container mx-auto my-10">
            <h1 className="text-2xl font-bold mb-4">Create a New Listing</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700" htmlFor="name">
                        Product Name
                    </label>
                    <input
                        type="text"
                        name="name"
                        value={product.name}
                        onChange={handleChange}
                        required
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700" htmlFor="description">
                        Description
                    </label>
                    <textarea
                        name="description"
                        value={product.description}
                        onChange={handleChange}
                        required
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    ></textarea>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700" htmlFor="price">
                        Price
                    </label>
                    <input
                        type="number"
                        name="price"
                        value={product.price}
                        onChange={handleChange}
                        required
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700" htmlFor="imageUrl">
                        Image URL
                    </label>
                    <input
                        type="text"
                        name="imageUrl"
                        value={product.imageUrl}
                        onChange={handleChange}
                        required
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700" htmlFor="category">
                        Category
                    </label>
                    <input
                        type="text"
                        name="category"
                        value={product.category}
                        onChange={handleChange}
                        required
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                >
                    Create Listing
                </button>
            </form>
        </div>
    );
}
