export default function FilterSideBar() {
    return (
        <div className="hidden md:flex flex-col w-50 p-4 border-r border-black/10">
            <h2 className="text-lg font-semibold mb-4">Filters</h2>
            <div className="mb-4">
                <h3 className="font-medium">Category</h3>
                <ul>
                    <li><input type="checkbox" /> Electronics</li>
                    <li><input type="checkbox" /> Fashion</li>
                    <li><input type="checkbox" /> Home & Garden</li>
                </ul>
            </div>
            <div className="mb-4">
                <h3 className="font-medium">Price Range</h3>
                <input type="range" min="0" max="1000" />
            </div>
            <button className="bg-blue-500 text-white px-4 py-2 rounded">Apply Filters</button>
        </div>
    );
}