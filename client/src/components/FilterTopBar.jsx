export default function FilterTopBar({ onFilterChange }) {

    const handleFilterChange = (event) => {
        onFilterChange(event.target.value);
    };

    return (
        <div className="flex justify-between items-center p-4">
            <span className="text-sm text-gray-600">
                Showing <strong>1-10</strong> of <strong>100</strong> results
            </span>
            <select onChange={handleFilterChange} className="bg-gray-100 border border-black/10 p-1 rounded-full text-xs text-center">
                <option value="">Sort: </option>
                <option value="price_low_to_high">Price: Low to High</option>
                <option value="price_high_to_low">Price: High to Low</option>
                <option value="newest">Newest</option>
                <option value="oldest">Oldest</option>
                <option value="most_favorited">Most Favorited</option>
            </select>
        </div>
    );
}
