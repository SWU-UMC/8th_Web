import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedLayout = () => {
    const {accessToken} = useAuth();
    // 로그인하지 않은 경우 로그인 페이지로
    if (!accessToken) {
        return <Navigate to = {"/login"} replace/>; // replace : 히스토리가 남지 않게 함
    }

    return (
        <div className="h-dvh flex flex-col">
            <nav className="bg-gray-300 px-6 py-3 flex justify-between items-center">
                <a href="/" className="text-md hover:text-pink">HOME</a>
                <div className="space-x-4">
                    <a href="/login" className="text-sm hover:text-pink">로그인</a>
                    <a href="/signup" className="text-sm hover:text-pink">회원가입</a>
                </div>
            </nav>
            <main className="flex-1">
            <Outlet/>
            </main>
            <footer className="bg-gray-300 py-6"></footer>
        </div>
        );
};

export default ProtectedLayout;