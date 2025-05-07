import { Link } from "react-router-dom"
import { useAuth } from "../context/AuthContext";
import { useEffect, useState } from "react";
import { getMyInfo } from "../apis/auth";

interface NavbarProps {
  onToggleSidebar?: () => void;
}

const Navbar = ({ onToggleSidebar }: NavbarProps) => {
  const { accessToken,logout } = useAuth();
  const [userName, setUserName] = useState<string>("");

  useEffect(() => {
    // accessToken이 있을 때만 사용자 정보 가져오기
    if (accessToken) {
      const fetchUserInfo = async () => {
        try {
          const response = await getMyInfo();
          if (response.data?.name) {
            setUserName(response.data.name);
          }
        } catch (error) {
          console.error("사용자 정보 가져오기 실패:", error);
        }
      };
      
      fetchUserInfo();
    }
  }, [accessToken]);

  const handleLogout = async () => {
    await logout();
  };

  
  

  return (
    <nav className="bg-white dark:bg-gray-900 shadow-md fixed w-full z-10">
      <div className="flex items-center justify-between p-4">
      <div className="flex items-center">
          {accessToken && (
            <button 
              onClick={onToggleSidebar}
              className="mr-4 text-gray-700 dark:text-gray-300 hover:text-blue-500"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
              </svg>
            </button>
          )}
          <Link
            to="/"
            className="text-xl font-bold text-gray-900 dark:text-white"
          >
            돌려돌려 LP판
          </Link>
        </div>

    <div className="space-x-6">
          {!accessToken && (
            <>
              <Link
                to="/login"
                className="text-gray-700 dark:text-gray-300 hover:text-blue-500"
              >
                로그인
              </Link>
              <Link
                to="/signup"
                className="text-gray-700 dark:text-gray-300 hover:text-blue-500"
              >
                회원가입
              </Link>
            </>
          )}
          {accessToken && (
            <div className="flex items-center space-x-4">
              <Link
                to="/search"
                className="text-gray-700 dark:text-gray-300 hover:text-blue-500"
              >
                🔍
              </Link>
              <span className="text-gray-700 cursor-pointer dark:text-gray-300">
                {userName}님 반갑습니다!
              </span>
              <button
                onClick={handleLogout}
                className="text-gray-700 dark:text-gray-300 cursor-pointer hover:text-blue-500"
              >
                로그아웃
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;