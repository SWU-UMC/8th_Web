import { useAuth } from "../context/AuthContext";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const ProtectedLayout = () => {
    const { accessToken } = useAuth();
    const location = useLocation();

    if (!accessToken) {
        return <Navigate to={'/login'} state={{location}} replace />
    }

    return (
        <div className="h-dvh flex flex-col bg-black">
            <nav className="h-16 bg-[#111] text-[#ff1490] flex items-center justify-between px-4">
                <div className="text-xl font-semibold">돌려돌려LP판</div>
            </nav>
            <main className="flex-1">
                <Outlet />
            </main>
            <footer>푸터</footer>
        </div>
    );
};

export default ProtectedLayout;