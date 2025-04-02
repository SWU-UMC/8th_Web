import { Outlet } from "react-router-dom";
import { Navbar } from "../components/Navbar";

const HomePage = () => {
    return (
        <>
            <Navbar/>
            <div className="p-6 text-center">
                <h1 className="text-4xl font-bold mb-4">Welcome to ZeroMovie</h1>
                <p className="text-lg text-gray-600">ZERO 시네마에 오신 것을 환영합니다!</p>
            </div>
            <Outlet/>
        </>
    );
};

export default HomePage;
