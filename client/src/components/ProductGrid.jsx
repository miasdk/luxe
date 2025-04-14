import ProductCard from "./ProductCard";
const ProductGrid = ({ products }) => {
    return (
        <div className="grid gap-6 w-full mt-5" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))' }}>
            {products.map((product) => (
                <ProductCard 
                    key={product.id} 
                    product={product} 
                    className="h-full" // Ensure cards take full grid height
                />
            ))}
        </div>
    );
};

export default ProductGrid;