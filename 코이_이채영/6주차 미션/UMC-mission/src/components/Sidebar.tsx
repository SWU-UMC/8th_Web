import { FiSearch, FiUser } from "react-icons/fi";
import { useEffect } from "react";

type SidebarProps = {
    isOpen: boolean;
    closeSidebar: () => void;
};

const Sidebar = ({ isOpen, closeSidebar }: SidebarProps) => {
    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === "Escape") closeSidebar();
        };
        window.addEventListener("keydown", handleEsc);
        return () => window.removeEventListener("keydown", handleEsc);
    }, [closeSidebar]);

    return (
        <>
            {/* 오버레이 배경 (모바일용) */}
            <div
                className={`fixed inset-0 bg-black/50 z-40 transition-opacity duration-300 md:hidden ${isOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}
                onClick={closeSidebar}
            ></div>

            {/* 사이드바 자체 */}
            <aside
                className={`absolute top-16 left-0 w-50 min-h-screen bg-[#111] text-white p-6 z-50 transition-transform duration-300 transform 
                ${isOpen ? "translate-x-0" : "-translate-x-full"} 
                md:static md:translate-x-0 md:block md:w-50`}
            >
                <ul className="space-y-4">
                    <li className="flex items-center space-x-2 hover:text-pink-400">
                        <FiSearch />
                        <a href="/search" className="font-semibold">찾기</a>
                    </li>
                    <li className="flex items-center space-x-2 hover:text-pink-400">
                        <FiUser />
                        <a href="/my" className="font-semibold">마이페이지</a>
                    </li>
                </ul>
            </aside>
        </>
    );
};

export default Sidebar;
