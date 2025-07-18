import { Link } from "react-router-dom";
import SearchBar from './SearchBar';

export default function TopSearchBar() {
    return (
        <nav className="border-b border-black/10 text-black">
            <div className="container mx-auto px-4 xl:px-8 py-4 max-w-6xl">
                <div className="flex items-center gap-8">
                    <Link to="/" className="text-5xl font-bold text-gray-900 hover:text-gray-700 transition-colors" style={{ fontFamily: 'Licorice, cursive' }}>
                        Luxe
                    </Link>
                    <SearchBar className="flex-1" />
                </div>
            </div>
        </nav>
    );
}