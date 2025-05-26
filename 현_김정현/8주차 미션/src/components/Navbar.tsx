import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { deleteUser, getMyInfo } from "../apis/auth";
import { Search, UserRound } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { QUERY_KEY } from "../constants/key";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
    const {accessToken, logout} = useAuth();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    // const [userData, setUserData] = useState<{ name: string } | null>(null);

    // useEffect(() => {
    //     const fetchUserInfo = async () => {
    //     if (accessToken) {
    //         try {
    //         const response = await getMyInfo();
    //         setUserData(response.data);
    //         } catch (error) {
    //         console.error("유저 정보를 가져오는 데 실패했습니다.", error);
    //         }
    //     } else {
    //         setUserData(null); // 로그아웃 시 정보 초기화
    //     }
    //     };

    //     fetchUserInfo();
    // }, [accessToken]);

    // const handleLogout = async () => {
    //     await logout();
    //     setUserData(null);
    // };
    const [isModalOpen, setIsModalOpen] = useState(false);
    const navigate = useNavigate();

    const { data: userData } = useQuery({
        queryKey: [QUERY_KEY.myInfo],
        queryFn: getMyInfo,
        enabled: !!accessToken, // accessToken 있을 때만 호출
    });

    const handleLogout = async () => {
        await logout();
    };

    const handleWithdraw = async () => {
        try {
            await deleteUser();
            alert("회원 탈퇴가 완료되었습니다.");
            setIsModalOpen(false);  
            navigate("/login");
        } catch (error) {
            alert("회원 탈퇴 중 오류가 발생했습니다.");
        }
    };

    return (
        <>
            {/* 네비게이션 */}
            <nav className="bg-gray-300 dark:bg-gray-900 shadow-md z-30 px-6 py-3 flex justify-between items-center">
                <div className="flex items-center space-x-4">
                <button
                    onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                    className="text-2xl"
                >
                    &#9776;
                </button>
                <a href="/" className="text-md font-bold ">
                    돌려돌려 Lp판
                </a>
                </div>
                <div className="space-x-4 flex items-center">
                    <a href="/search" className="text-sm font-bold">
                        <Search size={18} strokeWidth={2} className="mr-1" />
                    </a>
                    {accessToken ? (
                        <>
                        <span className="text-sm font-bold">
                            {userData?.data.name}님 반갑습니다!
                        </span>
                        <button
                            onClick={handleLogout}
                            className="text-sm font-bold"
                        >
                            로그아웃
                        </button>
                        </>
                    ) : (
                        <>
                        <a href="/login" className="text-sm font-bold">
                            로그인
                        </a>
                        <a href="/signup" className="text-sm font-bold">
                            회원가입
                        </a>
                        </>
                    )}
                    </div>
            </nav>
        
            {/* 작은 화면에서 오버레이 + 사이드바 */}
            {isSidebarOpen && (
                <>
                <div
                    className="fixed inset-0 bg-black/10 z-20 md:hidden"
                    onClick={() => setIsSidebarOpen(false)}
                />
                <aside className="fixed top-14 left-0 h-[calc(100%-3.5rem)] w-48 bg-gray-300 dark:bg-gray-900 z-30 shadow-lg flex flex-col justify-between">
                    <ul className="p-4 space-y-4">
                    <li>
                        <a href="/" className="flex items-center hover:text-pink">
                        <Search size={18} strokeWidth={2} className="mr-2" />
                        <span>찾기</span>
                        </a>
                    </li>
                    <li>
                        <a href="/my" className="flex items-center hover:text-pink">
                        <UserRound size={18} strokeWidth={2} className="mr-2" />
                        <span>마이페이지</span>
                        </a>
                    </li>
                    </ul>
                    <div className="mb-5 flex justify-center">
                    <button onClick={() => setIsModalOpen(true)} className="text-gray-500 text-sm font-bold">
                    탈퇴하기
                    </button>
                    </div>
                </aside>
                {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
                    <div className="bg-gray-600 p-6 rounded-lg shadow-md w-[300px] text-center relative">
                    <button
                        className="absolute top-2 right-3 text-white text-xl"
                        onClick={() => setIsModalOpen(false)}
                    >
                        &times;
                    </button>
                    <p className="text-white mb-6 text-md">정말 탈퇴하시겠습니까?</p>
                    <div className="flex justify-center gap-4">
                        <button
                        onClick={handleWithdraw}
                        className="bg-gray-300 text-black px-4 py-2 rounded-lg hover:bg-gray-400"
                        >
                        예
                        </button>
                        <button
                        onClick={() => setIsModalOpen(false)}
                        className="bg-pink-500 text-white px-4 py-1 rounded-lg hover:bg-pink-600"
                        >
                        아니요
                        </button>
                    </div>
                    </div>
                </div>
                )}
                </>
            )}
            </>
        );
};

export default Navbar;