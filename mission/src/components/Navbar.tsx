import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useEffect, useState } from "react";
import { FiMenu } from "react-icons/fi";
import { getMyInfo } from "../apis/auth";

const Navbar = () => {
  const { accessToken } = useAuth();
  console.log(accessToken);
  //  추가
  const [name, setName] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await getMyInfo();
        setName(response?.data?.name ?? "");
      } catch (error) {
        console.error("사용자 정보 불러오기 실패", error);
      }
    };

    if (accessToken) {
      fetchUserInfo();
    }
  }, [accessToken]);

  return (
    <>
      {/* Navbar */}
      <nav className="bg-black text-white w-full z-10 px-4 py-3 flex justify-between items-center">
        <div className="flex items-center space-x-4">
          {/* 햄버거 버튼 */}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="text-white"
          >
            <FiMenu size={22} />
          </button>

          <Link to="/" className="text-xl font-bold text-pink-500">
            돌려돌려LP판
          </Link>
        </div>

        <div className="flex items-center space-x-4">
          {!accessToken ? (
            <>
              <Link to="/login" className="text-white hover:text-pink-400">
                로그인
              </Link>
              <Link
                to="/signup"
                className="bg-pink-500 text-white px-3 py-1 rounded hover:bg-pink-600"
              >
                회원가입
              </Link>
            </>
          ) : (
            <>
              <span className="text-white">{name}님 반갑습니다.</span>
              <Link to="/logout" className="text-white hover:text-pink-400">
                로그아웃
              </Link>
            </>
          )}
        </div>
      </nav>

      {/* Sidebar */}
      {sidebarOpen && (
        <div className="fixed top-0 left-0 w-48 h-full bg-black text-white shadow-lg z-20">
          <div className="p-4 space-y-4">
            {accessToken && (
              <Link to={"/my"} className="block text-white hover:text-pink-400">
                마이페이지
              </Link>
            )}
            <Link
              to={"/search"}
              className="block text-white hover:text-pink-400"
            >
              검색
            </Link>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
