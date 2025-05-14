import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { FiSearch, FiUser, FiLogOut } from "react-icons/fi";
import WithdrawalModal from "./WithdrawalModal";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar = ({ isOpen, onClose }: SidebarProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  
  // 탈퇴 모달 열기
  const openWithdrawalModal = () => {
    setIsModalOpen(true);
  };
  
  // 탈퇴 모달 닫기
  const closeWithdrawalModal = () => {
    setIsModalOpen(false);
  };
  
  // 탈퇴 확인 시 실행할 함수
  const handleWithdrawal = () => {
    // 실제 탈퇴 처리 로직 구현..
    console.log("회원 탈퇴 처리");
    setIsModalOpen(false);
    // 탈퇴 후 어디 페이지로..?
  };

  // Escape 키로 사이드바 닫기 기능 추가
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  return (
    <>
      {/* 배경 오버레이 */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 transition-opacity duration-300"
          onClick={onClose}
        ></div>
      )}
      
      {/* 사이드바 */}
      <aside
        className={`fixed top-0 left-0 w-64 min-h-screen bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 shadow-lg z-50 
          transition-transform duration-300 transform ${
            isOpen ? "translate-x-0" : "-translate-x-full"
          }`}
      >
        <div className="flex flex-col h-screen">
          <div className="p-4 mt-16 flex-grow">
            <ul className="space-y-4">
              <li className="flex items-center space-x-2 hover:text-blue-500 py-3 px-4 rounded hover:bg-gray-100 dark:hover:bg-gray-700">
                <FiSearch />
                <Link to="/search" onClick={onClose} className="font-semibold">
                  찾기
                </Link>
              </li>
              
              <li className="flex items-center space-x-2 hover:text-blue-500 py-3 px-4 rounded hover:bg-gray-100 dark:hover:bg-gray-700">
                <FiUser />
                <Link to="/my" onClick={onClose} className="font-semibold">
                  마이페이지
                </Link>
              </li>
            </ul>
          </div>
          
          <div className="p-4 border-t dark:border-gray-700">
            <div className="flex items-center space-x-2 hover:text-red-500 py-3 px-4 rounded hover:bg-gray-100 dark:hover:bg-gray-700">
              <FiLogOut />
              <button 
                onClick={openWithdrawalModal} 
                className="font-semibold text-left w-full text-red-500"
              >
                탈퇴하기
              </button>
            </div>
          </div>
        </div>
      </aside>
      
      {/* 탈퇴 확인 모달 */}
      <WithdrawalModal 
        isOpen={isModalOpen} 
        onClose={closeWithdrawalModal}
        onConfirm={handleWithdrawal}
        
      />
    </>
  );
};

export default Sidebar;