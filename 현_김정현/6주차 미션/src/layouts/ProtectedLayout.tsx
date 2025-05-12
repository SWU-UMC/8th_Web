import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const ProtectedLayout = () => {
    const {accessToken} = useAuth();
    // 로그인하지 않은 경우 로그인 페이지로
    if (!accessToken) {
        return <Navigate to = {"/login"} replace/>; // replace : 히스토리가 남지 않게 함
    }

    return (
        <div className="h-dvh flex flex-col">
            <Navbar/>
            <main className="flex-1 mt-2">
            <Outlet/>
            </main>
            <Footer/>
        </div>
        );
};

export default ProtectedLayout;