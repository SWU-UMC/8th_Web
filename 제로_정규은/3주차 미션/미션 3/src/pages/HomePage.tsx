import { Outlet } from "react-router-dom";
/*import { Navbar } from "../components/Navbar";*/

const HomePage = () => {
    return (
        <>
            
            <div className="relative w-full h-screen bg-cover bg-center flex flex-col items-center justify-center text-white"
                 >
                
                <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-transparent"></div>
                <div className="relative z-10 text-center">
                    <h1 className="text-5xl font-extrabold mb-4 drop-shadow-lg">
                        Welcome to <span className="text-red-500">ZeroMovie</span>
                    </h1>
                    <p className="text-lg text-gray-300 mb-6">ZERO 시네마에 오신 것을 환영합니다! 🍿
                    </p>
                    <a href="https://www.netflix.com/kr/" className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg text-lg font-semibold shadow-lg transition duration-300">
                        지금 영화 보러가기 🚀
                    </a>
                </div>
            </div>
            <Outlet />
        </>
    );
};

export default HomePage;
