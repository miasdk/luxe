import productsService from "../services/productService";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export default function UpdateListing() {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const data = await productsService.fetchProductById(id);
                setProduct(data);
            } catch (err) {
                setError(err.message);
            }
        };

        fetchProduct();
    }, [id]);

     const handleUpdate = async (updatedProduct) => { 
        try {
            await productsService.updateProduct(id, updatedProduct);
            // Optionally redirect or show a success message
        } catch (err) {
            setError(err.message);
        }
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!product) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>Update Listing</h1>
            <form onSubmit={(e) => {
                e.preventDefault();
                const updatedProduct = {
                    name: e.target.name.value,
                    price: e.target.price.value,
                    description: e.target.description.value,
                    // Add other fields as necessary
                };
                handleUpdate(updatedProduct);
            }}>
                <div>
                    <label>Name:</label>
                    <input type="text" name="name" defaultValue={product.name} required />
                </div>
                <div>
                    <label>Price:</label>
                    <input type="number" name="price" defaultValue={product.price} required />
                </div>
                <div>
                    <label>Description:</label>
                    <textarea name="description" defaultValue={product.description} required></textarea>
                </div>
                {/* Add other fields as necessary */}
                <button type="submit">Update</button>
            </form>
        </div>
    );
}
         