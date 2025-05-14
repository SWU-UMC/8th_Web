import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Search, UserRound } from "lucide-react";

const HomeLayout = () => {
    return (
        <div className="h-dvh flex flex-col">
            <Navbar />
            
            <div className="flex flex-1">
                {/* 넓은 화면용 사이드바 */}
                <aside className="hidden md:block w-48 bg-gray-300 dark:bg-gray-900">
                <div className="h-full flex flex-col justify-between">
                    <ul className="p-4 space-y-4">
                    <li>
                    <a href="/" className="hover:text-pink flex items-center">
                    <Search size={18} strokeWidth={2} className="mr-2" />
                    <span>찾기</span>
                    </a>
                    </li>
                    <li>
                        <a href="/my" className="hover:text-pink flex items-center">
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
                </div>
                </aside>

                <main className="flex-1 p-6 overflow-auto">
                <Outlet />
                </main>
            </div>
            <Footer />
            </div>
        );
}

export default HomeLayout;