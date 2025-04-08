import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useAuthContext } from "../context/AuthContext";

export default function Layout() {
    const { user, loading } = useAuthContext();

    if (loading) return null;

    return (
        <div className="flex flex-col min-h-screen">
            <Navbar user={user} loading={loading} />
            <main className="flex-grow">
                <Outlet />
            </main>
            <Footer />
        </div>
    );
}

