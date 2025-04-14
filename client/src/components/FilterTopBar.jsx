export default function FilterTopBar({ onFilterChange }) {

    const handleFilterChange = (event) => {
        onFilterChange(event.target.value);
    };

    return (
        <div className="flex justify-between items-center p-4 border-b border-black/10">
            <h2 className="text-xl font-bold">Products</h2>
            <select onChange={handleFilterChange} className="border p-2 rounded">
                <option value="">All Products</option>
                <option value="electronics">Electronics</option>
                <option value="clothing">Clothing</option>
                <option value="home-appliances">Home Appliances</option>
            </select>
        </div>
    );
}
