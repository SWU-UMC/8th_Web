import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Sidebar from "../components/Sidebar";
import { useState } from "react";

const HomeLayout = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

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

export default HomeLayout;
