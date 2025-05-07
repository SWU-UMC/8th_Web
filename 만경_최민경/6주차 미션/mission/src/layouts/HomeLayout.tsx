import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Sidebar from "../components/Sidebar";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";

const HomeLayout = () => {
  const { accessToken } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  
  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  return (
    <div className="h-dvh min-h-screen flex flex-col">
      <Navbar  onToggleSidebar={toggleSidebar} />
      <div className="flex flex-1 pt-16">
        {accessToken && (
          <Sidebar isOpen={isSidebarOpen} onClose={closeSidebar} />
        )}
        <main className="flex-1 p-4">
          <Outlet />
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default HomeLayout;
