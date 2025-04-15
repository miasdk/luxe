import { Outlet } from "react-router-dom";
import TopNavBar from "./TopNavBar";
import TopSearchBar from "./TopSearchBar";
import Footer from "./Footer";
import DemoWarning from "./DemoWarning";
import { useAuthContext } from "../context/AuthContext";


export default function Layout() {
    const { user, loading } = useAuthContext();

    if (loading) return null;

    return (
        <div className="flex flex-col min-h-screen">
            <DemoWarning />
            <TopNavBar user={user} loading={loading} />
            <TopSearchBar />
            <main className="flex-grow">
                <Outlet />
            </main>
            <Footer />
        </div>
    );
}

