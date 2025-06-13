import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";

export default function TopSearchBar() {
    return (
        <nav className="border-b border-black/10 text-black">
            <div className="container mx-auto px-4 py-3">
                <div className="flex items-center gap-6">
                    <Link to="/" className="text-3xl font-bold text-gray-900 hover:text-gray-700 transition-colors">
                        eCart
                    </Link>
                    <SearchBar className="flex-1" />
                </div>
            </div>
        </nav>
    );
}