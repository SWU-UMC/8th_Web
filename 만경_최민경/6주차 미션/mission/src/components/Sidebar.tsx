import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";


interface SidebarProps {
    isOpen: boolean;
    onClose: () => void;
  }

const Sidebar = ({ isOpen, onClose }: SidebarProps) => {
    const { logout } = useAuth();
    const handleLogout = async () => {
        await logout();
        onClose(); // 로그아웃 후 사이드바 닫기
      };

    return (
        <div 
      className={`
        bg-white dark:bg-gray-800 h-screen w-64 fixed left-0 top-0 shadow-lg z-30
        transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}
        >          
        <div className="bg-white dark:bg-gray-800 h-screen w-64 fixed left-0 top-0 shadow-lg">
            <div className="flex flex-col p-4 mt-16">
            <button
            onClick={onClose}
            className="absolute top-4 right-4  text-gray-700 dark:text-gray-300 hover:text-red-500"
          >
          닫기
            </button>
            <Link 
            to="/my"
            onClick={onClose}
            className="text-gray-700 dark:text-gray-300 hover:text-blue-500 py-3 px-4 rounded hover:bg-gray-100 dark:hover:bg-gray-700"
            >
            마이페이지
            </Link>
        </div>
        </div>
        // </div>
    
    );
};

export default Sidebar;