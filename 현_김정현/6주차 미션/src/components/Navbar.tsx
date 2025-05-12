import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { getMyInfo } from "../apis/auth";
import { Search, UserRound } from "lucide-react";

const Navbar = () => {
    const {accessToken, logout} = useAuth();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [userData, setUserData] = useState<{ name: string } | null>(null);

    useEffect(() => {
        const fetchUserInfo = async () => {
        if (accessToken) {
            try {
            const response = await getMyInfo();
            setUserData(response.data);
            } catch (error) {
            console.error("유저 정보를 가져오는 데 실패했습니다.", error);
            }
        } else {
            setUserData(null); // 로그아웃 시 정보 초기화
        }
        };

        fetchUserInfo();
    }, [accessToken]);

    const handleLogout = async () => {
        await logout();
        setUserData(null);
    };

    return (
        <>
            {/* 네비게이션 */}
            <nav className="bg-gray-300 dark:bg-gray-900 shadow-md z-30 px-6 py-3 flex justify-between items-center">
                <div className="flex items-center space-x-4">
                <button
                    onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                    className="text-2xl md:hidden"
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
                            {userData?.name}님 반갑습니다!
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
                <aside className="fixed top-14 left-0 h-[calc(100%-3.5rem)] w-64 bg-gray-300 dark:bg-gray-900 z-30 shadow-lg flex flex-col justify-between">
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
                    <a href="/delete" className="text-gray-500 text-sm font-bold">
                        탈퇴하기
                    </a>
                    </div>
                </aside>
                </>
            )}
            </>
        );
};

export default Navbar;