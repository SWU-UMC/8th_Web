import { Link } from "react-router-dom";
import { useEffect } from "react";
import { FiSearch, FiUser } from "react-icons/fi";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar = ({ isOpen, onClose }: SidebarProps) => {
  
  

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
        <div className="flex flex-col p-4 mt-16">         
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
      </aside>
    </>
  );
};

export default Sidebar;