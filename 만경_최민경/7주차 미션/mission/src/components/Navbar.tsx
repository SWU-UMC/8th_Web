import { Link } from "react-router-dom"
import { useAuth } from "../context/AuthContext";
import { useEffect, useState } from "react";
import { getMyInfo } from "../apis/auth";
import { FiMenu } from "react-icons/fi"; 
import useLogout from "../hooks/muations/useLogout";

interface NavbarProps {
  onToggleSidebar?: () => void;
}

const Navbar = ({ onToggleSidebar }: NavbarProps) => {
  const { accessToken,logout } = useAuth();
  const [userName, setUserName] = useState<string>("");
  const logoutMutation=useLogout();

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

  const handleLogout =  () => {
    logoutMutation.mutate(undefined,{
      onSuccess:()=>{
        console.log("로그아웃 성공")
      },
      onError:(error)=>{
        console.error("로그아웃 실패",error)
      }
    })
  };

  
  

  return (
    <nav className="bg-white dark:bg-gray-900 shadow-md fixed w-full z-10">
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center">
          
          <button 
            onClick={onToggleSidebar}
            className="mr-4 text-gray-700 dark:text-gray-300 hover:text-blue-500 focus:outline-none"
            aria-label="메뉴 열기"
          >
            <FiMenu size={24} />
          </button>
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
                disabled={logoutMutation.isPending}
                className="text-gray-700 dark:text-gray-300 cursor-pointer hover:text-blue-500"
              >
                {logoutMutation.isPending ? '로그아웃 중...' : '로그아웃'}
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;