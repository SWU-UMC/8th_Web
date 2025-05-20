import { useState } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { useAuth } from "../context/AuthContext";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import Sidebar from "../components/Sidebar";

const ProtectedLayout = () => {
    const { accessToken } = useAuth();
    const location = useLocation();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    if (!accessToken) {
        return <Navigate to={'/login'} state={{ location }} replace />
    }

    const toggleSidebar = () => {
        setIsSidebarOpen(prev => !prev);
    };

    const closeSidebar = () => {
        setIsSidebarOpen(false);
    };

    return (
        <div className="min-h-screen flex flex-col bg-black">
            <Navbar toggleSidebar={toggleSidebar} />
            <main className="flex-1 flex min-h-0">
                {isSidebarOpen && <Sidebar isOpen={isSidebarOpen} closeSidebar={closeSidebar} />}
                <section className="flex-1 p-4 text-white overflow-y-auto">
                    <Outlet />
                </section>
            </main>
            <Footer />
        </div>
    );
};

export default ProtectedLayout;