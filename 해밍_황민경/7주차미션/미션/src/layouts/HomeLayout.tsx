import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import LpModal from "../components/LpCard/LpModal";
import { useState } from "react";

const HomeLayout = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <div className="h-dvh flex flex-col">
      <Navbar />
      <main className="flex-1 mt-10">
        <Outlet />
      </main>
      <Footer />
      {/* ➕버튼 */}
      <button
        onClick={() => setIsModalOpen(true)}
        className="fixed bottom-15 right-15 bg-pink-600 text-white rounded-full w-14 h-14 text-3xl flex items-center justify-center shadow-lg z-[999] cursor-pointer"
      >
        +
      </button>

      {/* 모달 */}
      {isModalOpen && <LpModal onClose={() => setIsModalOpen(false)} />}
    </div>
  );
};

export default HomeLayout;
