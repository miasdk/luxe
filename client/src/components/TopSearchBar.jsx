import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";
export default function TopSearchBar() {
    return (
        <nav className=" border border-black/10 text-black p-4">
            <div className="container mx-auto flex justify-between items-center p-2">
                <h1 className="text-4xl font-bold">
                    <Link to="/">eCart</Link>
                </h1>
                <SearchBar className="w-full" />
            </div>
        </nav>
    );
}