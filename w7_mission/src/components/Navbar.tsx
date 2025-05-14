import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useEffect, useState } from "react";
import { FiMenu } from "react-icons/fi";
import { getMyInfo } from "../apis/auth";
import useLogout from "../hooks/mutations/useLogout";
import useDeleteUser from "../hooks/mutations/useDeleteUser";

const Navbar = () => {
  const { accessToken } = useAuth();
  console.log(accessToken);
  //  추가
  const [name, setName] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);

  //로그아웃 부분 mutation 구현
  const navigate = useNavigate();
  const { mutate: logoutMutate } = useLogout();

  const { mutate: deleteUserMutate } = useDeleteUser();

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

  const handleLogout = () => {
    logoutMutate(undefined, {
      onSuccess: () => {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        alert("로그아웃 성공");
        window.location.href = "/";
      },
      onError: () => {
        alert("로그아웃 실패");
      },
    });
  };

  const handleDeleteUser = () => {
    deleteUserMutate(undefined, {
      onSuccess: () => {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        alert("탈퇴가 성공적으로 완료되었습니다.");
        navigate("/");
      },
      onError: () => {
        alert("탈퇴 실패");
      },
    });
  };

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
              <Link to={"/login"} className="text-white hover:text-pink-400">
                로그인
              </Link>
              <Link
                to={"/signup"}
                className="bg-pink-500 text-white px-3 py-1 rounded hover:bg-pink-600"
              >
                회원가입
              </Link>
            </>
          ) : (
            <>
              <span className="text-white">{name}님 반갑습니다.</span>
              <button
                onClick={handleLogout}
                className="text-white hover:text-pink-400"
              >
                로그아웃
              </button>
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

            <button
              onClick={() => setShowModal(true)}
              className="text-white hover:text-pink-400 text-left transition-colors"
            >
              탈퇴하기
            </button>
          </div>
        </div>
      )}
      {/* 탈퇴 모달 */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50">
          <div className="bg-zinc-800 text-white px-8 py-6 rounded-lg text-center relative w-80">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-2 right-2 text-gray-400 hover:text-white"
            >
              ✕
            </button>
            <p className="mb-6 font-semibold text-lg">정말 탈퇴하시겠습니까?</p>
            <div className="flex justify-center gap-4">
              <button
                onClick={handleDeleteUser}
                className="bg-white text-black px-4 py-2 rounded w-20 hover:bg-gray-300"
              >
                예
              </button>
              <button
                onClick={() => setShowModal(false)}
                className="bg-pink-500 text-white px-4 py-2 rounded w-20 hover:bg-pink-600"
              >
                아니요
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
