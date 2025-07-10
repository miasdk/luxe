import { Outlet } from "react-router-dom";
import TopNavBar from "../../features/navigation/TopNavBar";
import TopSearchBar from "../../features/navigation/TopSearchBar";
import CategoryFilterBar from "../../features/catalog/CategoryFilterBar";
import Footer from "./Footer";
import DemoWarning from "../ui/DemoWarning";
import { useAuthContext } from "../../../context/AuthContext";


export default function Layout() {
    const { user, loading } = useAuthContext();

    if (loading) return null;

    return (
        <div className="flex flex-col min-h-screen">
            <DemoWarning />
            <TopNavBar user={user} loading={loading} />
            <TopSearchBar />
            <CategoryFilterBar />
            <main className="flex-grow">
                <Outlet />
            </main>
            <Footer />
        </div>
    );
}

