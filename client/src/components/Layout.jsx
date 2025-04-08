import { Outlet } from "react-router-dom";
import TopBar from "./TopBar";
import MainBar from "./MainBar";
import Footer from "./Footer";
import { useAuthContext } from "../context/AuthContext";

export default function Layout() {
    const { user, loading } = useAuthContext();

    if (loading) return null;

    return (
        <div className="flex flex-col min-h-screen">
            <TopBar user={user} loading={loading} />
            <MainBar />
            <main className="flex-grow">
                <Outlet />
            </main>
            <Footer />
        </div>
    );
}

