import { FiSearch, FiUser } from "react-icons/fi";
import { useEffect, useState } from "react";
import ConfirmModal from "./ConfirmModal";
import { deleteUser } from "../apis/auth";
import { useNavigate } from "react-router-dom";

type SidebarProps = {
    isOpen: boolean;
    closeSidebar: () => void;
};

const Sidebar = ({ isOpen, closeSidebar }: SidebarProps) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === "Escape") closeSidebar();
        };
        window.addEventListener("keydown", handleEsc);

        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }

        return () => window.removeEventListener("keydown", handleEsc);
    }, [closeSidebar]);

    const handleWithdraw = async () => {
        try {
            await deleteUser();
            alert("회원 탈퇴가 완료되었습니다.");
            setIsModalOpen(false); // ✅ 모달 닫기
            closeSidebar();        // ✅ 사이드바 닫기
            navigate("/login");
        } catch (error) {
            alert("회원 탈퇴 중 오류가 발생했습니다.");
        }
    };

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

                <div className="fixed bottom-20 left-1/2 transform -translate-x-1/2">
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded"
                    >
                        탈퇴하기
                    </button>
                </div>
            </aside>

            <ConfirmModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onConfirm={handleWithdraw}
                message="정말 탈퇴하시겠습니까?"
            />
        </>
    );
};

export default Sidebar;
